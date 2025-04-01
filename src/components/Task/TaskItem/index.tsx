import { Link, Pencil, Square, SquareCheck, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

type TaskItemProps = {
  id: string;
  number: number;
  title: string;
  description?: string;
  isDone?: boolean;
  createdAt?: Date;
  onToggleComplete?: (id: string) => void;
  onEdit?: (id: string, newTitle: string, newDescription?: string) => void;
  onDelete?: (id: string) => void;
  onShare?: () => void;
  canEdit?: boolean;
  sharedOwner?: string;
};

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  number,
  title,
  description = "",
  isDone = false,
  createdAt,
  onToggleComplete,
  onEdit,
  onDelete,
  onShare,
  canEdit = true,
  sharedOwner,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [showDescription, setShowDescription] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (editedTitle.trim() && onEdit) {
      onEdit(id, editedTitle, editedDescription || undefined);
      setIsEditing(false);
    }
  };

  const handleToggle = () => {
    if (onToggleComplete) {
      onToggleComplete(id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  const canActuallyEdit = canEdit && !isDone && !!onEdit;
  const canActuallyToggle = !!onToggleComplete && (!sharedOwner || canEdit);

  return (
    <div
      className={`p-3 border rounded-xl flex flex-col gap-2 ${
        isDone
          ? "border-green-500 outline outline-green-500"
          : "border-neutral-700"
      } ${sharedOwner ? "border-blue-300 outline outline-blue-500" : ""}`}
    >
      <div className="flex gap-3 items-start">
        {canActuallyToggle ? (
          <button
            onClick={handleToggle}
            className="mt-1"
            aria-label={isDone ? "Mark as incomplete" : "Mark as complete"}
          >
            {isDone ? (
              <SquareCheck size={24} className="text-green-500" />
            ) : (
              <Square size={24} />
            )}
          </button>
        ) : (
          <div className="w-8 min-w-8" />
        )}

        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div
              className="flex-1 flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDescription(!showDescription)}
            >
              <span className="text-lg font-semibold">#{number}</span>
              <span
                className={`text-sm break-words ${
                  isDone ? "line-through" : ""
                }`}
              >
                {title}
              </span>
            </div>

            {!isEditing && (
              <div className="flex gap-1">
                {onShare && (
                  <button
                    onClick={onShare}
                    className="p-2 bg-purple-600 hover:bg-purple-700 rounded-xl cursor-pointer transition-colors duration-150"
                    aria-label="Share task"
                  >
                    <Link size={16} />
                  </button>
                )}
                {canActuallyEdit && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer transition-colors duration-150"
                    aria-label="Edit task"
                  >
                    <Pencil size={16} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={handleDelete}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer transition-colors duration-150"
                    aria-label="Delete task"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            )}
          </div>

          {sharedOwner && (
            <span className="text-xs text-blue-400 mt-1">
              Shared by {sharedOwner}
              {canEdit && (
                <span className="text-green-400 ml-1">• can edit</span>
              )}
            </span>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="ml-11 mt-2 flex flex-col gap-2">
          <input
            ref={titleInputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-neutral-800 text-neutral-200"
            placeholder="Task title"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-neutral-800 text-neutral-200 min-h-[100px] text-sm"
            placeholder="Description (optional)"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(title);
                setEditedDescription(description);
              }}
              className="px-3 py-1 text-neutral-300 hover:bg-neutral-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {!isEditing && showDescription && (
        <div className="ml-11 mt-2 text-sm text-neutral-300">
          {description || <span className="italic">No description</span>}
          {createdAt && (
            <div className="mt-2 text-xs text-neutral-400">
              Created: {new Date(createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
