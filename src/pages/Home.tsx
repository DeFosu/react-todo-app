import React from "react";
import Container from "../components/Container";

const Home: React.FC = () => {
  return (
    <div className="bg-neutral-800 min-h-screen flex flex-col gap-3 text-neutral-300 fill-neutral-300">
      <header>
        <Container className="bg-neutral-950 px-4 py-2 rounded-b-xl">
          Header
        </Container>
      </header>
      <main className="min-h-full grow">
        <Container className="px-2 flex flex-col gap-4 mt-2">
          <h1 className="text-3xl font-semibold ">To-Do App</h1>
          <div className="w-full h-px bg-neutral-600" />

          <div className="flex flex-col gap-2">
            <div className="p-3 border border-neutral-700 rounded-xl flex gap-3 items-center">
              <span className="text-lg font-semibold">#1</span>
              <p className="text-sm line-clamp-1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <footer>
        <Container className="bg-neutral-950 px-4 py-2 rounded-t-xl">
          Footer
        </Container>
      </footer>
    </div>
  );
};

export default Home;
