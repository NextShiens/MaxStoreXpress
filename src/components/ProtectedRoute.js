import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

const ProtectedRoute = ({ element: Component, roles, unauthorizedPath, loginPath, ...rest }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const userHasRole = useMemo(() => {
    return user && user.profile && user.profile['cognito:groups'] && roles.some(role => user.profile['cognito:groups'].includes(role));
  }, [user, roles]);

  if (!isAuthenticated) {
    navigate(loginPath);
    return null;
  }

  if (!userHasRole) {
    navigate(unauthorizedPath);
    return null;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;