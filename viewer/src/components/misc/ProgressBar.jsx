import React from "react";

export default ({ percentage, className }) => (
    <div className={className ? className : 'progress-bar'}>
        <div style={{ width: percentage + "%" }} />
    </div>
);