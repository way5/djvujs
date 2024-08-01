import React from "react";
// import { iconButton } from "../cssMixins";
import { FaRegTimesCircle } from "react-icons/fa";

export default ({ onClick, className = '' }) => {
    return (
        <FaRegTimesCircle
            className={'icon-button' + `${className ? ' ' + className : ' close-button'}`}
            // css={iconButton}
            onClick={onClick}
            data-djvujs-class="close_button"
        />
    );
};