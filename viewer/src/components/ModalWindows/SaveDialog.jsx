import React from "react";
import ModalWindow from "./ModalWindow";
import { useTranslation } from "../Translation";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../reducers";
import { ActionTypes } from "../../constants";
import ProgressBar from "../misc/ProgressBar";
import { normalizeFileName } from "../../utils";

const getBundledFileName = (fileName) => {
    const normalized = normalizeFileName(fileName);
    return /(?:[^a-z]|\b)index(?:[^a-z]|\b)/.test(normalized)
        ? "bundled_" + normalized
        : normalized;
};

export default () => {
    const t = useTranslation();
    const dispatch = useDispatch();
    const isShown = useSelector(get.isSaveDialogShown);
    const buffer = useSelector(get.resultBuffer);
    const progress = useSelector(get.fileProcessingProgress);
    const isBundling = useSelector(get.isBundling);
    const fileName = useSelector(get.fileName);
    const [url, setUrl] = React.useState(null);

    const closeDialog = () => {
        dispatch({ type: ActionTypes.CLOSE_SAVE_DIALOG });
    };

    React.useEffect(() => {
        if (buffer) {
            const url = URL.createObjectURL(
                new Blob([buffer], { type: "image/vnd.djvu" })
            );
            setUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setUrl(null);
        }
    }, [buffer]);

    if (!isShown) return null;

    const percentage = Math.round(progress * 100);

    return (
        <ModalWindow onClose={closeDialog} isFixedSize={false}>
            <div className='save-dialog'>
                {!isBundling ? (
                    <>
                        <div className='notify'>
                            {t(
                                "You are trying to save an indirect (multi-file) document."
                            ) + " "}
                            {t("What exactly do you want to do?")}
                        </div>
                        <div className='option-wrapper'>
                            <button
                                className='option'
                                onClick={() => {
                                    closeDialog();
                                    dispatch({
                                        type: ActionTypes.SAVE_DOCUMENT,
                                    });
                                }}
                            >
                                {t("Save only index file")}
                            </button>
                            <button
                                className='option'
                                onClick={() =>
                                    dispatch({
                                        type: ActionTypes.START_TO_BUNDLE,
                                    })
                                }
                            >
                                {t(
                                    "Download, bundle and save the whole document as one file"
                                )}
                            </button>
                        </div>
                    </>
                ) : null}

                {isBundling ? (
                    <div className='processing-block'>
                        {!url ? (
                            <>
                                <div className='url'>
                                    {t("Downloading and bundling the document")}
                                    ... {percentage}%
                                </div>
                                <ProgressBar
                                    percentage={Math.round(progress * 100)}
                                />
                            </>
                        ) : (
                            <>
                                <div className='save'>
                                    {t(
                                        "The document has been downloaded and bundled into one file successfully"
                                    )}
                                </div>
                                <button
                                    className='text-button'
                                    as='a'
                                    href={url}
                                    download={getBundledFileName(fileName)}
                                >
                                    {t("Save")}
                                </button>
                            </>
                        )}
                    </div>
                ) : null}
            </div>
        </ModalWindow>
    );
};
