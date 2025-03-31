import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AuthLayout from "./pages/auth/AuthLayout";
import MainLayout from "./pages/main/MainLayout";
import { ROUTES } from "./utils/routes";
import Task from "./pages/main/Task";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.task(":taskId")} element={<Task />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route index path={ROUTES.signIn} element={<SignIn />} />
          <Route path={ROUTES.singUp} element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
