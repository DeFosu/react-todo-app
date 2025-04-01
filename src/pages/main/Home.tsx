// Home.tsx
import React, { useState, useEffect, useCallback } from "react";
import Container from "../../components/Container";
import TaskItem from "../../components/Task/TaskItem";
import AddTaskForm from "../../components/Task/TaskForm";
import ShareTaskForm from "../../components/Task/ShareTaskForm";
import { useAuth } from "../../context/AuthContext";
import {
  getTasks,
  getSharedTasks,
  addTask as addFirebaseTask,
  updateTask as updateFirebaseTask,
  deleteTask as deleteFirebaseTask,
  shareTask,
  unshareTask,
  Task,
  SharedWith,
} from "../../services/taskServices";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Modal from "../../components/Modal";

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sharedTasks, setSharedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showShareForm, setShowShareForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [currentTaskSharedWith, setCurrentTaskSharedWith] = useState<
    SharedWith[]
  >([]);

  const fetchTasks = useCallback(async () => {
    if (!currentUser?.uid || !currentUser.email) {
      console.log("No authenticated user or email found:", currentUser);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [userTasks, shared] = await Promise.all([
        getTasks(currentUser.uid),
        getSharedTasks(currentUser.email),
      ]);
      setTasks(userTasks);
      setSharedTasks(shared);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      alert("Failed to load tasks. Check your permissions or try again later.");
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (title: string, description?: string) => {
    if (!currentUser?.uid || !currentUser.email) {
      console.warn("User not authenticated");
      return;
    }

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      console.warn("Task title cannot be empty");
      return;
    }

    try {
      const taskData: Omit<Task, "id"> = {
        title: trimmedTitle,
        description: description?.trim(),
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: currentUser.uid,
        ownerEmail: currentUser.email,
        sharedWith: [],
      };

      const taskId = await addFirebaseTask(taskData);
      setTasks((prevTasks) => [...prevTasks, { ...taskData, id: taskId }]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  const handleShareTask = async (email: string, role: "admin" | "user") => {
    if (!selectedTask || !currentUser?.email) return;

    if (email === currentUser.email) {
      alert("You cannot share a task with yourself");
      return;
    }

    try {
      await shareTask(selectedTask, currentUser.email, email, role);
      const taskDoc = await getDoc(doc(db, "tasks", selectedTask));
      if (taskDoc.exists()) {
        setCurrentTaskSharedWith(taskDoc.data().sharedWith || []);
      }
      await fetchTasks();
    } catch (error) {
      console.error("Error sharing task:", error);
      alert("Failed to share task. Please try again.");
    }
  };

  const handleUnshareTask = async (email: string) => {
    if (!selectedTask) return;

    try {
      await unshareTask(selectedTask, email);
      const taskDoc = await getDoc(doc(db, "tasks", selectedTask));
      if (taskDoc.exists()) {
        setCurrentTaskSharedWith(taskDoc.data().sharedWith || []);
      }
      await fetchTasks();
    } catch (error) {
      console.error("Error unsharing task:", error);
      alert("Failed to remove access. Please try again.");
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    const task = [...tasks, ...sharedTasks].find((t) => t.id === taskId);
    if (!task) return;

    try {
      await updateFirebaseTask(taskId, { isDone: !task.isDone });
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditTask = async (
    taskId: string,
    newTitle: string,
    newDescription?: string
  ) => {
    try {
      await updateFirebaseTask(taskId, {
        title: newTitle,
        description: newDescription,
      });
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteFirebaseTask(taskId);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleOpenShareForm = async (taskId: string) => {
    setSelectedTask(taskId);
    try {
      const taskDoc = await getDoc(doc(db, "tasks", taskId));
      if (taskDoc.exists()) {
        setCurrentTaskSharedWith(taskDoc.data().sharedWith || []);
      }
      setShowShareForm(true);
    } catch (error) {
      console.error("Error loading sharing info:", error);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isDone !== b.isDone) return a.isDone ? 1 : -1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const sortedSharedTasks = [...sharedTasks].sort((a, b) => {
    if (a.isDone !== b.isDone) return a.isDone ? 1 : -1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <Container className="px-2 flex flex-col gap-4 mt-2">
      <h1 className="text-3xl font-semibold">To-Do App</h1>
      <div className="w-full h-px bg-neutral-600" />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">
          My Tasks ({tasks.filter((t) => !t.isDone).length} pending)
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <AddTaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowForm(false)}
        />
      </Modal>
      <Modal isOpen={showShareForm} onClose={() => setShowShareForm(false)}>
        <ShareTaskForm
          onSubmit={handleShareTask}
          onCancel={() => setShowShareForm(false)}
          sharedWith={currentTaskSharedWith}
          onUnshare={handleUnshareTask}
          isOwner={true}
        />
      </Modal>

      <div className="flex flex-col gap-2">
        {sortedTasks.length === 0 ? (
          <p className="text-neutral-500 text-center py-4">
            No tasks yet. Add your first task!
          </p>
        ) : (
          sortedTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              id={task.id!}
              number={index + 1}
              title={task.title}
              description={task.description}
              isDone={task.isDone}
              createdAt={task.createdAt}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onShare={() => handleOpenShareForm(task.id!)}
              canEdit={true}
            />
          ))
        )}
      </div>

      {sharedTasks.length > 0 && (
        <>
          <h2 className="text-xl font-medium mt-6">
            Shared With Me ({sharedTasks.filter((t) => !t.isDone).length}{" "}
            pending)
          </h2>
          <div className="flex flex-col gap-2">
            {sortedSharedTasks.map((task, index) => {
              const sharedData = task.sharedWith?.find(
                (s) => s.email === currentUser?.email
              );
              const canEdit = sharedData?.role === "admin";

              return (
                <TaskItem
                  key={task.id}
                  id={task.id!}
                  number={index + 1}
                  title={task.title}
                  description={task.description}
                  isDone={task.isDone}
                  createdAt={task.createdAt}
                  onToggleComplete={canEdit ? handleToggleComplete : undefined}
                  onEdit={canEdit ? handleEditTask : undefined}
                  onDelete={undefined}
                  canEdit={canEdit}
                  sharedOwner={task.ownerEmail}
                />
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
