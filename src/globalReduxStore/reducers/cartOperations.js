import { gql, useQuery, useMutation } from '@apollo/client';

const GET_CART = gql`
  query getCartItems($userID: ID!) {
    getCartItems(userID: $userID) {
      products {
        id
        name
        price
        quantity
        imageUrl
        description
        discount
      }
      userID
      totalPrice
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
        description
        discount
      }
      userID
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
const CLEAR_CART = gql`
  mutation clearCart($userID: ID!) {
    clearCart(userID: $userID) {
      userID
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation updateCartItem($userID: ID!, $productID: ID!, $quantity: Int!) {
    updateCartItem(userID: $userID, productID: $productID, quantity: $quantity) {
      userID
      products {
        id
        quantity
      }
    }
  }
`;

export const useFetchCartData = (userID) => {
  const { data, loading, error, refetch } = useQuery(GET_CART, {
    variables: { userID },
    skip: !userID, 
  });

  return { data, loading, error, refetch };
};
export const useAddToCart = () => {
  const [addToCartItem] = useMutation(ADD_TO_CART);

  return addToCartItem;
};
export const useDeleteCartItem = () => {
  const [deleteCartItem] = useMutation(DELETE_ITEM);

  return deleteCartItem;
};
export const useClearCart = () => {
  const [clearCart] = useMutation(CLEAR_CART);

  return clearCart;
};
export const useUpdateCartItem = () => {
  const [updateCartItem] = useMutation(UPDATE_ITEM);

  return updateCartItem;
};