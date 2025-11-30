import { useState } from "react";
import Tab from "./Tab";

const Tabs = ({ filters = [],clickedTabID,handleClick }) => {
  

  const TabClasses = " px-5 py-3  border-dark-500 text-gray-300";
  const ActiveTab = "bg-gray-500 " + TabClasses;
  return (
    <div className="mt-5 mx-5 border-[0.5px]  border-gray-500 rounded-md   w-fit font-sherif font-bold ">
      <ul className="flex divide-x divide-solid  divide-gray-500">
        {filters.map((filter) => {
          return (
            <li key={filter.id}>
              <Tab
                title={filter.title}
                className={filter.id == clickedTabID ? ActiveTab : TabClasses}
                handleClick={handleClick}
                id={filter.id}
              ></Tab>
            </li>
          );
        })}
      </ul>
      
    </div>
  );
};

export default Tabs;
