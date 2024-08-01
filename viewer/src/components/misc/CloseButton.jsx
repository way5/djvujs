import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";

export default ({ onClick, className = '' }) => {
    return (
        <FaRegTimesCircle
            className={'icon-button' + `${className ? ' ' + className : ' close-button'}`}
            onClick={onClick}
            data-djvujs-class="close_button"
        />
    );
};