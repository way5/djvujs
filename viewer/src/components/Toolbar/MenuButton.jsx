import { TbAdjustmentsAlt } from "react-icons/tb";
import React from "react";

export default ({ onClick }) => {
    return (
        <TbAdjustmentsAlt
            className="menu-button"
            onClick={onClick}
            data-djvujs-id="menu_button"
        />
    );
}