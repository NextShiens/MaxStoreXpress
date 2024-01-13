import { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ roles, element: Element, ...props }) => {
  const { initialized, keycloak } = useKeycloak();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!initialized) return;

    let isMounted = true;

    if (!keycloak.authenticated || (roles && !roles.some(role => keycloak.hasResourceRole(role)))) {
      if (isMounted) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    } else {
      setIsAuthorized(true);
    }

    return () => {
      isMounted = false;
    };
  }, [initialized, keycloak, navigate, roles]);

  if (!initialized || !isAuthorized) {
    return null;
  }

  return <Element {...props} />;
};

export default ProtectedRoute;