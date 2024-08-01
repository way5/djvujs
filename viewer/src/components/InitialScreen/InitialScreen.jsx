import React from "react";
import viewerPackage from "../../../package.json";
import libPackage from "../../../../library/package.json";
// import HelpButton from '../misc/HelpButton';
// import FileZone from './FileZone';
// import DjVu from '../../DjVu';
// import { inExtension } from '../../utils';
// import LinkBlock from './LinkBlock';
import { useTranslation } from "../Translation";
// import { LanguagePanel } from "../Language/LanguagePanel";
// import ThemeSwitcher from './ThemeSwitcher';
// import OptionsButton from "../misc/OptionsButton";
// import FullPageViewButton from "../misc/FullPageViewButton";
// import { useAppContext } from "../AppContext";
// import LanguageSelector from "../Language/LanguageSelector";
// import FullscreenButton from "../misc/FullscreenButton";

export default () => {
    const t = useTranslation();
    // const { isMobile } = useAppContext();

    return (
        <div className='initial-screen'>
            <div className='info-block'>
                <h5>{`${t("Nothing to display")}`}</h5>
                <span>
                    (
                    {`viewer: ${viewerPackage.version} / lib: ${libPackage.version}`}
                    )
                </span>
            </div>

            {/* {isMobile ? <LanguageSelector /> : <LanguagePanel />}
            <ThemeSwitcher />
            <div css={`margin: auto;`}>

                <div css={`text-align: center; font-size: 2em`}>
                    {`DjVu.js Viewer v.${DjVu.Viewer.VERSION}`}
                </div>
                <div css={`font-style: italic; margin-top: 0.5em; margin-bottom: 1em; font-size: 0.8em`}>
                    {`(${t('powered with')} DjVu.js v.${DjVu.VERSION})`}
                </div>

                <InfoBlock>
                    <div>{t('#optionsButton - see the available options', {
                        '#optionsButton': <OptionsButton />
                    })}</div>
                    <div>{t('#helpButton - learn more about the app', { '#helpButton': <HelpButton /> })}</div>
                </InfoBlock>
                {inExtension ? <LinkBlock /> : null}
                <FileZone />
            </div>
            <Footer>
                {(document.fullscreenEnabled || document.webkitFullscreenEnabled) ?
                    <FullscreenButton css={`margin-right: 0.5em;`} /> : null}
                <FullPageViewButton />
            </Footer> */}
        </div>
    );
};
