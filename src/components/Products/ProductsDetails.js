// // ProductDetails.js
// import React from 'react';
// import { useParams } from 'react-router-dom';

// function ProductDetails({ data }) {
//   const { productId } = useParams();
//   const product = data.find((item) => item.id === parseInt(productId));

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="product-details">
//       <h2>{product.title}</h2>
//       <img src={product.image} alt={product.title} />
//       <p>{product.description}</p>
//       <p>Price: ${product.price}</p>
//       {/* Add more details as needed */}
//     </div>
//   );
// }

// export default ProductDetails;
