import { actionTypes } from '../actions';

const initialProductState = {
  products: [],
};

const productReducer = (state = initialProductState, action) => { 
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
      
      case actionTypes.CREATE_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
      case actionTypes.UPDATE_PRODUCT:
        return {
          ...state,
          products: action.payload,
        };
      case actionTypes.DELETE_PRODUCT:
        return {
          ...state,
          products: action.payload,
        };
        case actionTypes.UPDATE_PRODUCT_STATUS:
          return {
            ...state,
            products: action.payload,
          };
    default:
      return state;
  }
}

export default productReducer;