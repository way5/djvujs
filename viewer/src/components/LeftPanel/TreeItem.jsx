import React from "react";
import PropTypes from "prop-types";
import { FaRegPlusSquare, FaRegMinusSquare, FaCircle } from "react-icons/fa";

export default class TreeItem extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.array,
        callback: PropTypes.func,
        callbackData: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = { isCollapsed: true };
    }

    onClick = () => {
        this.props.callback && this.props.callback(this.props.callbackData);
    };

    renderChildren() {
        if (!this.props.children) {
            return null;
        }
        return (
            <div
                css={`
                    padding-left: 0.5em;
                `}
            >
                {this.props.children.map((treeItem, i) => {
                    return <TreeItem key={i} {...treeItem} />;
                })}
            </div>
        );
    }

    toggleItem = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    };

    render() {
        const Icon = this.state.isCollapsed
            ? FaRegPlusSquare
            : FaRegMinusSquare;
        return (
            <div className='tree'>
                {this.props.children ? (
                    <Icon onClick={this.toggleItem} />
                ) : (
                    <FaCircle
                        css={`
                            transform: scale(0.5);
                        `}
                    />
                )}
                <div>
                    <div className='name' onClick={this.onClick}>
                        {this.props.name}
                    </div>
                    {this.state.isCollapsed ? null : this.renderChildren()}
                </div>
            </div>
        );
    }
}
