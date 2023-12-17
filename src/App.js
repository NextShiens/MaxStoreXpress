import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Navbar from './components/common/Navbar';
// import Home from './pages/Home';
// import Unauthorized from './pages/Unauthorized';
// import AdminComponent from './components/AdminComponent';
// import UserComponent from './components/UserComponent';
// import SellerComponent from './components/SellerComponent';
// import ProtectedRoute from './components/ProtectedRoute';
// import LoginComponent from './auth/Login.js';
import { ADMIN_ROLE, USER_ROLE, SELLER_ROLE } from './constant';
import Footer from './components/common/Footer.js';
const Navbar = React.lazy(() => import("./components/common/Navbar"));
const Unauthorized = React.lazy(() => import("./components/AdminComponent"));
const Home = React.lazy(() => import("./pages/Home"));
const AdminComponent = React.lazy(() => import("./components/AdminComponent"));
const UserComponent = React.lazy(() => import("./components/UserComponent"));
const SellerComponent = React.lazy(() => import("./components/SellerComponent"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const LoginComponent = React.lazy(() => import("./auth/Login.js"));

const App = () => {
  return (
    <>
    
    <React.Suspense fallback={<>Loading...</>}>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginComponent />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={AdminComponent} roles={[ADMIN_ROLE]} unauthorizedPath="/unauthorized" />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={UserComponent} roles={[USER_ROLE]} unauthorizedPath="/unauthorized" />}
          />
          <Route
            path="/seller"
            element={<ProtectedRoute element={SellerComponent} roles={[SELLER_ROLE]} unauthorizedPath="/unauthorized" />}
          />
         
       
        </Routes>
        <Footer />
        </React.Suspense>
        </>
    
  );
};

export default App;
