/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { ScaleLoader } from "react-spinners";
import useCheck from "../Hook/useCheck";
import { toast } from 'react-hot-toast';


const RouterProtector = ({ children }) => {
  const { user, loading: authLoading ,logOut} = useAuth();
  const { data, isLoading: checkLoading } = useCheck();
  const location = useLocation();

  if (authLoading || checkLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ScaleLoader color="green" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (data.status === 'block') {
    toast.error('You are blocked by the admin.');
    logOut()
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  if (data.status === 'pending') {
    toast.error('Please wait for admin approval.');
    logOut()
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RouterProtector;
