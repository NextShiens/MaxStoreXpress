import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ADMIN_ROLE, USER_ROLE, SELLER_ROLE } from './constant';
import Footer from './components/common/Footer.js';
import CircularProgress from '@mui/material/CircularProgress';
import  Navbar  from './components/common/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Skeleton from '@mui/material/Skeleton';

const Unauthorized = React.lazy(() => import("./pages/Unauthorized.js"));
const Home = React.lazy(() => import("./pages/Home"));
const AdminComponent = React.lazy(() => import("./components/AdminComponent"));
const UserComponent = React.lazy(() => import("./components/UserComponent"));
const SellerComponent = React.lazy(() => import("./components/SellerComponent"));
const LoginComponent = React.lazy(() => import("./auth/Login.js"));
const Products = React.lazy(() => import("./components/Products/Page.js"));
const Product = React.lazy(() => import("./components/Product/Page.js"));
const Users = React.lazy(() => import("./components/UserComponent/index.js"));

const App = () => {
  return (
    <>
      <React.Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginComponent />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={AdminComponent} roles={[ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={UserComponent} roles={[USER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/seller"
            element={<ProtectedRoute element={SellerComponent} roles={[SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
        </Routes>
        <Footer />
      </React.Suspense>
    </>
  );
};


export default App;
