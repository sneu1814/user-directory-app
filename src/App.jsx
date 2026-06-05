import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import UserModal from "./components/UserModal";
import Pagination from "./components/Pagination";

import { useUsers } from "./hooks/useUsers";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";

function App() {

  const {
    users,
    loading,
    error,
    refreshUsers
  } = useUsers();

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const debouncedSearch =
    useDebounce(searchTerm, 300);
    useEffect(() => {
      setCurrentPage(1);
    },[debouncedSearch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(
          debouncedSearch.toLowerCase()
        )
  );

  const USERS_PER_PAGE = 5;

  const startIndex =
    (currentPage - 1) *
    USERS_PER_PAGE;

  const currentUsers =
    filteredUsers.slice(
      startIndex,
      startIndex + USERS_PER_PAGE
    );

  const totalPages = Math.ceil(
    filteredUsers.length /
      USERS_PER_PAGE
  );

  if (loading) {
    return(
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="app-container">

      <div className="header">
        <h1>User Directory Dashboard</h1>
        <p>Manage and explore user information</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{currentUsers.length}</h2>
          <p>Users On Current Page</p>
      </div>

        <div className="stat-card">
          <h2>{filteredUsers.length}</h2>
          <p>Filtered Users</p>
        </div>
      </div>

      <button
        className="refresh-btn"
        onClick={refreshUsers}
      >
        Refresh Users
      </button>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />


    {filteredUsers.length === 0 && (
      <h3 className="no-users"> No users found</h3>
    )}

    <p className="page-info">
      Showing {currentUsers.length} users on page {currentPage} of {totalPages}
    </p>

      <div className="user-grid">
        {currentUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onSelect={setSelectedUser}
          />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <UserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      <footer className="footer">
        User Directory App • React + API Integration
      </footer>

    </div>
  );
}

export default App;