import React from "react";
import { TbPlaystationX } from "react-icons/tb";

export default ({ onClick, className = '' }) => {
    return (
        <TbPlaystationX
            className={'icon-button' + `${className ? ' ' + className : ' close-button'}`}
            onClick={onClick}
            data-djvujs-class="close_button"
        />
    );
};