import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import useApi from '../../Hooks/useApi';

function ProtectedRoute() {
  const { isAuthenticated } = useApi();

  return isAuthenticated ? <Navigate to="/" /> :<Outlet />  ;
}

export default ProtectedRoute;
