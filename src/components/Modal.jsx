import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { TodoContext } from "../store/TodoContext";
import { RandomValueGenerator } from "../utils/util.js";
const Modal = forwardRef(({ isEdit = false, item }, ref) => {
  const TodoCtx = useContext(TodoContext);
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open: () => dialogRef.current.showModal(),
      close: () => dialogRef.current.close(),
    };
  });
  const handleClose = () => {
    dialogRef.current.close();
  };

  const handleSubmit = (event) => {
    const formData = new FormData(event.target);
    event.preventDefault();
    if (!isEdit) {
      const Text = formData.get("Todo-title");
      const todo = {
        id: RandomValueGenerator(),
        text: Text,
        priority: formData.get("priority"),
      };

      Text !== "" && !isEdit && TodoCtx.addTodo(todo);
    } else {
      const Text = formData.get("Todo-title");
      const todo = {
        id: item.id,
        text: Text,
        priority: formData.get("priority"),
      };
      Text !== "" && isEdit && TodoCtx.updateTodo(todo);
    }

    dialogRef.current.close();

    
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="  bg-gray-800
        p-6 rounded-xl shadow-xl m-auto
        backdrop:backdrop-blur-md 
        backdrop:bg-black/40
        transition-all duration-200
      "
    >
      <div className="w-[95%] h-[80%] bg-white m-auto p-3 rounded-xl ">
        <h2 className="text-center font-bold capitalize mb-5"> Todo Details</h2>
        <form onSubmit={handleSubmit}>
          <div id="Todo" className="flex gap-2 justify-between">
            <label className="w-[120px]" htmlFor="task">
              Enter Task :
            </label>
            <input
              type="text"
              id="Todo-title"
              name="Todo-title"
              className="outline-none w-full px-3 capitalize py-1 "
              defaultValue={item?.text}
              placeholder="Task To Achieve"
            />
          </div>
          <div
            id="priority-container"
            className="flex gap-2 justify-between my-2"
          >
            <label className="w-[120px]" htmlFor="task">
              Priority :
            </label>
            <select
              name="priority"
              id="priority"
              defaultValue={item?.priority}
              className="
                  w-full
                  border border-gray-300
                  text-gray-700
                  rounded-lg
                  px-2 py-1
                  focus:outline-none
                
                  bg-white
                "
            >
              <option value="low" className="text-green-500">
                Low
              </option>
              <option value="medium" className="text-yellow-500">
                Medium
              </option>

              <option value="high" className="text-red-500 ">
                High
              </option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className="mt-4 text-white px-4 py-2 rounded-xl hover:bg-green-900 capitalize  text-sm  bg-green-700"
              type="submit"
            >
              Submit
            </button>
            <button
              className="mt-4 text-white px-4 py-2 rounded-xl hover:bg-red-900 capitalize  text-sm  bg-red-700"
              onClick={handleClose}
            >
              close
            </button>
          </div>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
