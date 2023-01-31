import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const WT_DX_SERVER = process.env.REACT_APP_DX_SERVER;
const WT_DX_2_0_ENDPOINT = `${WT_DX_SERVER}/v2_0/ReportService`;

export const AuthContext = React.createContext<AuthProviderProps>(undefined!);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = React.useState<credentialProps>({});
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (creds: any) => {
    try {
      const res = await axios.get(`${WT_DX_2_0_ENDPOINT}/profiles`, {
        auth: {
          username: creds.username,
          password: creds.password,
        },
      });
      if (res.status === 200) {
        setAuth(creds);
        if (location.pathname === "/login") {
          const origin = location.state?.from?.pathname || "/";
          navigate(origin);
        }
      }
    } catch (error: any) {
      console.log("Login failed:", error.request.statusText);
      setErrorMessage(`Login failed: ${error.request.statusText}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        handleLogin,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthProviderProps {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  handleLogin: (creds: any) => void;
  errorMessage: string;
}

interface credentialProps {
  username?: string;
  password?: string;
}
