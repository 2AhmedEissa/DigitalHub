import { useState, useEffect, useMemo, useCallback } from "react";
import { useUsersSWR } from "../services/userService";
import toast from "react-hot-toast";

export const useUsers = () => {
  const {
    users: apiUsers,
    isLoading: isApiLoading,
    isError: isApiError,
  } = useUsersSWR();

  const [users, setUsers] = useState(() => {
    try {
      const cached = localStorage.getItem("users");
      const parsed = cached ? JSON.parse(cached) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse users from local storage", error);
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const hasLocalData = !!localStorage.getItem("users");
    if (!hasLocalData && apiUsers && apiUsers.length > 0) {
      setUsers(apiUsers);
      localStorage.setItem("users", JSON.stringify(apiUsers));
    }
  }, [apiUsers]);

  const updateUsers = useCallback((newUsers) => {
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  }, []);

  const loading =
    isApiLoading && users.length === 0 && !localStorage.getItem("users");
  const error = isApiError
    ? "Failed to fetch users. Please try again later."
    : null;

  const filteredUsers = useMemo(() => {
    // Ensure users is an array before filtering
    const safeUsers = Array.isArray(users) ? users : [];
    return safeUsers.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
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
    
    setSelectedUser(null);
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
            u.id === editingUser.id ? { ...u, ...userData } : u,
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
    [editingUser],
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
    updateUsers([]);
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
  }, [updateUsers]);

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
