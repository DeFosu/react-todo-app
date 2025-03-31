import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/main/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AuthLayout from "./pages/auth/AuthLayout";
import MainLayout from "./pages/main/MainLayout";
import { ROUTES } from "./utils/routes";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index path={ROUTES.home} element={<Home />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route index path={ROUTES.signIn} element={<SignIn />} />
            <Route path={ROUTES.singUp} element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
