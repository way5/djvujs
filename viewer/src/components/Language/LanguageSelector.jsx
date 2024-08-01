import { ActionTypes } from "../../constants";
import dictionaries from "../../locales";
import LanguageWarningSign from "./LanguageWarningSign";
import React from "react";
import { useTranslation } from "../Translation";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../reducers";

export default () => {
    const { locale } = useSelector(get.options);
    const dispatch = useDispatch();
    const t = useTranslation();

    return (
        <div className='language-selector'>
            <span>{t("Language")}:</span>
            <select
                value={locale}
                onChange={(e) =>
                    dispatch({
                        type: ActionTypes.UPDATE_OPTIONS,
                        payload: { locale: e.target.value },
                    })
                }
            >
                {Object.entries(dictionaries).map(([code, dic]) => (
                    <option value={code} key={code}>
                        {dic.nativeName}
                    </option>
                ))}
            </select>
            <LanguageWarningSign languageCode={locale} />
            {/* <AddLanguageButton
                css={`
                    font-size: 1.2em;
                `}
            /> */}
        </div>
    );
};
