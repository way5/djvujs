import React from "react";
import PageNumberBlock from "./PageNumberBlock";
import ScaleGizmo from "./ScaleGizmo";
import ViewModeButtons from "./ViewModeButtons";
import CursorModeButtonGroup from "./CursorModeButtonGroup";
import RotationControl from "./RotationControl";
// import styled, { css } from 'styled-components';
import ContentsButton from "./ContentsButton";
import FullPageViewButton from "../misc/FullPageViewButton";
import MenuButton from "./MenuButton";
import PinButton from "./PinButton";
import Menu from "../Menu";
import { useAppContext } from "../AppContext";
import HideButton from "./HideButton";
import { useSelector } from "react-redux";
import { get } from "../../reducers";

// const toolbarHeight = '42px';

// const mobileStyle = css`
//     font-size: 16px;

//     & > * {
//         margin-right: 0;
//         margin-left: 0;
//     }
// `

// const Root = styled.div`
//     position: relative;
//     flex: 0 0 auto;
//     border: 1px solid var(--border-color);
//     border-radius: 0 7px 0 7px;
//     padding: 7px 4px;
//     display: flex;
//     flex-wrap: nowrap;
//     justify-content: space-between;
//     align-items: center;
//     height: ${toolbarHeight};
//     box-sizing: border-box;
//     align-self: stretch;
//     margin-top: var(--app-padding);
//     z-index: 2;

//     font-size: 14px;
//     --button-basic-size: 1.5em;

//     margin-bottom: 0;
//     transition: margin-bottom 0.5s;
//     ${p => p.$hidden ? `margin-bottom: calc(-${toolbarHeight} - var(--app-padding) - 1px)` : ''}; // -1px just for cypress

//     ${p => p.$mobile ? mobileStyle : ''};
// `;

// const CentralPanel = styled.div`
//     height: 100%;
//     max-width: 45em;
//     margin: 0 auto;
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     & > * {
//         margin: 0 0.8em;
//     }
// `;

// const RightPanel = styled.div`
//     height: 100%;
//     display: flex;
//     align-items: center;
// `;

// const InvisibleLayer = styled.div`
//     position: absolute;
//     bottom: 0;
//     height: calc(${toolbarHeight} + var(--app-padding) * 2);
//     width: 100%;
//     z-index: 1;
// `;

export default () => {
    const [pinned, setPinned] = React.useState(true);
    const [autoHidden, setAutoHidden] = React.useState(false);
    const [manuallyHidden, setManuallyHidden] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const onMouseEnter = React.useCallback(
        () => setAutoHidden(false),
        [setAutoHidden]
    );
    const onMouseLeave = React.useCallback(
        () => setAutoHidden(true),
        [setAutoHidden]
    );
    const handlePin = React.useCallback(() => {
        setPinned(!pinned);
    }, [pinned, setPinned]);

    const { isMobile } = useAppContext();
    const reallyPinned = isMobile || pinned;
    const reallyHidden =
        (manuallyHidden && isMobile) || (autoHidden && !reallyPinned);

    const {
        hideOpenAndCloseButtons,
        hidePrintButton,
        hideSaveButton,
        hideFullPageSwitch,
        hideFullScreenSwithch,
        hideDocumentInfo,
    } = useSelector(get.uiOptions);

    const menuIsEmpty =
        hideFullPageSwitch &&
        hideFullScreenSwithch &&
        (hideDocumentInfo ||
            (hideSaveButton && hideOpenAndCloseButtons && hidePrintButton)) &&
        !isMobile;

    return (
        <>
            {reallyPinned ? null : (
                <div
                    className='invisible-layer'
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            )}
            <div
                className={
                    "djvujs-viewer-toolbar" +
                    (isMobile ? " mobile" : "") +
                    (reallyHidden ? " hidden-state" : "")
                }
                // $hidden={reallyHidden}
                onMouseEnter={reallyPinned ? null : onMouseEnter}
                onMouseLeave={reallyPinned ? null : onMouseLeave}
                data-djvujs-id='toolbar'
                // $mobile={isMobile}
            >
                <ContentsButton />
                <div className='central-panel'>
                    {isMobile ? null : <ViewModeButtons />}
                    {isMobile ? null : <CursorModeButtonGroup />}
                    <PageNumberBlock />
                    {isMobile ? null : <ScaleGizmo />}
                    {isMobile ? null : <RotationControl />}
                </div>
                <div className='right-panel' data-djvujs-class='right_panel'>
                    {isMobile ? null : (
                        <PinButton isPinned={pinned} onClick={handlePin} />
                    )}
                    {isMobile || hideFullPageSwitch ? null : <FullPageViewButton />}
                    {isMobile ? (
                        <HideButton
                            onClick={() => setManuallyHidden(!manuallyHidden)}
                            isToolbarHidden={reallyHidden}
                        />
                    ) : null}
                    {menuIsEmpty ? null : (
                        <MenuButton
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        />
                    )}
                </div>
                {menuIsEmpty ? null : (
                    <Menu
                        isOpened={isMenuOpen && !reallyHidden}
                        onClose={() => setIsMenuOpen(false)}
                    />
                )}
            </div>
        </>
    );
};
