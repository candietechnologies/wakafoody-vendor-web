import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the authenticated user object
  const [loading, setLoading] = useState(true); // Indicates whether the auth state is being loaded
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks auth status
  const [token, setToken] = useState(""); // Holds the auth token

  async function updateUser(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  // Function to log in a user
  const login = async (userData, token) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      setToken(token);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  // Function to log out the user
  const logout = async () => {
    try {
      // setUser(null);
      setIsAuthenticated(false);
      setToken("");

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("restaurant");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Load user from AsyncStorage on app start hhh
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          setToken(JSON.parse(storedToken));
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loading,
        login,
        logout,
        token,
        updateUser,
      }}>
      {loading ? null : children}
      {/* Render children only when loading is complete */}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
