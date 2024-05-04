
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
        cart: action.payload,
      };

    case actionTypes.UPDATE_CART:

      return {
        ...state,
        cart: action.payload,
      };
      case actionTypes.CLEAR_CART:
        return {
          ...state,
          cart: action.payload,
        };
    default:
      return state;
  }
};

export default cartReducer;