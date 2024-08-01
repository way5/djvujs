import React from 'react';
import { useTranslation } from '../Translation';
import { FaSpinner } from "react-icons/fa";
// import { Spinner } from "../StyledPrimitives";
// import styled from "styled-components";

// const Root = styled.div`
//     display: flex;
//     align-items: center;

//     span {
//         margin-left: 0.5em;
//     }
// `;

export default ({ style }) => {
    const t = useTranslation();

    return (
        <div
            style={style}
            className='loading-phrase'
        >
            <FaSpinner className='spinner' />
            <span>{t('Loading')}...</span>
        </div>
    );
};