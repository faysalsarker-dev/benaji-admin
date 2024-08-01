import { useContext } from "react";
import { ContextData } from "./../Context/AuthContext";

const useAuth = () => {
  const auth = useContext(ContextData);
  return auth;
};

export default useAuth;