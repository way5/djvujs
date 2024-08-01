import { FaTools } from "react-icons/fa";
import React from "react";

export default ({ onClick }) => {
    return (
        <FaTools
            className="menu-button"
            onClick={onClick}
            data-djvujs-id="menu_button"
        />
    );
}