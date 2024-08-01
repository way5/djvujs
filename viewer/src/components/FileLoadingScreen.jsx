import React from "react";
import { useSelector } from "react-redux";
import { get } from "../reducers";
import ProgressBar from "./misc/ProgressBar";
import LoadingPhrase from "./misc/LoadingPhrase";

const FileLoadingScreen = () => {
    const loaded = useSelector(get.loadedBytes);
    const total = useSelector(get.totalBytes);
    const percentage = loaded && total ? Math.round((loaded / total) * 100) : 0;

    return (
        <div className='file-loading-layer'>
            <LoadingPhrase />
            <div
                className='progress'
                style={loaded || total ? null : { visibility: "hidden" }}
            >
                {Math.round(loaded / 1024).toLocaleString("ru-RU")} KB{" "}
                {total
                    ? `/ ${Math.round(total / 1024).toLocaleString("ru-RU")} KB`
                    : ""}
            </div>
            <ProgressBar
                className={total ? null : "hidden"}
                percentage={percentage}
            />
        </div>
    );
};

export default FileLoadingScreen;
