import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

export type SharedWith = {
  email: string;
  role: "admin" | "user";
};

export type Task = {
  id?: string;
  title: string;
  description?: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  ownerEmail: string;
  sharedWith: SharedWith[];
};

export const getTasks = async (userId: string): Promise<Task[]> => {
  if (!userId) throw new Error("User ID is required");

  const tasksRef = collection(db, "tasks");
  const q = query(tasksRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    isDone: doc.data().isDone,
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    userId: doc.data().userId,
    ownerEmail: doc.data().ownerEmail,
    sharedWith: doc.data().sharedWith || [],
  }));
};

export const getSharedTasks = async (email: string): Promise<Task[]> => {
  if (!email) throw new Error("Email is required");

  const tasksRef = collection(db, "tasks");
  const q = query(
    tasksRef,
    where("sharedWith", "array-contains-any", [
      { email, role: "user" },
      { email, role: "admin" },
    ])
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    isDone: doc.data().isDone,
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    userId: doc.data().userId,
    ownerEmail: doc.data().ownerEmail,
    sharedWith: doc.data().sharedWith || [],
  }));
};

export const addTask = async (task: Omit<Task, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, "tasks"), {
    ...task,
    createdAt: new Date(),
    updatedAt: new Date(),
    sharedWith: task.sharedWith || [],
  });
  return docRef.id;
};

export const updateTask = async (
  taskId: string,
  updates: Partial<Omit<Task, "id">>
): Promise<void> => {
  await updateDoc(doc(db, "tasks", taskId), {
    ...updates,
    updatedAt: new Date(),
  });
};

export const shareTask = async (
  taskId: string,
  ownerEmail: string,
  shareWithEmail: string,
  role: "admin" | "user"
): Promise<void> => {
  await updateDoc(doc(db, "tasks", taskId), {
    sharedWith: arrayUnion({
      email: shareWithEmail,
      role,
    }),
  });
};

export const unshareTask = async (
  taskId: string,
  emailToRemove: string
): Promise<void> => {
  const taskRef = doc(db, "tasks", taskId);
  const taskDoc = await getDoc(taskRef);

  if (!taskDoc.exists()) {
    throw new Error("Task not found");
  }

  const task = taskDoc.data() as Task;
  const sharedItem = task.sharedWith.find(
    (item) => item.email === emailToRemove
  );

  if (!sharedItem) {
    throw new Error("User not found in shared list");
  }

  await updateDoc(taskRef, {
    sharedWith: arrayRemove(sharedItem),
  });
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await deleteDoc(doc(db, "tasks", taskId));
};
