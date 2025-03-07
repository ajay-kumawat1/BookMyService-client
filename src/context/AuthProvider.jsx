import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");
  let parsedAuthUser;
  try {
    parsedAuthUser = initialAuthUser ? JSON.parse(initialAuthUser) : null;
  } catch (error) {
    console.error("Error parsing auth user from localStorage", error);
    parsedAuthUser = null;
  }

  const [authUser, setAuthUser] = useState(parsedAuthUser);

  // Return the AuthContext.Provider with an array [authUser, setAuthUser]
  // In AuthProvider.js
const logout = () => {
  setAuthUser(null);
  localStorage.removeItem("Users");
};
  return (
    <AuthContext.Provider value={[authUser, setAuthUser, logout]}>
      {children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// useAuth hook
// useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // Returns [authUser, setAuthUser]
};