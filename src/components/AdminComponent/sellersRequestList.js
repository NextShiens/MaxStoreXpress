import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button, Box } from '@material-ui/core';

const GET_SELLER_REQUESTS = gql`
  query GetSellerRequests {
    getSellerRequests {
      user_id
      user_name
      user_email
      company_name
      cnic
      request_date
      status
    }
  }
`;

const UPDATE_SELLER_REQUEST_STATUS = gql`
  mutation UpdateSellerRequestStatus($user_id: ID!, $status: String!) {
    updateSellerRequestStatus(user_id: $user_id, status: $status)
  }
`;

const SellerRequests = () => {
  const { loading, error, data } = useQuery(GET_SELLER_REQUESTS);
  const [updateSellerRequestStatus] = useMutation(UPDATE_SELLER_REQUEST_STATUS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleStatusUpdate = async (user_id) => {
    await updateSellerRequestStatus({ variables: { user_id, status: 'active' } });
  };

return (
  data &&
  data.getSellerRequests &&
  data.getSellerRequests.map(({ user_id, user_name, user_email, company_name, cnic_name, request_date, status }) => (
     <div key={user_id}>
      <p>{`User ID: ${user_id}`}</p>
      <p>{`User Name: ${user_name}`}</p>
      <p>{`User Email: ${user_email}`}</p>
      <p>{`Company Name: ${company_name}`}</p>
      <p>{`CNIC: ${cnic_name}`}</p>
      <p>{`Request Date: ${new Date(request_date).toLocaleDateString()}`}</p>
      <p>{`Status: ${status}`}</p>
      <Button onClick={() => handleStatusUpdate(user_id)} variant="contained" color="primary">Set Active</Button>
      <hr />
    </div>
  ))
);
};

export default SellerRequests;