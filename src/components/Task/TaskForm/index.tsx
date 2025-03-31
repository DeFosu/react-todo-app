import React, { useState } from "react";

interface TaskFormProps {
  onSubmit: (title: string, description?: string) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, description.trim() || undefined);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title*
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
          autoFocus
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg hover:bg-neutral-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
