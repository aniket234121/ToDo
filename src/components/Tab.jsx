import React from "react";

const Tab = ({ title, className,handleClick,id}) => {
  return (
    <div className={className} onClick={()=>handleClick(id)}>
      <h2>{title}</h2>
    </div>
  );
};

export default Tab;
