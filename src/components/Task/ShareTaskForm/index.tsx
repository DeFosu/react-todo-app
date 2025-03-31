import React, { useState } from "react";

type SharedWith = {
  email: string;
  role: "admin" | "user";
};

interface ShareTaskFormProps {
  onSubmit: (email: string, role: "admin" | "user") => void;
  onCancel: () => void;
  sharedWith?: SharedWith[];
  onUnshare?: (email: string) => void;
  isOwner?: boolean;
}

const ShareTaskForm: React.FC<ShareTaskFormProps> = ({
  onSubmit,
  onCancel,
  sharedWith = [],
  onUnshare,
  isOwner = false,
}) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    onSubmit(trimmedEmail, role);
    setEmail("");
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-medium mb-3">Share Task</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter user's email"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
                className="mr-2"
              />
              Admin (can edit)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={role === "user"}
                onChange={() => setRole("user")}
                className="mr-2"
              />
              User (view only)
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Share
          </button>
        </div>
      </form>

      {isOwner && sharedWith.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Shared with:</h4>
          <ul className="divide-y">
            {sharedWith.map((item) => (
              <li
                key={item.email}
                className="py-2 flex justify-between-printed items-center"
              >
                <span>
                  {item.email} ({item.role})
                </span>
                {onUnshare && (
                  <button
                    onClick={() => onUnshare(item.email)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareTaskForm;
