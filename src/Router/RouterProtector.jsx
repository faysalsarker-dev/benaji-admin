/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { ScaleLoader } from "react-spinners";





const RouterProtector = ({ children }) => {
  const { user ,loading } = useAuth();
  const location = useLocation();

 if(loading){
    return <div className="h-screen flex justify-center items-center"><ScaleLoader color="green" /></div>
 }
  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
  return <>{children}</>;
};

export default RouterProtector;