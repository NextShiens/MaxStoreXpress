import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import { useMutation, gql } from '@apollo/client';
import 'tailwindcss/tailwind.css';
import { useKeycloak } from '@react-keycloak/web';
import Skeleton from '@material-ui/lab/Skeleton';
const CREATE_SELLER_REQUEST = gql`
 mutation CreateSellerRequest(
  $user_id: ID!,
  $user_name: String!,
  $user_email: String!,
  $company_name: String!,
  $cnic: String!,
  $request_date: String!
) {
  createSellerRequest(
    input: {
      user_id: $user_id,
      user_name: $user_name,
      user_email: $user_email,
      company_name: $company_name,
      cnic: $cnic,
      request_date: $request_date
    }
  )
}


`;

const SellerAccessRequestForm = () => {
  const [formState, setFormState] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    companyName: '',
    cnic: '',
  });
  const { keycloak, initialized } = useKeycloak();
  const [createSellerRequest, { loading }] = useMutation(CREATE_SELLER_REQUEST);

  useEffect(() => {
    if (initialized) {
      setFormState((prevState) => ({
        ...prevState,
        userId: keycloak.tokenParsed.sub,
      }));
    }
  }, [initialized, keycloak]);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { userId, userName, userEmail, companyName, cnic } = formState;
    const requestDate = new Date().toISOString(); 
    if (userId && userName && userEmail && companyName && cnic && requestDate) {
      const response = await createSellerRequest({ 
        variables: { 
          user_id: userId,
          user_name: userName,
          user_email: userEmail,
          company_name: companyName,
          cnic: cnic,
          request_date: requestDate
        } 
      });
      console.log(response);
    } else {
      console.error('All required variables are not provided.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loading ? (
        <Box>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Box>
      ) : (
        <>
          <TextField name="userId" label="User ID" value={formState.userId} onChange={handleChange} fullWidth />
          <TextField name="userName" label="User Name" value={formState.userName} onChange={handleChange} fullWidth />
          <TextField name="userEmail" label="User Email" value={formState.userEmail} onChange={handleChange} fullWidth />
          <TextField name="companyName" label="Company Name" value={formState.companyName} onChange={handleChange} fullWidth />
          <TextField name="cnic" label="CNIC" value={formState.cnic} onChange={handleChange} fullWidth />
          <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
        </>
      )}
    </form>
  );
};

export default SellerAccessRequestForm;