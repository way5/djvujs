import React from "react";
// import styled from "styled-components";
import { IoDesktopOutline } from "react-icons/io5";
// import { iconButton } from "../cssMixins";
import { useAppContext } from "../AppContext";
import { useTranslation } from "../Translation";
// import { ControlButton } from "../StyledPrimitives";

// const FullscreenButton = styled(IoDesktopOutline)`
//     ${iconButton};
//     font-size: 1.1em;

//     color: ${p => p.$active ? 'var(--highlight-color)' : 'inherit'};
// `;

const FullscreenButton = ({ className = "" }) => {
    // const { isFullscreen, toggleFullscreen } = useAppContext();
    const { toggleFullscreen } = useAppContext();
    const t = useTranslation();

    return (
        <IoDesktopOutline
            // css={'icon-button'}
            className={"icon-button" + (className ? " " + className : "")}
            data-djvujs-class='fullscreen_button'
            title={t("Fullscreen mode")}
            // $active={isFullscreen}
            onClick={toggleFullscreen}
        />
    );
};

export default FullscreenButton;
