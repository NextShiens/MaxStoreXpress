export const actionTypes = {
    SET_USERS: 'SET_USERS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_TRANSACTIONS: 'SET_TRANSACTIONS',
    SET_REVIEWS: 'SET_REVIEWS',
    SET_ORDERS: 'SET_ORDERS',
    SET_PRODUCT: 'SET_PRODUCT',
    SET_CART: 'SET_CART',
    ADD_TO_CART: 'ADD_TO_CART', 
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_CART: 'UPDATE_CART',
    CLEAR_CART: 'CLEAR_CART',
  };
  
  export const actionCreators = {
    setProduct: (product) => ({
        type: actionTypes.SET_PRODUCT,
        payload: product,
      }),
    setUsers: (users) => ({
      type: actionTypes.SET_USERS,
      payload: users,
    }),
    setProducts: (products) => ({
      type: actionTypes.SET_PRODUCTS,
      payload: products,
    }),
    setTransactions: (transactions) => ({
      type: actionTypes.SET_TRANSACTIONS,
      payload: transactions,
    }),
    setReviews: (reviews) => ({
      type: actionTypes.SET_REVIEWS,
      payload: reviews,
    }),
    setOrders: (orders) => ({
      type: actionTypes.SET_ORDERS,
      payload: orders,
    }),
    setCart: (cart) => ({
      type: actionTypes.SET_CART,
      payload: cart,
    }),
    addToCart: (item) => ({ 
      type: actionTypes.ADD_TO_CART,
      payload: item,
    }),
    removeFromCart: (userID, productID) => ({ 
      type: actionTypes.REMOVE_FROM_CART,
      payload: { userID, productID }, 
    }),
    clearCart: (userID) => ({ 
      type: actionTypes.CLEAR_CART,
      payload: userID, 
    }),
    updateCart: (cart) => ({
      type: actionTypes.UPDATE_CART,
      payload: cart,
    }),

  };
  