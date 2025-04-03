import React from 'react';
import { AccountOptions } from '../components/AccountOptions';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function Account() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Account</h1>
      <AccountOptions />
    </div>
  );
} 