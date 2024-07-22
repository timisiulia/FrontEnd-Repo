import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

export const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = !!useSelector((state) => state.auth.id);
  const isAdmin = !!useSelector((state) => state.auth.role === 'ADMIN');
  const { adminRoute } = props;

  const checkAdmin = useCallback(() => {
    return adminRoute && !isAdmin;
  }, [adminRoute, isAdmin]);

  const checkUserToken = useCallback(() => {
    if (!isLoggedIn || checkAdmin()) {
      return navigate('/login');
    }
  }, [checkAdmin, isLoggedIn, navigate])

  useEffect(() => {
    checkUserToken();
  }, [checkUserToken]);

  return (
    <React.Fragment>
      {isLoggedIn || checkAdmin() ? props.children : null}
    </React.Fragment>
  );
}
