import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from './ModalWindow';
import { useTranslation } from "../Translation";
import { ActionTypes } from "../../constants";
import { get } from "../../reducers";
import { getHeaderAndErrorMessage } from "../helpers";


export default () => {
    const t = useTranslation();
    const dispatch = useDispatch();
    const error = useSelector(get.error);

    if (!error) return null;

    const { header, message, isJSON } = getHeaderAndErrorMessage(t, error);

    return (
        <ModalWindow
            className='error-window'
            isError={true}
            onClose={() => dispatch({ type: ActionTypes.CLOSE_ERROR_WINDOW })}
        >
            <div>
                <div
                    className='header'
                >
                    {header}
                </div>
                <div
                    className={'body' + (isJSON ? ' json' : '')}
                >
                    {message}
                </div>
            </div>
        </ModalWindow>
    );
};