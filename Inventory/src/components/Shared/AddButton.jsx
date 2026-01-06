import { Plus } from "lucide-react";

export default function AddButton({ onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-200 ${className}`}
    >
      <Plus className="h-5 w-5" />
      <span>Add User</span>
    </button>
  );
}
