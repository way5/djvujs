import React from "react";
import { useDispatch } from "react-redux";
import { FaCog } from "react-icons/fa";
import { useTranslation } from "../Translation";
import { ActionTypes } from "../../constants";

const OptionsButton = ({ withLabel = false, onClick = () => {} }) => {
    const dispatch = useDispatch();
    const t = useTranslation();

    return (
        <span
            className='control-button-wrapper'
            title={t("Show options window")}
            data-djvujs-class='options_button'
            onClick={() => {
                dispatch({
                    type: ActionTypes.TOGGLE_OPTIONS_WINDOW,
                    payload: true,
                });
                onClick();
            }}
        >
            <FaCog className='icon-button' />
            {withLabel ? <span>{t("Options")}</span> : null}
        </span>
    );
};

export default OptionsButton;
