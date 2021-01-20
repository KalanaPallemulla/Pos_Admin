import React, { useEffect, useState } from "react";
import { app } from "./config";

import { CircularProgress } from "@material-ui/core";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  console.log("context");

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setPending(false);
      } else {
        setPending(false);
        setCurrentUser(null);
      }
    });
  }, []);

  if (pending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="inherit"></CircularProgress>;
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
