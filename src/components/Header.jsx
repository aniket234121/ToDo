import React from "react";

const Header = () => {
  return <div className=" pt-4z flex font-serif justify-between px-5">
    <h1 className="text-4xl  font-bold">Advanced Todo App</h1>
    <button className="p-3 rounded-xl bg-sky-600 font-bold text-xl hover:bg-sky-700">Add Todo</button>
  </div>;
};

export default Header;
