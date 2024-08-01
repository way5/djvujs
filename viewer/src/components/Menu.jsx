import React from "react";
import CloseButton from "./misc/CloseButton";
import { useSelector } from "react-redux";
import { get } from "../reducers";
import FileBlock from "./FileBlock";
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
                            <FaPrint className='icon-button' />
                            <span>{t("Print")}</span>
                        </div>
                    )}

                    {hideSaveButton ? null : (
                        <SaveButton
                            onClick={closeHandler}
                            withLabel={true}
                            className='document-control'
                        />
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
