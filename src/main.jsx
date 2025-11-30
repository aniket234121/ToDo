import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoContextProvider } from "./store/TodoContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </StrictMode>
);
