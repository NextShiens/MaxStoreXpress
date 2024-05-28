import { actionTypes } from '../actions';

const initialCartState = {
  cart: [],
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case actionTypes.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    case actionTypes.UPDATE_CART:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
