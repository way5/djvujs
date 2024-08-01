import React from 'react';
import { useDispatch } from 'react-redux';
import { FaRegQuestionCircle } from "react-icons/fa";
import Actions from '../../actions/actions';
import { useTranslation } from "../Translation";
// import { controlButton } from "../cssMixins";
// import { ControlButtonWrapper } from '../StyledPrimitives';

const HelpButton = ({ withLabel = null, onClick = () => {} }) => {
    const dispatch = useDispatch();
    const t = useTranslation();

    return (
        <span
            className='control-button-wrapper'
            title={t("Show help window")}
            data-djvujs-class="help_button"
            onClick={() => {
                dispatch(Actions.showHelpWindowAction());
                onClick();
            }}
        >
            <FaRegQuestionCircle className='icon-button' />
            {withLabel ? <span>{t('About')}</span> : null}
        </span>
    );
};

export default HelpButton;