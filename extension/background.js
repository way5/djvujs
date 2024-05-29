/**
 * The execution starts in the main() function
 */

'use strict';

function isManifestV3() {
    return chrome.runtime.getManifest().manifest_version === 3;
}

const extensionUrl = chrome.runtime.getURL('viewer.html');
const httpRedirectRuleId = 1;
const fileRedirectRuleId = 2;

function updateContextMenu() {
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        id: 'open_with',
        title: 'Open with DjVu.js Viewer',
        contexts: ['link'],
        targetUrlPatterns: [
            '*://*/*.djvu',
            '*://*/*.djv',
            '*://*/*.djvu?*',
            '*://*/*.djv?*',

            '*://*/*.DJVU',
            '*://*/*.DJV',
            '*://*/*.DJVU?*',
            '*://*/*.DJV?*',
        ]
    });
    chrome.contextMenus.onClicked.addListener(info => {
        if (info.menuItemId === 'open_with') {
            openViewerTab(info.linkUrl);
        }
    });
}

function promisify(func) {
    return function (...args) {
        return new Promise(resolve => {
            func(...args, resolve);
        });
    };
}

const getViewerUrl = (djvuUrl = null, djvuName = null) => {
    const params = new URLSearchParams();
    djvuUrl && params.set('url', djvuUrl);
    djvuName && params.set('name', djvuName);
    const queryString = params.toString();
    return extensionUrl + (queryString ? '?' + queryString : '');
};

const executeScript = (src, sender) => {
    if (isManifestV3()) {
        return chrome.scripting.executeScript({
            files: [src],
            target: {
                tabId: sender.tab.id,
                frameIds: [sender.frameId],
            }
        });
    }

    return promisify(chrome.tabs.executeScript)(sender.tab.id, {
        frameId: sender.frameId,
        file: src,
        runAt: 'document_end'
    });
}

function listenForMessages() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (sender.tab && message === 'include_scripts') {
            Promise.all([
                executeScript('dist/djvu.js', sender),
                executeScript('dist/djvu_viewer.js', sender),
            ]).then(() => {
                sendResponse();
            })
            return true; // do not send response immediately
        }

        if (message.command === 'open_viewer_tab') {
            openViewerTab(message.url);
        }

        sendResponse();
    });
}

function openViewerTab(djvuUrl = null) {
    chrome.tabs.create({ url: getViewerUrl(djvuUrl) });
}

function enableFileOpeningInterception() {
    if (isManifestV3()) {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [fileRedirectRuleId],
            addRules: [{
                id: fileRedirectRuleId,
                action: {
                    type: 'redirect',
                    redirect: { regexSubstitution: `${extensionUrl}?url=\\0` },
                },
                condition: {
                    isUrlFilterCaseSensitive: false,
                    regexFilter: '^file:///.+\\.djvu?$',
                    resourceTypes: ['main_frame'],
                },
            }],
        });
    } else {
        chrome.webRequest.onBeforeRequest.addListener(details => {
                return { redirectUrl: getViewerUrl(details.url) };
            }, {
                urls: [
                    'file:///*/*.djvu',
                    'file:///*/*.djvu?*',
                    'file:///*/*.djv',
                    'file:///*/*.djv?*',

                    'file:///*/*.DJVU',
                    'file:///*/*.DJVU?*',
                    'file:///*/*.DJV',
                    'file:///*/*.DJV?*',
                ],
                types: ['main_frame']
            },
            ['blocking']
        );
    }
}

// it shouldn't be the same function as the file opening interceptor,
// since this event listener can be removed independently of the file opening interceptor
const requestInterceptor = details => {
    // http://*/*.djvu also corresponds to "http://localhost/page.php?file=doc.djvu"
    // so we have to add this additional check, because it's not a link to a file.
    if (/\.djvu?$/i.test(new URL(details.url).pathname)) {
        return { redirectUrl: getViewerUrl(details.url) };
    }
}

// it's "undefined" for manifest v3, because the "webRequest" permission isn't requested
const onBeforeRequest = chrome.webRequest?.onBeforeRequest;
const onHeadersReceived = chrome.webRequest?.onHeadersReceived;

