import React from "react";
import "./index.scss";

// type Props = {
//     title: string,
//     card?: any,
//     cardStyle?: string,
//     titleStyle?:string
//   };

const FormHeading = ({ title, card ,cardStyle, titleStyle}) => {
    let className = 'heading';
    if (titleStyle) {
      className += ' ' + titleStyle;
    }
    return (
        <div>
            <div className={className}>{title}</div>
            <img src ={card} className={cardStyle}/>
        </div>
    );
};

export default FormHeading;
