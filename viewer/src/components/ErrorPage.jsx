import React from "react";
import { useTranslation } from "./Translation";
import { getHeaderAndErrorMessage } from "./helpers";

export default ({ pageNumber, error }) => {
    const t = useTranslation();
    const { header, message } = getHeaderAndErrorMessage(t, error);

    return (
        <div className='error-page'>
            <div className='header'>
                {`${t("Error on page")} №${pageNumber}`}
            </div>
            <div className='body'>
                <div>
                    {header}
                </div>
                <div>
                    {message}
                </div>
            </div>
        </div>
    );
};
