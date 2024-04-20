import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useAuth } from 'react-oidc-context';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
const GET_PRODUCTS = gql`
query GetProducts {
  getProducts {
    id
    name
    brand
    price
    stock
    imageUrl
  }
}
`;
const ADD_TO_CART = gql`
  mutation addToCart($cartInput: CartInput!) {
    addToCart(cartInput: $cartInput) {
      products {
        id
        name
        price
        quantity
        imageUrl
      }
      userID
    }
  }
`;

const Products = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [addToCart] = useMutation(ADD_TO_CART);
  const [showAlert, setShowAlert] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (data) {
      setCartItems(data.getProducts);
    }
    const timer = setTimeout(() => {
      setErrorMessage(null)
    }, 1500);
    const timerForAlert = setTimeout(() => {
      setShowAlert(false);
    }, 1500);
    return () => 
    clearTimeout(timerForAlert)
    clearTimeout(timer);
  
  }, [data, errorMessage,showAlert]);

  

  const handleAddToCart = async (product) => {
    setShowAlert(true);
    const { id, name, price, imageUrl } = product;
  
    try {
      await addToCart({ 
        variables: { 
          cartInput: { 
            products: [{ id, name, price, imageUrl, quantity: 1 }],
            userID: user.profile.sub 
          }
        } 
      });
    } catch (error) {
      if (error.message === 'Product already exists in cart') {
        setErrorMessage('Product already exists in cart');
      } else {
        setErrorMessage('An error occurred',error.message);
      }
    }
  };
  


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-8">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
       
        {showAlert && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="mb-4">
            Item added to cart 
          </Alert>
        )}
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.getProducts.map((product) => (
          <div key={product.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-700 text-lg mb-2">Brand: {product.brand}</p>
              <p className="text-gray-700 text-lg mb-2">Price: ${product.price}</p>
              <p className="text-gray-700 text-lg mb-2">Stock: {product.stock}</p>
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
