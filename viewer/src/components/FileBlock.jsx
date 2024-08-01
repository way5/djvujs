import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaUpload } from "react-icons/fa";

import Actions from '../actions/actions';
import { TranslationContext } from './Translation';
// import styled from 'styled-components';

// const FileIcon = styled(FaUpload)`
//     flex: 0 0 auto;
//     font-size: var(--button-basic-size, 1.5em);
// `;

// const FileName = styled.span`
//     overflow: hidden;
//     flex: 0 1 auto;
//     max-width: 20em;
//     text-align: left;
//     text-overflow: ellipsis;
//     margin: 0 0.5em;
// `;

// const Root = styled.div`
//     flex: 0 1 auto;
//     cursor: pointer;
//     display: flex;
//     flex-wrap: nowrap;
//     align-items: center;
//     justify-content: flex-start;
//     white-space: nowrap;
//     overflow: hidden;

//     &:hover {
//         ${FileIcon} {
//             transform: scale(1.1)
//         }
//     }
// `;

class FileBlock extends React.Component {

    static propTypes = {
        fileName: PropTypes.string,
        createNewDocument: PropTypes.func.isRequired
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
        }
    };

    onClick = (e) => {
        this.input && this.input.click();
    };

    render() {
        const t = this.context;

        return (
            <div
                className="file-name"
                onClick={this.onClick}
                title={t("Open another .djvu file")}
            >
                <FaUpload />
                <span className='file-name'>
                    {this.props.fileName == null ? t("Choose a file") : (this.props.fileName || '')}
                </span>
                <input
                    style={{ display: 'none' }}
                    type="file"
                    onChange={this.onChange}
                    accept=".djvu, .djv"
                    ref={node => this.input = node}
                />
            </div>
        );
    }
}

export default connect(null, {
    createNewDocument: Actions.createDocumentFromArrayBufferAction,
})(FileBlock);