import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useKeycloak } from '@react-keycloak/web';
import { ADMIN_ROLE, USER_ROLE, SELLER_ROLE } from '../constant';

const ProtectedRoute = ({ element: Element, roles, loginPath = '/', ...rest }) => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  const sendToLogin = () => {
    navigate(loginPath);
  };

  const isAuthorized = () => {
    if (!keycloak.authenticated) {
      return false;
    }

    if (!roles || roles.length === 0) {
      return true;
    }

    return roles.some(role => keycloak.hasRealmRole(role));
  };

  return (
    <Routes>
      <Route
        {...rest}
        element={
          initialized ? (
            isAuthorized() ? (
              <Element />
            ) : (
              <>
                {sendToLogin()}
                <CircularProgress color="secondary" />
              </>
            )
          ) : (
            <CircularProgress color="secondary" />
          )
        }
      />
    </Routes>
  );
};

export default ProtectedRoute;
