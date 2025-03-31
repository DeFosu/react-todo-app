import React from "react";
import Container from "../components/Container";

const Home: React.FC = () => {
  return (
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
  );
};

export default Home;
