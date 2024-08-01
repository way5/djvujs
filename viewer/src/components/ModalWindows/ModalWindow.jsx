import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import CloseButton from "../misc/CloseButton";

export default class ModalWindow extends React.Component {
    static propTypes = {
        isError: PropTypes.bool,
        isFixedSize: PropTypes.bool,
        usePortal: PropTypes.bool,
        onClose: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    render() {
        const {
            onClose,
            isError,
            isFixedSize,
            className = "",
            usePortal = false,
        } = this.props;

        const component = (
            <div className='modal-window' data-djvujs-class='modal_window'>
                <div
                    className='dark-layer'
                    onClick={onClose}
                    data-djvujs-class='dark_layer'
                />
                <div
                    className={
                        "modal-root" +
                        (isFixedSize ? " modal-fixed" : "") +
                        (isError ? " modal-error" : "") +
                        (className ? ` ${className}` : "")
                    }
                    $error={isError}
                    $fixedSize={isFixedSize}
                >
                    <CloseButton onClick={onClose} className='close-button' />
                    <div className='content-wrapper'>{this.props.children}</div>
                </div>
            </div>
        );

        if (usePortal) {
            // portal is needed to a modal window from another modal window.
            // In the first render, when the app is mounted, there is no container element,
            // but in normal case a modal window should be shown before the app is mounted.
            const container = document.getElementById(
                "djvujs-modal-windows-container"
            );
            return container
                ? ReactDOM.createPortal(component, container)
                : component;
        } else {
            return component;
        }
    }
}
