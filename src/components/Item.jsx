import React, { useContext,useRef } from "react";
import Input from "./Input";
import { TodoContext } from "../store/TodoContext";
import { CiEdit } from "react-icons/ci";

import Modal from "./Modal";
const Item = ({ className, item }) => {
  const TodoCtx = useContext(TodoContext);
  const ModalRef=useRef()
  const handleChange = () => {
    const willProceed = confirm(
      item.completed
        ? "want to move this todo to Incomplete!!"
        : "congratulations!! you completed your task"
    );
    willProceed && TodoCtx.updateTodo({ ...item, completed: !item.completed });
  };

  function handleClick() {
    ModalRef.current.open()
  }

  const priorityClass =
    (item.priority == "low" && "text-green-500") ||
    (item.priority == "medium" && "text-yellow-500") ||
    (item.priority == "high" && "text-red-500");
  return (
    <>
      <div className={className + " flex justify-between"}>
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
        <div className="flex w-[150px]">
          <p className={"w-[130px] uppercase " + priorityClass}>
            -- {item?.priority}
          </p>
          <CiEdit className="text-2xl text-blue-400" onClick={handleClick} />
        </div>
      </div>
      <Modal ref={ModalRef} isEdit={true} item={item}></Modal>
    </>
  );
};

export default Item;
