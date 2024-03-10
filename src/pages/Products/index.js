import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useAuth } from 'react-oidc-context';

const GET_PRODUCTS = gql`
  query GetProducts($filter: ProductFilterInput, $limit: Int, $skip: Int) {
    getProducts(filter: $filter, limit: $limit, skip: $skip) {
      id
      name
      price
      description
      tenantID
    }
  }
`;

const Products = () => {
  const { user, isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
    }
  }, [user, isAuthenticated]);
  const tenantID = user?.profile['custom:tenatID'];
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { 
      filter:{
        tenantID: tenantID 
      },
      limit: 10, skip: (page - 1) * 10, tenantID }, 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.getProducts.map(({ id, name, price, description }) => (
        <div key={id}>
          <h2>{name}</h2>
          <p>{description}</p>
          <p>{price}</p>
        </div>
      ))}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous Page
      </button>
      <button onClick={() => setPage(page + 1)}>
        Next Page
      </button>
    </div>
  );
};

export default Products;