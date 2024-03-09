import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { useAuth } from 'react-oidc-context';

const Unauthorized = () => {
  const Navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    Navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Unauthorized Access
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You do not have permission to access this page.
          </p>
          {!isAuthenticated ? (
            <>
              <p className="mt-2 text-center text-sm text-gray-600">
                Please login to proceed.
              </p>
              <div>
                <button onClick={handleLogin} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Login
                </button>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Or you can use Link to navigate to a login page
                </p>
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login
                </Link>
              </div>
            </>
          ) : (
            <p className="mt-2 text-center text-sm text-gray-600">
              If you believe this is an error, please contact support at <a href="mailto:support@company.com" className="underline text-indigo-600 hover:text-indigo-500">support@company.com</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;