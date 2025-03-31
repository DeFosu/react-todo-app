import { X } from "lucide-react";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center">
      <div className="mb-4 relative">
        {children}
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 p-1 rounded cursor-pointer top-2 right-2 absolute text-neutral-50"
        >
          <X size={16} />
        </button>
      </div>
      <div className="flex justify-end"></div>
    </div>,
    document.body
  );
};

export default Modal;
