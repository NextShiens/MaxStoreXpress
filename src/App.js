import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ADMIN_ROLE, USER_ROLE, SELLER_ROLE, SUPER_ADMIN_ROLE, BUYER_ROLE } from './constant';
import Footer from './components/common/Footer.js';
import SkeletonHome from './pages/skelton/skeltonHome.js';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Transactions from './pages/transactions/transactions.js';
import UpdateUserForm from './pages/UserManagement/UserUpdate.js';
import CustomerPage from './pages/customers/customerPage.js';
import UserTable from './pages/UserManagement/UserTable.js';
import Review from './pages/Products/Review.js';
import Sidebar from './pages/Sidebar/Sidebar.js';
import Accounts from './components/common/Accounts.js';
import YourProfile from './components/common/Yourprofile.js';
import SingleProductPage from './pages/Products/SingleProductPage.js';

const EditProduct = React.lazy(() => import("./components/ProductManagement/EditProduct.js"));
const ProductUpdate = React.lazy(() => import("./components/ProductManagement/ProductUpdate.js"));
const Cart = React.lazy(() => import("./pages/Products/cart.js"));
const Checkout = React.lazy(() => import("./pages/Products/checkout.js"));
const ProductsPage = React.lazy(() => import("./pages/Products/productPage.js"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized.js"));
const Home = React.lazy(() => import("./pages/Home"));
const AdminComponent = React.lazy(() => import("./components/AdminComponent/sellersRequestList.js"));
const UserComponent = React.lazy(() => import("./components/UserComponent"));
const SellerComponent = React.lazy(() => import("./components/SellerComponent"));
const LoginComponent = React.lazy(() => import("./auth/Login.js"));
const Products = React.lazy(() => import("./components/Products/Page.js"));
const Product = React.lazy(() => import("./components/Product/Page.js"));
const Users = React.lazy(() => import("./components/UserComponent/index.js"));
const RealProducts = React.lazy(() => import("./pages/Products/index.js"));
const DemoProducts = React.lazy(() => import("./pages/Products/demoRealProducts.js"));
const SellerAccessRequestForm = React.lazy(() => import("./components/SellerDashboard/SellerAccessRequestForm.js"));

const App = () => {
  return (
    <>
      <React.Suspense fallback={<SkeletonHome />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginComponent />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/products" element={<Products />} />
          <Route path="/realproducts" element={<RealProducts />} />
          <Route path="/demoProducts" element={<DemoProducts />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/sidebar"
            element={<ProtectedRoute element={Sidebar} roles={[ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/table"
            element={<ProtectedRoute element={UserTable} roles={[ADMIN_ROLE, SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/update/:id"
            element={<ProtectedRoute element={UpdateUserForm} roles={[ADMIN_ROLE,SELLER_ROLE, SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/review"
            element={<ProtectedRoute element={Review} roles={[BUYER_ROLE, USER_ROLE, ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/customers"
            element={<ProtectedRoute element={CustomerPage} roles={[ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/productsPage"
            element={<ProtectedRoute element={ProductsPage} roles={[BUYER_ROLE, USER_ROLE, ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/EditProduct/:id"
            element={<ProtectedRoute element={EditProduct} roles={[ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/product/:productId"
            element={<ProtectedRoute element={SingleProductPage} roles={[BUYER_ROLE, USER_ROLE, ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/users"
            element={<ProtectedRoute element={Users} roles={[ADMIN_ROLE, SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/admin"
            element={<ProtectedRoute element={AdminComponent} roles={[ADMIN_ROLE, SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={UserComponent} roles={[USER_ROLE, SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/seller-request"
            element={<ProtectedRoute element={SellerAccessRequestForm} roles={[USER_ROLE,SELLER_ROLE,ADMIN_ROLE, SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/seller"
            element={<ProtectedRoute element={SellerComponent} roles={[SELLER_ROLE, SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/admin/ProductManagement"
            element={<ProtectedRoute element={RealProducts} roles={[ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/cart"
            element={<ProtectedRoute element={Cart} roles={[BUYER_ROLE, USER_ROLE, ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/checkout"
            element={<ProtectedRoute element={Checkout} roles={[BUYER_ROLE, USER_ROLE, ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/transactions"
            element={<ProtectedRoute element={Transactions} roles={[ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/account"
            element={<ProtectedRoute element={Accounts} roles={[BUYER_ROLE, USER_ROLE, ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/your_profile"
            element={<ProtectedRoute element={YourProfile} roles={[BUYER_ROLE, USER_ROLE, ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/updateproduct"
            element={<ProtectedRoute element={ProductUpdate} roles={[ADMIN_ROLE, SUPER_ADMIN_ROLE, SELLER_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
        </Routes>
        <Footer />
      </React.Suspense>
    </>
  );
};

export default App;