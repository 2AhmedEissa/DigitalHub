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
  const [editingUser, setEditingUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const cachedUsers = localStorage.getItem("users");
        if (cachedUsers) {
          setUsers(JSON.parse(cachedUsers));
        } else {
          const data = await fetchUsers();
          setUsers(data);
          localStorage.setItem("users", JSON.stringify(data));
        }
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

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    setCurrentPage(1);
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
      setUsers((prev) => {
        let newUsers;
        if (editingUser) {
          newUsers = prev.map((u) =>
            u.id === editingUser.id ? { ...u, ...userData } : u
          );
        } else {
          newUsers = [{ id: Date.now(), ...userData }, ...prev];
        }
        localStorage.setItem("users", JSON.stringify(newUsers));
        return newUsers;
      });
      setIsModalOpen(false);
      setEditingUser(null);
    },
    [editingUser]
  );

  const handleDeleteUser = useCallback((userId) => {
    setUsers((prev) => {
      const newUsers = prev.filter((u) => u.id !== userId);
      localStorage.setItem("users", JSON.stringify(newUsers));
      return newUsers;
    });
    setSelectedUser(null);
    toast.success("User deleted successfully", {
      icon: "🗑️",
      style: {
        borderRadius: "10px",
        background: "red",
        color: "#fff",
      },
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setUsers([]);
    localStorage.removeItem("users");
    setSelectedUser(null);
    setEditingUser(null);
    toast.success("All users cleared successfully", {
      icon: "🧹",
      style: {
        borderRadius: "10px",
        background: "red",
        color: "#fff",
      },
    });
  }, []);

  return {
    users: paginatedUsers,
    totalUsers: filteredUsers.length,
    currentPage,
    totalPages,
    setCurrentPage,
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
    handleClearAll,
  };
};
