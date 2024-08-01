import React from "react";
import LoadingPhrase from "./misc/LoadingPhrase";
import { useTranslation } from "./Translation";

export default ({ text }) => {
    const t = useTranslation();

    return (
        <div className='text-block'>
            <pre>
                {text === null ? (
                    <LoadingPhrase />
                ) : (
                    text || <em>{t("No text on this page")}</em>
                )}
            </pre>
        </div>
    );
};
