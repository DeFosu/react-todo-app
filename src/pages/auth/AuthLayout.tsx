import React from "react";
import { Outlet } from "react-router";

const AuthLayout: React.FC = () => {
  return (
    <div className="bg-neutral-800 min-h-screen flex justify-center items-center gap-3 text-neutral-300 fill-neutral-300">
      <div className="border border-neutral-700 rounded-2xl px-4 py-6 min-w-60 max-w-sm w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
