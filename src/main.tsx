import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/global.css";
import { Login } from "./components/login/login";
import Signup from "./components/signup/signup";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="log-in" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
