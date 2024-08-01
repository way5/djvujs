import React from "react";
import LoadingPhrase from "./misc/LoadingPhrase";

export default class LoadingLayer extends React.Component {
    constructor(props) {
        super(props);
        this.showTimeout = null;
        this.rootRef = React.createRef();
    }

    componentDidMount() {
        this.showTimeout = setTimeout(() => {
            if (this.rootRef.current) this.rootRef.current.style.display = null;
            this.showTimeout = null;
        }, 500);
    }

    componentWillUnmount() {
        this.showTimeout && clearTimeout(this.showTimeout);
    }

    render() {
        return (
            <div
                style={{ display: "none" }}
                ref={this.rootRef}
                className='loading-layer'
            >
                <div className='dark-layer' />
                <div className='message-wrapper'>
                    <LoadingPhrase />
                </div>
            </div>
        );
    }
}
