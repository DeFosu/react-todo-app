import { BookText, LogOut, UserRound } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router";
import Container from "../../components/Container";
import { ROUTES } from "../../utils/routes";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";

const MainLayout: React.FC = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-neutral-800 min-h-screen flex flex-col gap-3 text-neutral-300 fill-neutral-300">
      <header>
        <Container className="bg-neutral-950 px-4 py-2 rounded-b-xl flex items-center justify-between">
          <div className="flex items-center gap-1 font-bold text-white">
            <BookText />
            To-Do
          </div>
          <div className="flex items-center">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="p-1 rounded-xl border border-neutral-700 text-neutral-700 hover:text-neutral-300 hover:border-neutral-300 transition-colors duration-100"
              >
                <LogOut size={18} />
              </button>
            ) : (
              <Link
                to={ROUTES.signIn}
                className="p-1 rounded-xl border border-neutral-700 text-neutral-700 hover:text-neutral-300 hover:border-neutral-300 transition-colors duration-100"
              >
                <UserRound size={18} />
              </Link>
            )}
          </div>
        </Container>
      </header>
      <main className="min-h-full grow">
        <Outlet />
      </main>
      <footer>
        <Container className="bg-neutral-950 px-4 py-2 rounded-t-xl">
          {currentUser?.email}
        </Container>
      </footer>
    </div>
  );
};

export default MainLayout;
