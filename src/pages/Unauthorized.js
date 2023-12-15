import React from 'react';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Unauthorized = () => {
  const Navigate = useNavigate();

  const handleLogin = () => {

    Navigate('/login');
  };

  return (
    <div>
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to access this page.</p>
      <p>Please login to proceed.</p>
      <button onClick={handleLogin}>Login</button>
      {/* Or you can use Link to navigate to a login page */}
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Unauthorized;
