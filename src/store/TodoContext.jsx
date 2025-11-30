import { createContext, useEffect, useReducer } from "react";
// import { getFromLocal } from "../utils/util";
import { useLocalStorage } from "../hooks/useLocalStorage";
export const TodoContext = createContext({
  Todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
  removeCompleted: () => {},
});

export const TodoContextProvider = ({ children }) => {
  function TodoReducer(prevState, action) {
    const date = new Date();
    const timestamp = `${date.getDate()}:${
      date.getMonth() + 1
    }:${date.getFullYear()}`;

    switch (action.type) {
      case "ADD_TODO":
        return {
          ...prevState,
          Todos: [
            ...prevState.Todos,
            {
              id: action.payload.id,
              text: action.payload.text,
              completed: false,
              createdAt: timestamp,
              updatedAt: timestamp,
              priority: action.payload.priority,
            },
          ],
        };

      case "UPDATE_TODO":
        return {
          ...prevState,
          Todos: prevState.Todos.map((todo) =>
            todo.id === action.payload.id
              ? {
                  ...todo,
                  text: action.payload.text ?? todo.text,
                  completed: action.payload.completed ?? todo.completed,
                  priority: action.payload.priority ?? todo.priority,
                  updatedAt: timestamp,
                }
              : todo
          ),
        };

      case "REMOVE_TODO":
        return {
          ...prevState,
          Todos: prevState.Todos.filter(
            (todo) => todo.id !== action.payload.ID
          ),
        };
      case "REMOVE_COMPLETED":
        return {
          ...prevState,
          Todos: prevState.Todos.filter((todo) => !todo.completed),
        };

      default:
        return prevState;
    }
  }

  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);

  const [TodoState, dispatch] = useReducer(TodoReducer, {
    Todos: storedTodos,
  });
  useEffect(() => {
    setStoredTodos(() => TodoState.Todos);
  }, [TodoState.Todos, setStoredTodos]);

  function handleAddTodo(todo) {
    dispatch({ type: "ADD_TODO", payload: todo });
  }

  function handleRemoveTodo(ID) {
    dispatch({ type: "REMOVE_TODO", payload: { ID } });
  }

  function handleUpdateTodo(todo) {
    dispatch({ type: "UPDATE_TODO", payload: todo });
  }
  function handleRemoveCompleted() {
    dispatch({ type: "REMOVE_COMPLETED" });
    return true;
  }

  const ctxValue = {
    ...TodoState,
    addTodo: handleAddTodo,
    removeTodo: handleRemoveTodo,
    updateTodo: handleUpdateTodo,
    removeCompleted: handleRemoveCompleted,
  };

  return (
    <TodoContext.Provider value={ctxValue}>{children}</TodoContext.Provider>
  );
};

// import { createContext, useReducer } from "react";

// export const TodoContext = createContext({
//   Todos: {},
//   addTodo: () => {},
//   removeTodo: () => {},
//   updateTodo: () => {},
// });

// export const TodoContextProvider = ({ children }) => {
//   function TodoReducer(prevState, action) {
//     //action from the input must return object {id,text,priority} in payload while dispatching

//     const date = new Date();

//     if (action.type == "ADD_TODO") {
//       // adding the todo action type
//       return {
//         ...prevState,
//         Todos: [
//           ...prevState.Todos,
//           {
//             id: action.payload.id,
//             text: action.payload.text,
//             completed: false,
//             createdAt:
//               date.getdate() + ":" + date.getMonth() + ":" + date.getFullYear(),
//             updatedAt:
//               date.getdate() + ":" + date.getMonth() + ":" + date.getFullYear(),
//             priority: action.payload.priority,
//           },
//         ],
//       };
//     }

//     if (action.type == "UPDATE_TODO") {
//       const ID = action.payload.id;

//         const matchingTodo = prevState.Todos.find((todo) => ID == todo.id);

//       const updatedTodo = {
//         ...prevState,
//         Todos: prevState.Todos.map((todo) =>
//           todo.id === ID
//             ? {
//                 ...todo,
//                 text: action.payload.text,
//                 completed: action.payload.completed,
//                 updatedAt:
//                   date.getdate() +
//                   ":" +
//                   date.getMonth() +
//                   ":" +
//                   date.getFullYear(),
//               } // update fields here
//             : todo
//         ),
//       };

//       if (!matchingTodo) return { ...prevState };
//       else {
//         return updatedTodo;
//       }
//     }

//     if (action.type == "REMOVE_TODO") {
//       const ID = action.payload.Id;
//       const updateState = {
//         ...prevState,
//         Todos: prevState.Todos.filter((todo) => todo.id !== ID),
//       };
//       return updateState;
//     }
//   }

//   const [TodoState, dispatch] = useReducer(TodoReducer, {
//     Todos: [
//       {
//         id: 1,
//         text: "something",
//         completed: false,
//         createdAt: 12,
//         updatedAt: 0,
//         priority: "low",
//       },
//     ],
//   });

//   function handleAddTodo(todo) {
//     dispatch({ type: "ADD_TODO", payload: todo });
//   }
//   function handleRemoveTodo(ID) {
//     dispatch({ type: "REMOVE_TODO", payload: { ID } });
//   }
//   function handleUpdateTodo(todo) {
//     dispatch({ type: "UPDATE_TODO", payload: todo });
//   }

//   const ctxValue = {
//     ...TodoState,
//     addTodo: handleAddTodo,
//     removeTodo: handleRemoveTodo,
//     updateTodo: handleUpdateTodo,
//   };

//   return (
//     <TodoContext.Provider value={ctxValue}>{children}</TodoContext.Provider>
//   );
// };
