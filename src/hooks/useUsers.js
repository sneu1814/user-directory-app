import { useState, useEffect } from "react";
import { fetchUsers } from "../services/api";

const CACHE_KEY = "users_cache";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsers = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError("");

      if (!forceRefresh) {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          setUsers(JSON.parse(cached));
          setLoading(false);
          return;
        }
      }

      const data = await fetchUsers();

      setUsers(data);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify(data)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refreshUsers: () => getUsers(true)
  };
};