import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../globalReduxStore/actions';
import { useFetchCartData, useDeleteCartItem, useUpdateCartItem, useClearCart } from '../../globalReduxStore/reducers/cartOperations';
import { useAuth } from 'react-oidc-context';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userID = user?.profile?.sub || null;                      
  const { loading, error, data ,refetch} = useFetchCartData(userID);
  const deleteCartItem = useDeleteCartItem();
  const clearCart = useClearCart();
  const updateCartItem = useUpdateCartItem();
  const cart = useSelector((state) => state.cart.cart);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [ItemLoading, setItemLoading] = useState(false);
  const [deleteSingleItem, setDeleteSingleItem] = useState(false);

  useEffect(() => {
    if (data && data.getCartItems) {
      dispatch(actionCreators.setCart(data.getCartItems.products));
    }
  }, [dispatch, data]);
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (productID) => {
    setDeleteSingleItem(true);
    try {
      await deleteCartItem({
        variables: { userID, productID },
      });
      dispatch(actionCreators.removeFromCart(productID));
    } catch (err) {
      console.error('Error deleting item from cart:', err);
    } finally {
      setDeleteSingleItem(false);
      refetch();
    }
  };

  const handleClearCart = async () => {
    setDeleteLoading(true);
    try {
      await clearCart({
        variables: { userID },
      });
      dispatch(actionCreators.clearCart());
    } catch (err) {
      console.error('Error clearing cart:', err);
    } finally {
      setDeleteLoading(false);
      refetch();
    }
  };

  const handleUpdateQuantity = async (productID, quantity) => {
    if (quantity < 1) return; 
    setItemLoading(true);
    try {
      await updateCartItem({
        variables: { userID, productID, quantity },
      });
      dispatch(actionCreators.updateCart({ userID,productID, quantity }));
      refetch(); 
    } catch (err) {
      console.error('Error updating item quantity:', err);
    } finally {
      setItemLoading(false);
    }
  };

  if (userID === null) {
    return (
      <div className="container mx-auto p-8 relative">
        <div className="flex flex-col items-center justify-center max-h-128 gap-6">
          <div className="grid gap-2 text-center">
            <h2 className="text-2xl font-bold">Please sign in to view your cart</h2>
          </div>
          <button onClick={() => window.location.href = "/login"} className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors">Sign in</button>
        </div>
      </div>
    );
  }

  if (loading) return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40vh'
    }}>
      <CircularProgress color='inherit' size={60} />
    </Box>
  );

  if (error && error.message === 'No cart found for this user') {
    return (
      <div className="container mx-auto p-8 relative">
        <div className="flex flex-col items-center justify-center max-h-128 gap-6">
          <div className="grid gap-2 text-center">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400">Looks like you haven't added any items to your cart yet.</p>
          </div>
          <button variant="contained" onClick={() => window.location.href = "/productsPage"} className=" bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors">Go to Products</button>
        </div>
      </div>
    );
  } else if (error) return <p>Error: {error.message}</p>;

  const proceedToPay = () => {
    // Add functionality for proceeding to payment
  };

  return (
    <div className="container mx-auto lg:p-8 p-3 relative">
      {cart.length === 0 && (
        <div>
          <div className="flex flex-col items-center justify-center max-h-128 gap-6">
            <div className="grid gap-2 text-center">
              <h2 className="text-2xl font-bold">Your cart is empty</h2>
              <p className="text-gray-500 dark:text-gray-400">Looks like you haven't added any items to your cart yet.</p>
            </div>
            <button variant="contained" onClick={() => window.location.href = "/productsPage"} className=" bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors">Go to Products</button>
          </div>
        </div>
      )}
      {cart.length !== 0 &&
        <div className="w-full flex flex-col md:flex-row md:gap-6 gap-2 items-start">
          <div className="w-full md:w-12/12 mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center pb-4 mb-3 border-b">
              <h2 className="text-3xl font-semibold">
                Cart <span className="text-sm text-gray-500">({cart.length}{cart.length === 1 ? " product" : " products"} )</span>
              </h2>
              <Button
                color="error"
                onClick={() => handleClearCart()}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '100px' }}
              >
                {deleteLoading ? (
                  <CircularProgress color="error" size={20} />
                ) : (
                  "clear cart"
                )}
              </Button>
            </div>
            <div className="w-full max-h-128 overflow-y-auto grid gap-8 md:w-12/12">
              {cart.length > 0 && cart.map(({ id, name, price, imageUrl, quantity, description }) => (
                <div key={id} className="w-full max-w-2xl mx-auto">
                  <div className="relative flex flex-col md:flex-row items-start gap-6 rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                    {deleteSingleItem ? <CircularProgress className='absolute top-3 right-3' color="error" size={20} /> :
                      <CloseIcon
                        className="h-8 w-8 rounded-full p-0 absolute top-3 right-3"
                        onClick={() => handleDelete(id)}
                        sx={{
                          color: '#C41E3A',
                          cursor: 'pointer',
                          fontSize: '20px'
                        }}
                      />
                    }
                    <div className="relative h-32 w-32 shrink-0 overflow-hidden border-2 border-slate-800 rounded-xl">
                      <img
                        alt="Product "
                        className="h-full w-full object-cover"
                        height={128}
                        src={imageUrl[0]}
                        style={{
                          aspectRatio: "128/128",
                          objectFit: "cover",
                        }}
                        width={128}
                      />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                      </div>
                      <div className="flex items-center gap-10 w-full mt-4">
                        <div className="flex items-center gap-2">
                          <Button className="h-8 w-8 rounded-full p-0" size="icon" variant="outline">
                            <RemoveIcon
                              className="hover:bg-gray-200"
                              sx={{
                                color: '#4a4a4a',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontSize: '25px'
                              }}
                              onClick={() => handleUpdateQuantity(id, quantity - 1)}
                            />
                          </Button>
                          <span className="text-lg font-semibold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                            {ItemLoading ? <CircularProgress color="inherit" size={20} /> : quantity}
                          </span>
                          <Button className="h-8 w-8 rounded-full p-0" size="icon" variant="outline">
                            <AddIcon
                              sx={{
                                color: '#4a4a4a',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontSize: '25px'
                              }}
                              onClick={() => handleUpdateQuantity(id, quantity + 1)}
                            />
                          </Button>
                        </div>
                        <div className="">
                          <p className="text-lg font-bold">price: {price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-full xl:w-8/12  w-full space-y-4">
            {cart.length > 0 && (
              <div className="flex flex-row justify-center">
                <div className="lg:w-9/12 w-full bg-white rounded-md shadow-md dark:bg-gray-950">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-xl font-bold">Your Cart</h3>
                  </div>
                  <div className="px-6 py-4 space-y-4">
                    <div className="space-y-2">
                      {cart.map(({ name, price, quantity }) => (
                        <div key={name} className="flex items-center justify-between">
                          <div className="font-medium">{name}</div>
                          <div className="text-gray-500">{price * quantity}</div>
                        </div>
                      ))}
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-800" />
                    <div className="flex items-center justify-between font-medium">
                      <div>Total amount</div>
                      <div className='font-bold text-lg'>{data.getCartItems.totalPrice}</div>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t">
                    <button onClick={proceedToPay} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors">
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default Cart;