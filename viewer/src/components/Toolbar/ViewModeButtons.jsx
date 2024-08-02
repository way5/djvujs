import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    TbRectangleVertical,
    TbCarouselVertical,
    TbFileText,
    TbCaretRight,
    TbCaretLeft
} from 'react-icons/tb';
import { get } from "../../reducers";
import Constants, { ActionTypes } from "../../constants";
import { useTranslation } from "../Translation";
import { useAppContext } from "../AppContext.jsx";

const PageCount = ({ value, max, onChange, title, style }) => {
    return (
        <span className='page-count' title={title} style={style}>
            <TbCaretLeft
                djvujs-disabled={value < 2 ? 1 : null}
                onClick={() => onChange(value - 1)}
            />
            <span>{value}</span>
            <TbCaretRight
                djvujs-disabled={value >= max ? 1 : null}
                onClick={() => onChange(value + 1)}
            />
        </span>
    );
};

const ViewModeButtons = () => {
    const dispatch = useDispatch();
    const viewMode = useSelector(get.viewMode);
    const isIndirect = useSelector(get.isIndirect);
    const pageCountInRow = useSelector(get.pageCountInRow);
    const firstRowPageCount = useSelector(get.firstRowPageCount);
    const isContScroll = viewMode === Constants.CONTINUOUS_SCROLL_MODE;
    const t = useTranslation();
    const { isMobile } = useAppContext();

    const enableContinuousScrollMode = () => {
        dispatch({
            type: ActionTypes.SET_VIEW_MODE,
            payload: Constants.CONTINUOUS_SCROLL_MODE,
        });
    };

    const enableSinglePageMode = () => {
        dispatch({
            type: ActionTypes.SET_VIEW_MODE,
            payload: Constants.SINGLE_PAGE_MODE,
        });
    };

    const enableTextMode = () => {
        dispatch({
            type: ActionTypes.SET_VIEW_MODE,
            payload: Constants.TEXT_MODE,
        });
    };

    return (
        <div className='view-mode-buttons' data-djvujs-id='view_mode_buttons'>
            <div
                title={t("Text view mode")}
                style={viewMode === Constants.TEXT_MODE ? { opacity: 1 } : null}
            >
                <TbFileText
                    className='icon-button'
                    onClick={enableTextMode}
                />
            </div>
            <div
                title={t("Single page view mode")}
                style={
                    viewMode === Constants.SINGLE_PAGE_MODE
                        ? { opacity: 1 }
                        : null
                }
            >
                <TbRectangleVertical
                    className='icon-button'
                    onClick={enableSinglePageMode}
                />
            </div>
            {isIndirect ? null : (
                <div className='continous-scroll-button-wrapper'>
                    <TbCarouselVertical
                        className='continous-scroll-button'
                        style={isContScroll ? { opacity: 1 } : null}
                        title={t("Continuous scroll view mode")}
                        onClick={enableContinuousScrollMode}
                    />
                    {isMobile ? null : (
                        <>
                            <PageCount
                                style={
                                    !isContScroll ? { display: "none" } : null
                                }
                                title={t("Number of pages in a row")}
                                max={Constants.MAX_PAGE_COUNT_IN_ROW}
                                value={pageCountInRow}
                                onChange={(value) =>
                                    dispatch({
                                        type: ActionTypes.UPDATE_OPTIONS,
                                        payload: {
                                            pageCountInRow: value,
                                            firstRowPageCount: Math.min(
                                                firstRowPageCount ===
                                                    pageCountInRow
                                                    ? value
                                                    : firstRowPageCount,
                                                value
                                            ),
                                        },
                                    })
                                }
                            />
                            <PageCount
                                style={
                                    !isContScroll ? { display: "none" } : null
                                }
                                title={t("Number of pages in the first row")}
                                max={Math.min(
                                    Constants.MAX_PAGE_COUNT_IN_ROW,
                                    pageCountInRow
                                )}
                                value={firstRowPageCount}
                                onChange={(value) =>
                                    dispatch({
                                        type: ActionTypes.UPDATE_OPTIONS,
                                        payload: {
                                            firstRowPageCount: value,
                                        },
                                    })
                                }
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default connect((state) => ({
    viewMode: get.viewMode(state),
    isIndirect: get.isIndirect(state),
    pageCountInRow: get.pageCountInRow(state),
    firstRowPageCount: get.firstRowPageCount(state),
}))(ViewModeButtons);
