import React from "react";
import { TbArrowsMaximize, TbArrowsMinimize } from "react-icons/tb";
import { useAppContext } from "../AppContext";
import { useTranslation } from "../Translation";


const FullscreenButton = ({ className = "" }) => {
    const { toggleFullscreen } = useAppContext();
    const t = useTranslation();
    const {isFullscreen} = useAppContext();
    const IconElement = (isFullscreen ? TbArrowsMinimize : TbArrowsMaximize);

    return (
        <IconElement
            className={"icon-button" + (className ? " " + className : "")}
            data-djvujs-class='fullscreen_button'
            title={t("Fullscreen mode")}
            onClick={toggleFullscreen}
        />
    );
};

export default FullscreenButton;
