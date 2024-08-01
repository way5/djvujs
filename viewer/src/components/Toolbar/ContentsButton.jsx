import { FaList, FaListAlt } from "react-icons/fa";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../../constants";
import { get } from "../../reducers";
import { useTranslation } from "../Translation";

export default () => {
    const dispatch = useDispatch();
    const isOpened = useSelector(get.isContentsOpened);
    const t = useTranslation();

    const ContensButtonElement = isOpened ? FaListAlt : FaList;

    return (
        <ContensButtonElement
            className='contents-button'
            onClick={() => dispatch({ type: ActionTypes.TOGGLE_CONTENTS })}
            data-djvujs-id='contents_button'
            title={t("Table of contents")}
        />
    );
};
