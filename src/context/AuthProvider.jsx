// import { createContext, useContext, useState } from "react";
// import PropTypes from 'prop-types';

// // Create the AuthContext
// export const AuthContext = createContext();

// // AuthProvider component
// export default function AuthProvider({ children }) {
//   const initialAuthUser = localStorage.getItem("Users");
//   let parsedAuthUser;
//   try {
//     parsedAuthUser = initialAuthUser ? JSON.parse(initialAuthUser) : null;
//   } catch (error) {
//     console.error("Error parsing auth user from localStorage", error);
//     parsedAuthUser = null;
//   }

//   const [authUser, setAuthUser] = useState(parsedAuthUser);

//   // Return the AuthContext.Provider with an array [authUser, setAuthUser]
//   // In AuthProvider.js
// const logout = () => {
//   setAuthUser(null);
//   localStorage.removeItem("Users");
// };
//   return (
//     <AuthContext.Provider value={[authUser, setAuthUser, logout]}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// // useAuth hook
// // useAuth hook
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context; // Returns [authUser, setAuthUser]
// };

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default function AuthProvider ({ children })  {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Restore authUser from token on mount or when profile is updated
  useEffect(() => {
    const restoreAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          console.log("Fetching user data from server...");
          // Fetch user data using the token
          const response = await fetch("http://localhost:5000/api/auth/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          });

          if (!response.ok) {
            // If the token is invalid or expired, clear it
            if (response.status === 401) {
              console.log("Token expired or invalid, clearing token");
              localStorage.removeItem("token");
            }
            setAuthUser(null);
            setLoading(false);
            return;
          }

          const data = await response.json();
          console.log("Auth data from server:", data);

          if (data.success && data.data) {
            console.log("Setting auth user with role:", data.data.role);
            console.log("Business logo URL:", data.data.businessLogo);
            setAuthUser(data.data); // Restore user data
          } else {
            console.log("Invalid response format from server");
            setAuthUser(null);
          }
        } catch (err) {
          console.error("Restore Auth Error:", err);
          // Don't remove token on network errors, as it might be a temporary issue
          setAuthUser(null);
        }
      }
      setLoading(false); // Done checking
    };
    restoreAuth();

    // Listen for profile updates
    const handleStorageChange = (e) => {
      // If this is a custom event (no key) or the updatedProfile key changed
      if (!e.key || e.key === 'updatedProfile') {
        console.log("Profile updated, refreshing user data");
        restoreAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userData, token) => {
    console.log("Login with user data:", userData);
    console.log("User role:", userData.role);
    localStorage.setItem("token", token);
    setAuthUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={[authUser, setAuthUser, logout, login, loading]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // Returns [authUser, setAuthUser]
};
