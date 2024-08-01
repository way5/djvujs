import React from "react";
import { connect } from "react-redux";
import ContentsPanel from "./ContentsPanel";
import { get } from "../../reducers";
import { ActionTypes } from "../../constants";
import { AppContext } from "../AppContext";

// TODO:
const closeWidth = 40;

class LeftPanel extends React.Component {
    static contextType = AppContext;

    prevIsMobile = null;
    lastContents = null;
    contentsWasClosed = null;

    onBeginResizing = (e) => {
        e.preventDefault();
        const width = this.topNode.getBoundingClientRect().width;
        this.topNode.style.transition = "none";
        this.initialState = {
            clientX: e.clientX,
            width: width,
        };
        window.addEventListener("mousemove", this.onResizing);
        window.addEventListener("mouseup", this.onEndResizing);
    };

    onResizing = (e) => {
        e.preventDefault();
        if (!this.initialState) {
            return;
        }
        const diff = e.clientX - this.initialState.clientX;
        this.topNode.style.width = this.initialState.width + diff + "px";
    };

    onEndResizing = (e) => {
        e.preventDefault();
        window.removeEventListener("mousemove", this.onResizing);
        window.removeEventListener("mouseup", this.onEndResizing);
        this.topNode.style.transition = null;
        this.initialState = null;

        if (this.topNode.getBoundingClientRect().width < closeWidth) {
            this.closeContents();
        }
    };

    closeContents = () =>
        this.props.dispatch({ type: ActionTypes.CLOSE_CONTENTS });

    ref = (node) => (this.topNode = node);

    // just to beautifully close contents when the window is resized and the app switches to the mobile version
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.prevIsMobile !== this.context.isMobile) {
            if (this.context.isMobile && this.props.isContentsOpened) {
                this.closeContents();
                this.contentsWasClosed = true;
            } else if (!this.context.isMobile && this.contentsWasClosed) {
                if (!this.props.isContentsOpened) {
                    this.props.dispatch({ type: ActionTypes.TOGGLE_CONTENTS });
                }
                this.contentsWasClosed = false;
            }
        }

        this.prevIsMobile = this.context.isMobile;
    }

    render() {
        const { contents, isContentsOpened } = this.props;
        const isMobile = this.context.isMobile;
        const firstRender = contents && this.lastContents !== contents;
        this.lastContents = contents;

        return (
            <>
                {isMobile && isContentsOpened ? (
                    <div className='dark-layer' onClick={this.closeContents} />
                ) : null}
                <div
                    className={
                        "left-panel" +
                        (isMobile ? " mobile" : "") +
                        (isContentsOpened && !(isMobile && firstRender)
                            ? " open" + (firstRender ? " fast-emerge" : "")
                            : " closed")
                    }
                    ref={this.ref}
                    onTransitionEnd={(e) => {
                        if (
                            e.propertyName === "margin-left" &&
                            !isContentsOpened
                        ) {
                            this.topNode.style = null;
                            this.topNode.classList.add = "open";
                            this.topNode.classList.remove = "closed";
                        }
                    }}
                >
                    <div className='contents-panel-wrapper'>
                        <ContentsPanel contents={contents} />
                    </div>
                    <div
                        className='page-border'
                        onMouseDown={this.onBeginResizing}
                    >
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
            </>
        );
    }
}

export default connect((state) => ({
    contents: get.contents(state),
    isContentsOpened: get.isContentsOpened(state),
}))(LeftPanel);
