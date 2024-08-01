import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from './ModalWindow';
import { useTranslation } from "../Translation";
// import styled from "styled-components";
import { ActionTypes } from "../../constants";
import { get } from "../../reducers";
import { getHeaderAndErrorMessage } from "../helpers";

// const Header = styled.div`
//     border-bottom: 1px solid gray;
//     padding: 0 0.5em;
// `;

// const Body = styled.div`
//     margin-top: 1em;
//     padding: 0 0.5em;

//     ${p => p.$json ? `
//         white-space: pre;
//         font-family: Consolas, monospace;
//     ` : ''};
// `;

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
                    // $json={isJSON}
                >
                    {message}
                </div>
            </div>
        </ModalWindow>
    );
};