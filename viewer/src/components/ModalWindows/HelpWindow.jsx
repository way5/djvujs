import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaExpand, FaCompress } from "react-icons/fa";
import ModalWindow from './ModalWindow';
import Actions from '../../actions/actions';
import { get } from '../../reducers';
import DjVu from '../../DjVu';
import { useTranslation } from '../Translation';


export default () => {
    const isShown = useSelector(get.isHelpWindowShown);
    const dispatch = useDispatch();
    const t = useTranslation();
    const { hideFullPageSwitch } = useSelector(get.uiOptions);

    if (!isShown) {
        return null;
    }

    return (
        <ModalWindow onClose={() => dispatch(Actions.closeHelpWindowAction())} isFixedSize={true}>
            <div className='help-window'>
                <div className='header'>{`DjVu.js Viewer v.${DjVu.Viewer.VERSION} (DjVu.js v.${DjVu.VERSION})`}</div>
                <div>
                    {t('The application for viewing .djvu files in the browser.')}<br />
                    {t("If something doesn't work properly, feel free to write about the problem at #email.", {
                        '#email': <a target="_blank" rel="noopener noreferrer"
                                     href="mailto:djvujs@yandex.ru">djvujs@yandex.ru</a>
                    })}
                    <br />
                    {t("The official website is #website.", {
                        "#website": <a target="_blank" rel="noopener noreferrer"
                                       href="https://djvu.js.org/">djvu.js.org</a>
                    })}<br />
                    {t("The source code is available on #link.", {
                        "#link": <a target="_blank" rel="noopener noreferrer"
                                    href="https://github.com/RussCoder/djvujs">GitHub</a>
                    })}<br />
                </div>

                <div className='header'>{t('Hotkeys')}</div>
                <div className='hotkey-grid'>
                    <em>Ctrl+S</em><span>- {t('save the document')}</span>
                    <em>{'\u2190'}</em><span>- {t('go to the previous page')}</span>
                    <em>{'\u2192'}</em><span>- {t('go to the next page')}</span>
                </div>

                {hideFullPageSwitch ? null :
                    <>
                        <div className='header'>{t('Controls')}</div>
                        <div>
                            {t("#expandIcon and #collapseIcon are to switch the viewer to the full page mode and back.", {
                                "#expandIcon": <FaExpand />,
                                "#collapseIcon": <FaCompress />,
                            })}
                            {' ' + t("If you work with the browser extension, these buttons will cause no effect, since the viewer takes the whole page by default.")}
                        </div>
                    </>
                }
            </div>
        </ModalWindow>
    );
}