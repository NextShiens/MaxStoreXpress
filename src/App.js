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
import CircularProgress from '@mui/material/CircularProgress';
import  Navbar  from './components/common/Navbar'
import TopProducts from './components/TopProducts/TopProducts';
import EditProduct from './components/Products/EditProduct';

// const Navbar = React.lazy(() => import("./components/common/Navbar"));
const Unauthorized = React.lazy(() => import("./components/AdminComponent"));
const Home = React.lazy(() => import("./pages/Home"));
const AdminComponent = React.lazy(() => import("./components/AdminComponent"));
const UserComponent = React.lazy(() => import("./components/UserComponent"));
const ProductComponent = React.lazy(() => import("./components/ProductComponent"))
const SellerComponent = React.lazy(() => import("./components/SellerComponent"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const LoginComponent = React.lazy(() => import("./auth/Login.js"));
const Products = React.lazy(() => import("./components/Products/Page.js"));
const Product = React.lazy(() => import("./components/Product/Page.js"));
const Users = React.lazy(() => import("./components/UserComponent/index.js"));

const App = () => {
  return (
    <>
    
    <React.Suspense fallback={<CircularProgress />}>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/Login" element={<LoginComponent />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/users" element={<Users />} />
          <Route path="/product-management" element={<ProductComponent />} /> 
          <Route path="/topproducts" element={<TopProducts />} />
          <Route path="/editproducts" element={<EditProduct/>} />
          
          <Route
            path="/admin/*"
            element={<ProtectedRoute element={AdminComponent} roles={[ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/user/*"
            element={<ProtectedRoute element={UserComponent} roles={[USER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/seller/*"
            element={<ProtectedRoute element={SellerComponent} roles={[SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
         
        </Routes>
        <Footer />
        </React.Suspense>
        </>
    
  );
};

export default App;
