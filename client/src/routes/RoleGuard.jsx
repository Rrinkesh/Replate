import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RoleGuard = ({ allowedRoles = [], redirectTo = '/dashboard', children }) => {
  const { userRole, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner size="lg" message="Checking permissions..." fullScreen />;
  }

  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export default RoleGuard;
