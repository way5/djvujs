import React from "react";
// import styled, { css } from "styled-components";
import CloseButton from "./misc/CloseButton";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../reducers";
import FileBlock from "./FileBlock";
// import OptionsButton from "./misc/OptionsButton";
// import HelpButton from "./misc/HelpButton";
// import { ControlButton } from "./StyledPrimitives";
import { FaPrint } from "react-icons/fa";
import { ActionTypes } from "../constants";
import { useTranslation } from "./Translation";
import SaveButton from "./misc/SaveButton";
import Actions from "../actions/actions";
import { useAppContext } from "./AppContext";
import ScaleGizmo from "./Toolbar/ScaleGizmo";
import RotationControl from "./Toolbar/RotationControl";
import ViewModeButtons from "./Toolbar/ViewModeButtons";
import CursorModeButtonGroup from "./Toolbar/CursorModeButtonGroup";
import FullPageViewButton from "./misc/FullPageViewButton";
import FullscreenButton from "./misc/FullscreenButton";

// const Root = styled.div`
//     font-size: 16px;
//     --button-basic-size: 1em;
//     position: absolute;
//     bottom: calc(100% + var(--app-padding));
//     right: 0;
//     z-index: 1;
//     min-height: min(15em, ${p => p.theme.appHeight * 0.7}px);
//     max-height: ${p => p.theme.appHeight * 0.7}px;

//     width: fit-content;
//     max-width: 90%;
//     background: var(--background-color);
//     border: 1px solid var(--border-color);
//     border-radius: 5px 0 5px 0;
//     padding: 0.5em;
//     overflow: hidden;

//     display: flex;
//     flex-direction: column;

//     ${p => p.$opened ? 'transform: translateX(0);' : 'transform: translateX(calc(100% + var(--app-padding) * 2));'};

//     transition: transform 0.5s;
// `;

// const MenuWrapper = styled.div`
//     display: flex;
//     flex-direction: column;

//     & > * {
//         margin-bottom: 1em;
//     }
// `;

// const Header = styled.div`
//     display: flex;
//     align-items: center;
//     border-bottom: 1px solid var(--border-color);
//     padding-bottom: 0.5em;
//     margin-bottom: 0.5em;
//     font-size: 1.5em;

//     svg {
//         margin-left: auto;
//     }

//     span {
//         margin-right: 1em;
//     }
// `;

// const DocumentWrapper = styled.div`
//     border-bottom: 1px solid var(--border-color);
//     margin-bottom: 1em;
//     padding-bottom: 0.5em;
//     padding-left: 0.5em;

//     & > div:first-child {
//         margin-bottom: 1em;
//     }
// `;

// const documentControlsMobileStyle = css`
//     flex-direction: column;
//     padding-left: 1em;
//     align-items: flex-start;
//     border-bottom: 1px dashed var(--border-color);
//     margin-bottom: 1em;

//     & > * {
//         margin-bottom: 0.5em;
//     }
// `;

// const DocumentControls = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     margin-top: 1em;

//     ${p => p.theme.isMobile ? documentControlsMobileStyle : ''};
// `;

// const MenuItemStyle = css`
//     cursor: pointer;

//     :hover {
//         & svg {
//             transform: scale(1.1);
//         }
//     }
// `;

// const DocumentControl = styled.div`
//     ${MenuItemStyle};
//     margin-right: 1.5em;
//     white-space: nowrap;
//     display: flex;
//     align-items: center;

//     ${ControlButton} {
//         margin-left: 0;
//     }
// `;

// const MobileControl = styled.div`
//     display: flex;
//     align-items: center;
//     margin-bottom: 1em;

//     & > span:first-child {
//         margin-right: 1em;
//     }
// `;

// const Content = styled.div`
//     overflow: auto;
// `;

const Menu = ({ isOpened, onClose }) => {
    // const dispatch = useDispatch();
    const t = useTranslation();
    const fileName = useSelector(get.fileName);
    const {
        hideOpenAndCloseButtons,
        hidePrintButton,
        hideSaveButton,
        hideFullPageSwitch,
        hideFullScreenSwithch,
        hideDocumentInfo,
    } = useSelector(get.uiOptions);
    const { isMobile } = useAppContext();

    const closeHandler = onClose;

    const DocumentInfo = () => {
        return (
            <>
                <div>{t("Document")}:</div>
                {hideOpenAndCloseButtons ? (
                    fileName ? (
                        <span>{fileName}</span>
                    ) : null
                ) : (
                    <FileBlock fileName={fileName || ""} />
                )}

                <div
                    className='document-controls'
                    // css={`
                    //     ${p => p.theme.isMobile ? 'mobile-style' : ''};
                    // `}
                >
                    {hidePrintButton ? null : (
                        <div
                            className='document-control'
                            onClick={() => {
                                dispatch({
                                    type: ActionTypes.OPEN_PRINT_DIALOG,
                                });
                                closeHandler();
                            }}
                            title={t("Print document")}
                        >
                            {/* <ControlButton as={FaPrint} /> */}
                            <FaPrint className='icon-button' />
                            <span>{t("Print")}</span>
                        </div>
                    )}

                    {hideSaveButton ? null : (
                        // <div
                        //     className='document-control'
                        //     onClick={closeHandler}
                        // >
                        <SaveButton
                            onClick={closeHandler}
                            withLabel={true}
                            className='document-control'
                        />
                        // </div>
                    )}

                    {hideOpenAndCloseButtons ? null : (
                        <div
                            className='document-control'
                            onClick={() =>
                                dispatch(Actions.closeDocumentAction())
                            }
                        >
                            {/* <ControlButton
                                    as={CloseButton}
                                    css={`
                                        font-size: 1em;
                                    `}
                                /> */}
                            <CloseButton className='icon-button' />
                            <span>{t("Close")}</span>
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div
            style={{
                minHeight: `min(15em, ${(p) => p.theme.appHeight * 0.7}px)`,
                maxHeight: `${(p) => p.theme.appHeight * 0.7}px`,
            }}
            className={
                "menu-block" +
                (isOpened ? " transform-hide" : " transform-show")
            }
            data-djvujs-id='menu'
        >
            <div className='header'>
                <span>{t("Menu")}</span>
                <CloseButton onClick={closeHandler} />
            </div>

            <div className='content'>
                <div className='document-wrapper'>
                    {!hideDocumentInfo ? <DocumentInfo /> : null}

                    {isMobile ? (
                        <>
                            <div className='mobile-control'>
                                <span>{t("View mode")}:</span>
                                <ViewModeButtons />
                            </div>
                            <div className='mobile-control'>
                                <span>{t("Scale")}:</span>
                                <ScaleGizmo />
                            </div>
                            <div className='mobile-control'>
                                <span>{t("Rotation")}:</span>
                                <RotationControl />
                            </div>
                            <div className='mobile-control'>
                                <span>{t("Cursor mode")}:</span>
                                <CursorModeButtonGroup />
                            </div>
                        </>
                    ) : null}
                </div>

                <div className='menu-wrapper'>
                    {isMobile && !hideFullPageSwitch ? (
                        <div className='mobile-control'>
                            <span>{t("Full page mode")}:</span>
                            <FullPageViewButton />
                        </div>
                    ) : null}
                    {(document.fullscreenEnabled ||
                        document.webkitFullscreenEnabled) &&
                    !hideFullScreenSwithch ? (
                        <div className='mobile-control'>
                            <span>{t("Fullscreen mode")}:</span>
                            <FullscreenButton />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Menu;
