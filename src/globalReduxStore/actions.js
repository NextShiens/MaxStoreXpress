export const actionTypes = {
    SET_USERS: 'SET_USERS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_TRANSACTIONS: 'SET_TRANSACTIONS',
    SET_REVIEWS: 'SET_REVIEWS',
    SET_ORDERS: 'SET_ORDERS',
    SET_PRODUCT: 'SET_PRODUCT',
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
  };
  