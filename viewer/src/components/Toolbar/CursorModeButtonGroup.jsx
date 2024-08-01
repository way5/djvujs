import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHandPaper, FaICursor } from "react-icons/fa";
import { get } from "../../reducers";
import Constants from "../../constants";
import Actions from "../../actions/actions";
import { useTranslation } from "../Translation";

const CursorModeButtonGroup = () => {
    const cursorMode = useSelector(get.cursorMode);
    const dispatch = useDispatch();
    const t = useTranslation();

    return (
        <div
            className='cursor-mode-buttons'
            data-djvujs-id='cursor_mode_buttons'
        >
            <span
                title={t("Text cursor mode")}
                className={
                    cursorMode === Constants.TEXT_CURSOR_MODE ? "active" : null
                }
            >
                <FaICursor
                    className='icon-button'
                    onClick={() =>
                        dispatch(
                            Actions.setCursorModeAction(
                                Constants.TEXT_CURSOR_MODE
                            )
                        )
                    }
                />
            </span>
            <span
                title={t("Grab cursor mode")}
                className={
                    cursorMode === Constants.GRAB_CURSOR_MODE ? "active" : null
                }
            >
                <FaRegHandPaper
                    className='icon-button'
                    onClick={() =>
                        dispatch(
                            Actions.setCursorModeAction(
                                Constants.GRAB_CURSOR_MODE
                            )
                        )
                    }
                />
            </span>
        </div>
    );
};

export default CursorModeButtonGroup;
