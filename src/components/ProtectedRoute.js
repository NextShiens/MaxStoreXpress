import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { ADMIN_ROLE, USER_ROLE, SELLER_ROLE } from '../constant';
import ProductSkeleton from './common/loading.js';

const ProtectedRoute = ({ element: Element, roles, loginPath = '/login', ...rest }) => {
  debugger
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && !isAuthorized()) {
      sendToLogin();
    }
  }, [initialized]);

  const sendToLogin = () => {
    window.location.href = loginPath;
  };

  const isAuthorized = () => {
    if (!keycloak || !keycloak.authenticated) {
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
              <React.Suspense fallback={<ProductSkeleton />}>
                <Element />
              </React.Suspense>
            ) : (
              <ProductSkeleton />
            )
          ) : (
            <ProductSkeleton />
          )
        }
      />
    </Routes>
  );
};

export default ProtectedRoute;