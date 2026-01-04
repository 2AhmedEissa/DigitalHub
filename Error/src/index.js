import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppErrorBoundary from "./AppErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppErrorBoundary fallback={<p>Something went wrong!</p>}>
    <App />
  </AppErrorBoundary>
);
