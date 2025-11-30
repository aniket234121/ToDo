import React from "react";

const Input = ({ type, id, placeholder, ...props }) => {
  return (
    <input type={type} id={id} name={id} placeholder={placeholder} {...props} />
  );
};

export default Input;
