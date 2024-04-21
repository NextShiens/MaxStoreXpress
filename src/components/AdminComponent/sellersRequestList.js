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
      address
      country
      branch_code
      phone_number
      bank_name
      cnic
      status
      request_date
      image_urls
    }
  }
`;

const UPDATE_SELLER_REQUEST_STATUS = gql`
  mutation UpdateSellerRequestStatus($user_id: ID!, $status: String!) {
    updateSellerRequest(user_id: $user_id, status: $status)
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
  data.getSellerRequests.map(({ user_id, user_name,address, user_email, company_name, cnic, request_date, status,country,branch_code,phone_number,bank_name,image_urls}) => (
     <div key={user_id}>
      <p>{`User ID: ${user_id}`}</p>
      <p>{`User Name: ${user_name}`}</p>
      <p>{`Company Name: ${company_name}`}</p>
      <p>{`CNIC: ${cnic}`}</p>
      <p>{`Address: ${address}`}</p>
      <p>{`Country: ${country}`}</p>
      <p>{`Branch Code: ${branch_code}`}</p>
      <p>{`Phone Number: ${phone_number}`}</p>
      <p>{`Bank Name: ${bank_name}`}</p>
      <p>{`Email: ${user_email}`}</p>
      <p>{`Image URLs: ${image_urls}`}</p>
      <p>{`Request Date: ${new Date(request_date).toLocaleDateString()}`}</p>
      <p>{`Status: ${status}`}</p>
      <Button onClick={() => handleStatusUpdate(user_id)} variant="contained" color="primary">Set Active</Button>
      <hr />
    </div>
  ))
);
};

export default SellerRequests;