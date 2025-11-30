import { useState, useContext, useRef } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Tabs from "./components/Tabs";
import ItemList from "./components/ItemList";
import { TodoContext } from "./store/TodoContext";
import { useMemo } from "react";
import Modal from "./components/Modal";
import "./app.css";

const FILTERS = [
  { id: 1, title: "All" },
  { id: 2, title: "Active" },
  { id: 3, title: "Completed" },
  { id: 4, title: "Clear Completed" },
];

function App() {
  const TodoCtx = useContext(TodoContext);
  const [clickedTabID, setClickedTabID] = useState(1);
  const ModalRef=useRef();

  const handleClick = (id) => {
    setClickedTabID(() => id);
  };
  const TodosFilterd = useMemo(() => {
    switch (clickedTabID) {
      case 2:
        return TodoCtx.Todos.filter((todo) => !todo.completed);
      case 3:
        return TodoCtx.Todos.filter((todo) => todo.completed);
      case 4:
        return TodoCtx.Todos.filter((todo) => todo.completed);
      default:
        return TodoCtx.Todos;
    }
  }, [TodoCtx.Todos, clickedTabID]);

  const handleClear = () => {
    const isCleared=TodoCtx.removeCompleted();
    return isCleared?alert('All completed Tasks has been CLEARED!!'):alert('cannot clear completed Tasks!!')
  };
  return (
    <>
      <div className=" w-full h-screen pt-10 bg-gray-950 text-white ">
        <div className="w-[60%] m-auto ">
          <Header modalRef={ModalRef}></Header>
          <Input
            disabled
            id="Todo-input"
            placeholder="What needs to be done?"
            className="outline-none border-[0.5px] rounded-md p-3 border-gray-500 w-[95%] mt-5 mx-5"
            type={"text"}
          ></Input>
          <Tabs
            filters={FILTERS}
            clickedTabID={clickedTabID}
            handleClick={handleClick}
          ></Tabs>
          <ItemList Todos={TodosFilterd}></ItemList>
          {clickedTabID == 4 && (
            <button onClick={handleClear} className="mt-4 mx-5  px-5 py-2 rounded-xl bg-red-700 uppercase  text-md font-bold hover:bg-red-900">
              clear
            </button>
          )}
          <Modal ref={ModalRef}></Modal>
        </div>
      </div>
    </>
  );
}

export default App;
