import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchUsers } from "../services/userService";
import toast from "react-hot-toast";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleSelectUser = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingUser(null);
    setIsModalOpen(true);
  }, []);

  const handleEditClick = useCallback((user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingUser(null);
  }, []);

  const handleSaveUser = useCallback(
    (userData) => {
      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...userData } : u))
        );
      } else {
        setUsers((prev) => [{ id: Date.now(), ...userData }, ...prev]);
      }
      setIsModalOpen(false);
      setEditingUser(null);
    },
    [editingUser]
  );

  const handleDeleteUser = useCallback((user) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-5">
          <p className="text-sm font-medium text-gray-900">
            Delete <span className="font-bold">{user.name}</span>?
          </p>
          <div className="flex gap-8">
            <button
              onClick={() => {
                setUsers((prev) => prev.filter((u) => u.id !== user.id));
                toast.dismiss(t.id);
                toast.success("User deleted successfully", {
                  icon: "🗑️",
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }}
              className="cursor-pointer  px-3 py-1.5 bg-rose-500 text-white text-xs font-semibold rounded-md hover:bg-rose-600 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="cursor-pointer px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#fff",
          color: "#333",
          padding: "16px",
          borderRadius: "16px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      }
    );
  }, []);

  return {
    users: filteredUsers,
    search,
    loading,
    error,
    selectedUser,
    isModalOpen,
    editingUser,
    handleSearchChange,
    handleSelectUser,
    handleClearSelection,
    handleAddClick,
    handleEditClick,
    handleCloseModal,
    handleSaveUser,
    handleDeleteUser,
  };
};
