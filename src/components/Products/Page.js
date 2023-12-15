// Products/Page.js
import React from 'react';
import ProductsListSection from '../../components/Products/ProductsListSection';
import EcommerceProductsListSection from '../../components/Products/EcommerceProductsListSection';

const ProductsPage = () => {
  return (
    <div>
      <ProductsListSection />
      <EcommerceProductsListSection />
      {/* Add other sections as needed */}
    </div>
  );
};

export default ProductsPage;
