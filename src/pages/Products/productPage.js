import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'react-oidc-context';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAddToCart} from '../../globalReduxStore/reducers/cartOperations';
import { actionCreators } from '../../globalReduxStore/actions';
const { addToCart } = actionCreators;
const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      brand
      price
      stock
      imageUrl
      description
    }
  }
`;

const Products = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const addToCartItem = useAddToCart();
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    const timerForAlert = setTimeout(() => {
      setShowAlert(false);
    }, 1500);
    return () => clearTimeout(timerForAlert);
  }, [showAlert]);

  const handleAddToCart = async (product) => {
    const { id, name, price, imageUrl, description } = product;
  
      try {
      await addToCartItem({
          variables: {
            cartInput: {
              products: [{ id, name, price, imageUrl, quantity: 1, description }],
              userID: user?.profile?.sub
            }
          }
        });
        dispatch(addToCart(product));
        setShowAlert(true);
      } catch (error) {
        setErrorMessage('An error occurred: ' + error.message);
      
    };
  };

  if (loading) return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh' 
    }}>
      <CircularProgress color='inherit' size={60}/>
    </Box>
  );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
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
      </div>

      <section className="flex w-full flex-wrap justify-center gap-6 px-3 md:px-6 py-4">
        {data.getProducts.map((product) => (
          <div key={product.id} className="bg-white w-72 border-2 border-slate-200 rounded-lg shadow-md overflow-hidden dark:bg-gray-950">
            <div className="relative">
              <img
                alt={product.name}
                className="w-full h-64 object-cover"
                height={400}
                src={product.imageUrl}
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{product.brand}</p>
                </div>
                <p className="text-lg font-bold">{product.price}</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">{product.description}</p>
              <button onClick={() => handleAddToCart(product)} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Products;