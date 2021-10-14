import React from "react";
import "./style.scss";

// type Props = {
//   btnText: string;
//   type?: any;
//   className?: string;
//   background?: string;
//   color?: string;
//   onClick?(evt: any): void;
//   disabled?: boolean;
// };

const ButtonComponent = ({ btnText, className, ...rest }) => {
  //const style={{ background: background, color: color }}
  return (
    <button className={`btn font-bold ${className}`} {...rest}>
      {btnText}
    </button>
  );
};

export default ButtonComponent;
