import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TbUpload } from "react-icons/tb";
import Actions from "../actions/actions";
import { TranslationContext } from "./Translation";

class FileBlock extends React.Component {
    static propTypes = {
        fileName: PropTypes.string,
        createNewDocument: PropTypes.func.isRequired,
    };

    static contextType = TranslationContext;

    onChange = (e) => {
        if (!e.target.files.length) {
            return;
        }
        const file = e.target.files[0];

        var fr = new FileReader();
        fr.readAsArrayBuffer(file);
        fr.onload = () => {
            this.props.createNewDocument(fr.result, file.name);
        };
    };

    onClick = (e) => {
        this.input && this.input.click();
    };

    render() {
        const t = this.context;

        return (
            <div
                className='file-name'
                onClick={this.onClick}
                title={t("Open another .djvu file")}
            >
                <TbUpload />
                <span className='file-name'>
                    {this.props.fileName == null
                        ? t("Choose a file")
                        : this.props.fileName || ""}
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
})(FileBlock);
