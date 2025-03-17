import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// In index.js or App.
// In index.js or App.js
import "./index.css";

console.log("🛠 main.tsx is executing!");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
