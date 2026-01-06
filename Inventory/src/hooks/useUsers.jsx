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
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    toast.success("User deleted successfully", {
      icon: "🗑️",
      style: {
        borderRadius: "10px",
        background: "red",
        color: "#fff",
      },
    });
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
