import React from "react";
import "./index.scss";

const Card = ({ children, className }) => {
    return (
        <div className={`card ${className}`}>{children}</div>
    );
};

export default Card;
