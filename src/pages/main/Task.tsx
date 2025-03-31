import React from "react";
import { useParams } from "react-router";

const Task: React.FC = () => {
  let { taskId } = useParams();
  return (
    <div>
      <h1>Task</h1>
      <p>{taskId}</p>
    </div>
  );
};

export default Task;
