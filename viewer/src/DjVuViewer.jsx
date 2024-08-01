import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import App from './components/App.jsx';
import Actions from './actions/actions';
import configure from './store';
import EventEmitter from 'eventemitter3';
import Constants, { constant, ActionTypes } from './constants';
import { get } from './reducers';
import dictionaries from './locales';

const Events = constant({
    PAGE_NUMBER_CHANGED: null,
    DOCUMENT_CHANGED: null,
    DOCUMENT_CLOSED: null,
});

export default class DjVuViewer extends EventEmitter {

    static Events = Events;
    static Constants = Constants;
    static ActionTypes = ActionTypes;
    static get = get;

    static getAvailableLanguages() {
        return Object.keys(dictionaries);
    };

    /**
     * Technically, we can pass the same config as to the configure() method.
     * But some options are reset when a new document is loaded.
     */
    constructor(config = null) {
        super();
        this.store = configure(this.eventMiddleware);
        config && this.configure(config);
    }

    eventMiddleware = store => next => action => {
        let result;
        switch (action.type) {
            case Constants.SET_NEW_PAGE_NUMBER_ACTION:
                const oldPageNumber = this.getPageNumber();
                result = next(action);
                const newPageNumber = this.getPageNumber();
                if (oldPageNumber !== newPageNumber) {
                    this.emit(Events.PAGE_NUMBER_CHANGED);
                }
                break;

            case Constants.DOCUMENT_CREATED_ACTION:
                result = next(action);
                this.emit(Events.DOCUMENT_CHANGED);
                break;

            case Constants.CLOSE_DOCUMENT_ACTION:
                result = next(action);
                this.emit(Events.DOCUMENT_CLOSED);
                break;

            case Constants.END_FILE_LOADING_ACTION: // use in this.loadDocumentByUrl only
                result = next(action);
                this.emit(Constants.END_FILE_LOADING_ACTION);
                break;

            default:
                result = next(action);
                break;
        }

        return result;
    };

    getPageNumber() {
        return get.currentPageNumber(this.store.getState());
    }

    getDocumentName() {
        return get.fileName(this.store.getState());
    }

    _render() {
        this.reactRoot.render(
            <Provider store={this.store}>
                <App shadowRoot={this.htmlElement} />
            </Provider>
        );
    }

    render(element) {
        this.unmount();
        this.htmlElement = element;
        this.reactRoot = createRoot(element);
        //this.shadow = element.attachShadow({ mode: 'open' });

        this._render();
    }

    unmount() {
        this.reactRoot && this.reactRoot.unmount();
        this.reactRoot = null;
        this.htmlElement = null;
    }

    destroy() {
        this.unmount();
        this.store.dispatch({ type: ActionTypes.DESTROY });
    }

    /**
     * The config object is destructed merely for the purpose of documentation
     * @param {number} pageNumber
     * @param {0|90|180|270} pageRotation
     * @param {'continuous'|'single'|'text'} viewMode
     * @param {number} pageScale
     * @param {string} language
     * @param {'dark'|'light'} theme
     * @param {{
          hideFullPageSwitch: boolean,
          hideFullScreenSwithch: boolean,
          hideDocumentInfo: boolean,
          changePageOnScroll: boolean,
          showContentsAutomatically: boolean,
          hideOpenAndCloseButtons: boolean,
          hidePrintButton: boolean,
          hideSaveButton: boolean,
       }} uiOptions
     * @returns {DjVuViewer}
     */
    configure({
        pageNumber,
        pageRotation,
        viewMode,
        pageScale,
        language,
        theme,
        uiOptions,
    } = {}) {
        this.store.dispatch({
            type: ActionTypes.CONFIGURE,
            pageNumber, pageRotation, viewMode, pageScale, language, theme, uiOptions,
        });

        return this;
    }

    loadDocument(buffer, name = "***", config = {}) {
        return new Promise(resolve => {
            this.once(Events.DOCUMENT_CHANGED, () => resolve());
            // the buffer is transferred to the worker, so we copy it
            this.store.dispatch(Actions.createDocumentFromArrayBufferAction(buffer.slice(0), name, config));
        });
    }

    loadDocumentByUrl(url, config = null) {
        return new Promise(resolve => {
            this.once(Constants.END_FILE_LOADING_ACTION, () => resolve());
            this.store.dispatch({
                type: ActionTypes.LOAD_DOCUMENT_BY_URL,
                url: url,
                config: config
            });
        });
    }
}
