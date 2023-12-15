// ProductsListSection.js
import React from 'react';

const ProductsListSection = () => {
  return (
    <div className="p-6 border rounded-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Explore Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Display a list of products */}
        <div className="border p-4 rounded-md text-center">
          <img src="product-image.jpg" alt="Product" className="max-w-full h-auto mb-2 rounded-md" />
          <h3 className="text-lg font-semibold mb-1">Product Name</h3>
          <p className="text-gray-600 mb-2">Description of the product goes here.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add to Cart</button>
        </div>
        {/* Repeat similar structure for other products */}
      </div>
    </div>
  );
};

export default ProductsListSection;
