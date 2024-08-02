import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbHandStop, TbCursorText } from "react-icons/tb";
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
                <TbCursorText
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
                <TbHandStop
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
