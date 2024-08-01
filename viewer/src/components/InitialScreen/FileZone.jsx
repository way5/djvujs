import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaUpload } from "react-icons/fa";
import { TranslationContext } from "../Translation";
import Actions from "../../actions/actions";

class FileZone extends React.Component {
    static propTypes = {
        createNewDocument: PropTypes.func.isRequired,
    };

    static contextType = TranslationContext;

    state = {
        isDragOver: false,
    };

    onChange = (e) => {
        if (!e.target.files.length) {
            return;
        }
        this.processFile(e.target.files[0]);
    };

    processFile(file) {
        var fr = new FileReader();
        fr.readAsArrayBuffer(file);
        fr.onload = () => {
            this.props.createNewDocument(fr.result, file.name);
        };
    }

    onClick = (e) => {
        this.input && this.input.click();
    };

    checkDrag = (e) => {
        if (
            e.dataTransfer.items.length === 1 &&
            e.dataTransfer.items[0].kind === "file"
        ) {
            e.preventDefault();
            this.setState({ isDragOver: true });
        }
    };

    onDragLeave = (e) => {
        this.setState({ isDragOver: false });
    };

    onDrop = (e) => {
        this.setState({ isDragOver: false });
        if (e.dataTransfer.items[0].kind === "file") {
            e.preventDefault();
            this.processFile(e.dataTransfer.items[0].getAsFile());
        }
    };

    render() {
        const t = this.context;

        return (
            <div
                className={
                    "file-zone" +
                    (this.state.isDragOver ? " drag-over-state" : "")
                }
                onClick={this.onClick}
                title={t("Open another .djvu file")}
                onDragEnter={this.checkDrag}
                onDragOver={this.checkDrag}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
            >
                <FaUpload />
                <span>
                    {t("Drag & Drop a file here or click to choose manually")}
                </span>
                <input
                    style={{ display: "none" }}
                    type='file'
                    onChange={this.onChange}
                    accept='.djvu, .djv'
                    ref={(node) => (this.input = node)}
                />
            </div>
        );
    }
}

export default connect(null, {
    createNewDocument: Actions.createDocumentFromArrayBufferAction,
})(FileZone);
