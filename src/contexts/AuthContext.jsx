import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import apiClient from "../api/apiClient";

const AuthContext = createContext();

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // fetch the profile (cookie may already be set)
  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.getUserProfile();
        setUser(res.user ?? res);
      } catch {
        // not logged in
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const res = await apiClient.login(credentials);
      setUser(res.user ?? res);
      return res;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const res = await apiClient.register(userData);
      return res;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyEmail = useCallback(async (otp) => {
    setIsLoading(true);
    try {
      const res = await apiClient.verifyEmail(otp);
      // the auth_token cookie is set
      setUser(res.user ?? res);
      return res;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.logout();
    } catch {
      // best-effort
    }
    setUser(null);
  }, []);

  const googleLogin = useCallback(() => {
    window.location.href = apiClient.getGoogleOAuthURL();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        initializing,
        login,
        register,
        verifyEmail,
        logout,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
