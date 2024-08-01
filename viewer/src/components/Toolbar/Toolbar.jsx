import React from "react";
import PageNumberBlock from "./PageNumberBlock";
import ScaleGizmo from "./ScaleGizmo";
import ViewModeButtons from "./ViewModeButtons";
import CursorModeButtonGroup from "./CursorModeButtonGroup";
import RotationControl from "./RotationControl";
import ContentsButton from "./ContentsButton";
import FullPageViewButton from "../misc/FullPageViewButton";
import MenuButton from "./MenuButton";
import PinButton from "./PinButton";
import Menu from "../Menu";
import { useAppContext } from "../AppContext";
import HideButton from "./HideButton";
import { useSelector } from "react-redux";
import { get } from "../../reducers";

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
                onMouseEnter={reallyPinned ? null : onMouseEnter}
                onMouseLeave={reallyPinned ? null : onMouseLeave}
                data-djvujs-id='toolbar'
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
                    {isMobile || hideFullPageSwitch ? null : (
                        <FullPageViewButton />
                    )}
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
