
import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useAuth } from 'react-oidc-context';
import { useAddToCart } from '../../globalReduxStore/reducers/cartOperations';

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      id
      name
      price
      description
      imageUrl
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($cartInput: CartInput!) {
    addToCart(cartInput: $cartInput) {
      products {
        id
        name
        price
        quantity
        imageUrl
        description
      }
      userID
    }
  }
`;

const SingleProductPage = ({ productId }) => {
  const { user } = useAuth();
  const userID = user?.profile?.sub || null;
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: productId },
  });
  const [addToCart] = useMutation(ADD_TO_CART);

  const handleAddToCart = async () => {
    if (userID) {
      try {
        const cartInput = {
          userID,
          productID: productId,
          quantity: 1,
        };
        await addToCart({ variables: { cartInput } });
        // Handle success or show a success message
      } catch (error) {
        // Handle error
        console.error('Error adding to cart:', error);
      }
    } else {
      // Handle case when user is not logged in
      console.error('User must be logged in to add to cart');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, price, description, imageUrl } = data.getProductById;

  return (
    <div>
      <h1>{name}</h1>
      <img src={imageUrl[0]} alt={name} />
      <p>{description}</p>
      <p>Price: ${price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {/* Add "Buy Now" button or functionality if needed */}
    </div>
  );
};

export default SingleProductPage;