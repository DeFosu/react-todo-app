import { Link, Pencil, Square, SquareCheck, X } from "lucide-react";
import React, { useState } from "react";

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

  const handleSave = () => {
    if (editedTitle.trim() && onEdit) {
      onEdit(id, editedTitle, editedDescription);
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
      <div className="flex gap-3 items-center">
        {canActuallyToggle ? (
          <button
            onClick={handleToggle}
            className={`h-5 w-5 rounded border flex items-center justify-center ${
              isDone ? "bg-green-500 border-green-600" : "border-neutral-400"
            }`}
            aria-label={isDone ? "Mark as incomplete" : "Mark as complete"}
          >
            {isDone ? <SquareCheck size={20} /> : <Square size={20} />}
          </button>
        ) : (
          <div className="w-5" />
        )}

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 px-2 py-1 border rounded"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          <div
            className="flex-1 cursor-pointer"
            onClick={() => setShowDescription(!showDescription)}
          >
            <span className="text-lg font-semibold mr-2">#{number}</span>
            <span className={`text-sm ${isDone ? "line-through" : ""}`}>
              {title}
            </span>
            {sharedOwner && (
              <span className="text-xs text-blue-600 ml-2">
                (shared by {sharedOwner})
                {canEdit && (
                  <span className="text-green-600 ml-1">• can edit</span>
                )}
              </span>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="text-green-500 hover:text-green-400"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedTitle(title);
                  setEditedDescription(description);
                }}
                className="text-neutral-500 hover:text-neutral-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {onShare && (
                <button
                  onClick={onShare}
                  className="bg-purple-600 hover:bg-purple-700 p-1 rounded cursor-pointer"
                >
                  <Link />
                </button>
              )}
              {canActuallyEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 p-1 rounded cursor-pointer"
                >
                  <Pencil />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 p-1 rounded cursor-pointer"
                >
                  <X />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="pl-8">
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-2 py-1 border rounded min-h-[100px] text-sm text-neutral-300 bg-transparent"
            placeholder="Enter description (optional)"
          />
        </div>
      ) : (
        showDescription && (
          <div className="pl-8 text-sm text-neutral-300">
            {description || <span className="italic">No description</span>}
          </div>
        )
      )}

      {createdAt && (
        <div className="pl-8 text-xs text-neutral-400">
          Created: {new Date(createdAt).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
