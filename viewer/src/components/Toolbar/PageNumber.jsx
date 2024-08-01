import React from "react";
import PropTypes from "prop-types";

export default class PageNumber extends React.Component {
    static propTypes = {
        pageNumber: PropTypes.number.isRequired,
        pagesQuantity: PropTypes.number,
        setNewPageNumber: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            tempValue: null,
        };
    }

    componentDidUpdate() {
        // тупо костыль, так как Firefox на autoFocus кидает Blur сразу же
        if (this.input) {
            setTimeout(() => {
                try {
                    if (this.input) {
                        this.input.focus();
                        this.input.select();
                        this.input = null;
                    }
                } catch (e) {}
            }, 10);
        }
    }

    setNewPageNumber(number) {
        if (!this.props.pagesQuantity) {
            return;
        }
        if (number < 1) {
            number = 1;
        } else if (number > this.props.pagesQuantity) {
            number = this.props.pagesQuantity;
        }
        if (number !== this.props.pageNumber) {
            this.props.setNewPageNumber(number, true);
        }
    }

    startPageNumberEditing = () => {
        this.setState({ isEditing: true });
    };

    finishPageNumberEditing = (e) => {
        this.setState({
            isEditing: false,
            tempValue: null,
        });
        var value = +e.target.value;
        this.setNewPageNumber(value);
    };

    onKeyDown = (e) => {
        if (e.key === "Enter") {
            this.finishPageNumberEditing(e);
        }
    };

    onChange = (e) => {
        this.setState({ tempValue: e.target.value });
    };

    inputRef = (node) => {
        this.input = node;
    };

    render() {
        return (
            <div className='page-number'>
                {this.state.isEditing ? (
                    <input
                        onKeyDown={this.onKeyDown}
                        onBlur={this.finishPageNumberEditing}
                        type='number'
                        min='1'
                        onChange={this.onChange}
                        value={
                            this.state.tempValue === null
                                ? this.props.pageNumber
                                : this.state.tempValue
                        }
                        ref={this.inputRef}
                    />
                ) : null}
                <div
                    onClick={this.startPageNumberEditing}
                    style={
                        this.state.isEditing
                            ? { visibility: "hidden", zIndex: -1 }
                            : null
                    }
                >
                    {this.props.pageNumber +
                        (this.props.pagesQuantity
                            ? " / " + this.props.pagesQuantity
                            : "")}
                </div>
            </div>
        );
    }
}
