import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../../constants";
import { get } from "../../reducers";
import { useTranslation } from "../Translation";

export default () => {
    const dispatch = useDispatch();
    const isOpened = useSelector(get.isContentsOpened);
    const t = useTranslation();

    const ContensButtonElement = isOpened ? TbLayoutSidebarLeftCollapseFilled : TbLayoutSidebarLeftExpandFilled;

    return (
        <ContensButtonElement
            className='contents-button'
            onClick={() => dispatch({ type: ActionTypes.TOGGLE_CONTENTS })}
            data-djvujs-id='contents_button'
            title={t("Table of contents")}
        />
    );
};
