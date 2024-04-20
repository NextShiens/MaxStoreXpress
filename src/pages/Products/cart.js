import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useAuth } from 'react-oidc-context';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

const GET_CART = gql`
  query getCartItems($userID: ID!) {
    getCartItems(userID: $userID) {
      products {
          id
        name
        price
        quantity
        imageUrl
      }
      userID
      totalPrice
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteFromCart($userID: ID!, $productID: ID!) {
    deleteFromCart(userID: $userID, productID: $productID) {
      userID
      products {
        id
      }
    }
  }
`;
const UPDATE_ITEM = gql`
  mutation updateCartItem($userID: ID!, $productID: ID!, $quantity: Int!) {
    updateCartItem(userID: $userID, productID: $productID, quantity: $quantity) {
      userID
      products {
        id

      }
    }
  }
`;

const Cart = () => {
  const { user } = useAuth();
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    variables: { userID: user.profile.sub },
  });
  const [deleteItem] = useMutation(DELETE_ITEM);
  const [updateItem] = useMutation(UPDATE_ITEM);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleDelete = async (productID) => {
    try {
      await deleteItem({ variables: { userID: user.profile.sub, productID } });
      refetch();
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  const handleUpdate = async (productID, quantity) => {
    try {
      quantity = parseInt(quantity);
      await updateItem({ variables: { userID: user.profile.sub, productID, quantity } });
      refetch();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const proceedToPay = () => {
    // Add functionality for proceeding to payment
  };

  return (
    <div className="container mx-auto p-8 relative">
      <div className="absolute top-0 left-0 right-0 z-50">
        {showAlert && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="mb-4">
            Item removed successfully
          </Alert>
        )}
      </div>
      <h2 className="text-3xl font-bold mb-8">Your Cart</h2>
      {data?.getCartItems?.products.length === 0 && (
        <div>
          <p className='text-xl mb-8 align-middle'>Your cart is empty</p>
          <Button variant="contained" onClick={() => window.location.href = "/productsPage"}>Go to Products</Button>
        </div>

      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.getCartItems?.products.map(({ id, name, price, quantity, imageUrl }) => (
          <div key={id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <img className="w-full h-48 object-cover" src={imageUrl[0]} alt={name} />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{name}</h3>
              <p className="text-gray-700 text-lg mb-2">Price: {price}</p>
              <p className="text-gray-700 text-lg mb-2">Quantity: {quantity}</p>
            
              <div className='flex flex-row gap-2'>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(id)}
                sx={{display:'inline-block'}}
              >
                Remove
              </Button>
                <TextField 
                id="filled-basic" 
                 type="number" 
                 variant="filled"
                 sx={{width: '70px',height:'70%',display :'inline-block'}}
                 defaultValue={quantity || 1}
                  onChange={(e) => quantity = e.target.value}
                 inputProps={{ min: 1 }}
                  />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdate(id, quantity)}
                sx={{display:'inline-block'}}
              >
                Update
              </Button>
              </div>
            </div>
          </div>
        ))}

      </div>

      {data?.getCartItems?.products.length > 0 && (
        
      
        <div className="mt-8 flex flex-col items-center justify-center">
        
          <div className="border border-gray-300 rounded-lg p-2 mb-4 w-64 shadow-md">
          
              <p className="text-gray-700 text-xl text-center font-bold mb-2">
                Total Amount: {data?.getCartItems?.totalPrice} /-
              </p>
           
          </div>
      
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={proceedToPay}
          >
            Proceed to Pay
          </Button>
        </div>
     
      
      )}
    </div>
  );
};

export default Cart;
