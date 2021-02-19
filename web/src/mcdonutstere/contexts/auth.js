import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import * as auth from "../services/auth";
import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function loadStorage() {
      const storagedUser = localStorage.getItem("@RNAuth:user");
      const storagedToken = localStorage.getItem("@RNAuth:token");

      if (storagedUser && storagedToken) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signIn(data) {
    const response = await auth.signIn(data.name, data.password);

    if (!response.status) {
      return 404;
    }
    if (response.status === 401) {
      return 401;
    }

    setUser(response.data.user);

    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    localStorage.setItem("@RNAuth:user", JSON.stringify(response.data.user));
    localStorage.setItem("@RNAuth:token", response.data.token);

    history.push("/mcdonuts/");
    return 200;
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@RNAuth:user");
    localStorage.removeItem("@RNAuth:token");

    history.push("/mcdonuts/");
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
