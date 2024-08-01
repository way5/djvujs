import { FaTools } from "react-icons/fa";
import React from "react";
// import { iconButton } from "../cssMixins";
// import styled from "styled-components";
// import { ControlButton } from "../StyledPrimitives";

// const Root = styled(FiCommand)`
//     ${iconButton};
//     font-size: 2em;
//     color: var(--highlight-color);
//     margin-left: ${p => p.theme.isMobile ? 0 : '1em'};
// `;

export default ({ onClick }) => {
    return (
        <FaTools
            className="menu-button"
            onClick={onClick}
            data-djvujs-id="menu_button"
        />
    );
}