import React, { useContext } from "react";
import Input from "./Input";
import { TodoContext } from "../store/TodoContext";
import { CiEdit } from "react-icons/ci";
const Item = ({ className, item }) => {
  const TodoCtx = useContext(TodoContext);

  const handleChange = () => {
    const willProceed = confirm(
      item.completed
        ? "want to move this todo to Incomplete!!"
        : "congratulations!! you completed your task"
    );
    willProceed && TodoCtx.updateTodo({ ...item, completed: !item.completed });
  };

  return (
    <div className={className+" flex justify-between"}>
      <div className="  flex gap-4 text-xl">
        <Input
          type="checkbox"
          id="checkbox"
          checked={item.completed}
          onChange={() => {
            handleChange();
          }}
          className={"accent-green-500 w-4"}
        ></Input>
        <h2 className="capitalize">{item.text}</h2>
      </div>
      <CiEdit  className="text-2xl text-blue-400"/>
    </div>
  );
};

export default Item;
