import React from "react";
import { useSelector } from "react-redux";
import { get } from "../reducers";
import Constants from "../constants";
import LeftPanel from "./LeftPanel/LeftPanel";
import LoadingLayer from "./LoadingLayer";
import ImageBlock from "./ImageBlock/ImageBlock";
import TextBlock from "./TextBlock";
import ErrorPage from "./ErrorPage";

export default () => {
    const viewMode = useSelector(get.viewMode);
    const pageNumber = useSelector(get.currentPageNumber);
    const isLoading = useSelector(get.isLoading);
    const pageText = useSelector(get.pageText);
    const imageData = useSelector(get.imageData);
    const imagePageError = useSelector(get.imagePageError);
    const textPageError = useSelector(get.textPageError);

    const renderMainElement = () => {
        if (imagePageError && viewMode === Constants.SINGLE_PAGE_MODE) {
            return <ErrorPage pageNumber={pageNumber} error={imagePageError} />;
        }
        if (viewMode === Constants.TEXT_MODE) {
            if (textPageError) {
                return (
                    <ErrorPage pageNumber={pageNumber} error={textPageError} />
                );
            }
            return <TextBlock text={pageText} />;
        }
        if (viewMode === Constants.CONTINUOUS_SCROLL_MODE || imageData) {
            return <ImageBlock />;
        }
    };

    return (
        <div className='djvujs-viewer-container'>
            <LeftPanel />
            <div className='djvujs-viewer-page'>
                {renderMainElement()}
                {isLoading && viewMode === Constants.SINGLE_PAGE_MODE ? (
                    <LoadingLayer />
                ) : null}
            </div>
        </div>
    );
};