// Detect djvu only by URL
const enableHttpIntercepting = () => {
    if (isManifestV3()) {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [httpRedirectRuleId],
            addRules: [{
                id: httpRedirectRuleId,
                action: {
                    type: 'redirect',
                    redirect: { regexSubstitution: `${extensionUrl}?url=\\0` },
                },
                condition: {
                    isUrlFilterCaseSensitive: false,
                    regexFilter: '^https?://[^?]+\\.djvu?(\\?.*)?',
                    resourceTypes: ['main_frame', 'sub_frame'],
                },
            }],
        });
    } else {
        !onBeforeRequest.hasListener(requestInterceptor) && onBeforeRequest.addListener(requestInterceptor, {
                urls: [
                    'http://*/*.djvu',
                    'http://*/*.djvu?*',
                    'https://*/*.djvu',
                    'https://*/*.djvu?*',
                    'http://*/*.djv',
                    'http://*/*.djv?*',
                    'https://*/*.djv',
                    'https://*/*.djv?*',

                    'http://*/*.DJVU',
                    'http://*/*.DJVU?*',
                    'https://*/*.DJVU',
                    'https://*/*.DJVU?*',
                    'http://*/*.DJV',
                    'http://*/*.DJV?*',
                    'https://*/*.DJV',
                    'https://*/*.DJV?*',
                ],
                types: ['main_frame', 'sub_frame'],
            },
            ['blocking']
        );
    }
};

const disableHttpIntercepting = () => {
    if (isManifestV3()) {
        chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [httpRedirectRuleId] });
    } else {
        onBeforeRequest.hasListener(requestInterceptor) && onBeforeRequest.removeListener(requestInterceptor);
    }
};

const headersAnalyzer = details => {
    const getFileName = () => {
        const contentDisposition = details.responseHeaders.find(item => item.name.toLowerCase() === 'content-disposition');
        if (contentDisposition) {
            // In fact, there may be also filename*= in the header, so perhaps, it will be needed for someone in the future
            const matches = /(?:attachment|inline);\s+filename="(.+\.djvu?)"/.exec(contentDisposition.value);
            return matches && matches[1];
        }
    };

    const contentType = details.responseHeaders.find(item => item.name.toLowerCase() === 'content-type');
    if (contentType) {
        if (contentType.value === 'image/vnd.djvu' || contentType.value === 'image/x.djvu') {
            // analyse Content-Disposition only if there is no filename in the URL
            return { redirectUrl: getViewerUrl(details.url, /\.djvu?(?:\?.*)?$/.test(details.url) ? null : getFileName()) };
        } else if (contentType.value === 'application/octet-stream') {
            const fileName = getFileName();
            if (fileName) {
                return { redirectUrl: getViewerUrl(details.url, fileName) };
            }
        }
    }
};

const enableHeadersAnalysis = () => {
    !onHeadersReceived.hasListener(headersAnalyzer) && onHeadersReceived.addListener(headersAnalyzer, {
        urls: [
            'http://*/*',
            'https://*/*',
        ],
        types: ['main_frame', 'sub_frame'],
    }, ['blocking', 'responseHeaders']);
};

const disableHeadersAnalysis = () => {
    onHeadersReceived.hasListener(headersAnalyzer) && onHeadersReceived.removeListener(headersAnalyzer)
};

const defaultOptions = Object.freeze({
    // here we duplicated only the options, which are used by the extension code
    interceptHttpRequests: true,
    analyzeHeaders: false,
});

const onOptionsChanged = json => {
    let parsedOptions = {};
    try {
        parsedOptions = json ? JSON.parse(json) : {};
    } catch (e) {
        console.error('DjVu.js Extension: cannot parse options json from the storage. The json: \n', json);
        console.error(e);
    }

    try {
        const options = { ...defaultOptions, ...parsedOptions };
        if (options.interceptHttpRequests) {
            enableHttpIntercepting();
        } else {
            disableHttpIntercepting();
        }

        if (isManifestV3()) return;

        if (options.interceptHttpRequests && options.analyzeHeaders) {
            enableHeadersAnalysis();
        } else {
            disableHeadersAnalysis();
        }
    } catch (e) {
        console.error('DjVu.js Extension: some options might not have been applied due to an error.');
        console.error(e);
    }
};

function applySavedOptions() {
    chrome.storage.local.get('djvu_js_options', options => onOptionsChanged(options['djvu_js_options']));
}

function listenForOptionChanges() {
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes['djvu_js_options']) {
            if (changes['djvu_js_options'].newValue) {
                onOptionsChanged(changes['djvu_js_options'].newValue);
            }
        }
    });
}

function main() {
    // For manifest v3 onInstalled and onStartup events could be used to update the context menu
    // and to register the file opening interception rules, but it seems to work well
    // this way - it's updated every time the service worker is started.
    updateContextMenu();
    enableFileOpeningInterception();
    chrome[isManifestV3() ? 'action' : 'browserAction'].onClicked.addListener(() => openViewerTab());
    listenForMessages();
    listenForOptionChanges();
    applySavedOptions();
}

main();
