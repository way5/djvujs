import React from "react";
import { IoDesktopOutline } from "react-icons/io5";
import { useAppContext } from "../AppContext";
import { useTranslation } from "../Translation";


const FullscreenButton = ({ className = "" }) => {
    const { toggleFullscreen } = useAppContext();
    const t = useTranslation();

    return (
        <IoDesktopOutline
            className={"icon-button" + (className ? " " + className : "")}
            data-djvujs-class='fullscreen_button'
            title={t("Fullscreen mode")}
            onClick={toggleFullscreen}
        />
    );
};

export default FullscreenButton;
