import React from "react";
import { useSelector } from "react-redux";
import { get } from "../reducers";
import Toolbar from "./Toolbar/Toolbar";
import InitialScreen from "./InitialScreen/InitialScreen";
import FileLoadingScreen from "./FileLoadingScreen";
import ErrorWindow from "./ModalWindows/ErrorWindow";
import { TranslationProvider } from "./Translation";
import Main from "./Main";
import SaveDialog from "./ModalWindows/SaveDialog";
import PrintDialog from "./ModalWindows/PrintDialog";
import AppContextProvider from "./AppContext";

const AppRoot = React.forwardRef(({ shadowRoot }, ref) => {
    const isFileLoaded = useSelector(get.isDocumentLoaded);
    const isFileLoading = useSelector(get.isFileLoading);
    const isFullPageView = useSelector(get.isFullPageView);
    // const theme = useSelector(get.options).theme;
    const isPrintDialogOpened = useSelector(get.isPrintDialogOpened);

    return (
        <TranslationProvider>
            <div
                data-djvujs-id='root' // used in E2E tests
                className={
                    "djvujs-viewer-root" +
                    (isFullPageView ? " full-page-view" : "")
                }
                ref={ref}
            >
                {isFileLoading ? (
                    <FileLoadingScreen />
                ) : !isFileLoaded ? (
                    <InitialScreen />
                ) : (
                    <React.Fragment>
                        <Main />
                        <Toolbar />
                    </React.Fragment>
                )}
                {/* {isFileLoading ? null : <Footer />} */}

                <ErrorWindow />
                {/* <HelpWindow /> */}
                <SaveDialog />
                {/* <OptionsWindow /> */}
                {isPrintDialogOpened ? <PrintDialog /> : null}
                <div id='djvujs-modal-windows-container' />
            </div>
        </TranslationProvider>
    );
});

export default ({ shadowRoot }) => {
    return <AppContextProvider AppRoot={AppRoot} shadowRoot={shadowRoot} />;
};
