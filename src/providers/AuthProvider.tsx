import React from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import useSessionStorageState from "use-session-storage-state";
import { useNavigate, useLocation } from "react-router-dom";

const DX_SERVER = window.config.DX_SERVER;
const WT_DX_2_0_ENDPOINT = `${DX_SERVER}/v2_0/ReportService`;
const SECRET = process.env.REACT_APP_ENCRYPTION_SECRET || "webtrends";

export const AuthContext = React.createContext<AuthProviderProps>(undefined!);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = React.useState<credentialProps | null>(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [encryptedAuth, setEncryptedAuth, { removeItem, isPersistent }] =
    useSessionStorageState("wt:auth");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (creds: any) => {
    try {
      setIsLoggingIn(true);
      const res = await axios.get(`${WT_DX_2_0_ENDPOINT}/profiles`, {
        auth: {
          username: creds.username,
          password: creds.password,
        },
      });
      if (res.status === 200) {
        setAuth(creds);
        setEncryptedAuth(encryptObject(creds, SECRET));
        setIsLoggingIn(false);
        if (location.pathname === "/login") {
          const origin =
            `${location.state?.from?.pathname}${location.state?.from?.search}` ||
            "/";
          navigate(origin);
        }
      }
    } catch (error: any) {
      const errorText = error.message;
      setErrorMessage(`Please verify the username and password`);
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setAuth(null);
    removeItem();
    navigate("/login");
  };

  // If credentials exist in session storage, use them
  if (!auth && isPersistent) {
    if (encryptedAuth) {
      setAuth(decryptObject(encryptedAuth as string, SECRET));
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        handleLogin,
        handleLogout,
        errorMessage,
        isLoggingIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const encryptObject = (obj: Object, secret: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(obj), secret).toString();
};

const decryptObject = (cipherText: string, secret: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secret);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

interface AuthProviderProps {
  /**
   * Username and password
   */
  auth: credentialProps | null;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  /**
   * Handle login submission
   */
  handleLogin: (creds: credentialProps) => void;
  /**
   * Handle logout request
   */
  handleLogout: () => void;
  /**
   * Message to display on unsuccessful login attempt
   */
  errorMessage: string;
  /**
   * Login status
   */
  isLoggingIn: boolean;
}

interface credentialProps {
  username?: string;
  password?: string;
}
