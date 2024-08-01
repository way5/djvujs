import React from "react";
import { useTranslation } from "../Translation";
import { FaSpinner } from "react-icons/fa";

export default ({ style }) => {
    const t = useTranslation();

    return (
        <div style={style} className='loading-phrase'>
            <FaSpinner className='spinner' />
            <span>{t("Loading")}...</span>
        </div>
    );
};
