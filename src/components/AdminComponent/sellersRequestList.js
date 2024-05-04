import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import {Switch } from '@mui/material';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

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
    updateSellerRequest(id: $user_id, status: $status)
  }
`;

const SellerRequests = () => {
  const { loading, error, data } = useQuery(GET_SELLER_REQUESTS);
const [updateSellerRequestStatus] = useMutation(UPDATE_SELLER_REQUEST_STATUS, {
  refetchQueries: [{ query: GET_SELLER_REQUESTS }],
});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

const handleStatusUpdate = async (user_id, status) => {
  const newStatus = status === 'active' ? 'pending' : 'active';
  await updateSellerRequestStatus({ variables: { user_id, status: newStatus } });
};
  return (
    <Box
    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px', padding: '20px' }}
    >
      {data && data.getSellerRequests && data.getSellerRequests.map(({ user_id, user_name, address, user_email, company_name, cnic, request_date, status, country, branch_code, phone_number, bank_name, image_urls }) => (
        <Card size="lg" variant="outlined">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography fontSize="lg" textColor="solid" fontWeight="bold">
              Status
            </Typography>
            <Switch
  checked={status === 'active'}
  onChange={() => handleStatusUpdate(user_id, status)}
  color={status === 'active' ? 'primary' : 'secondary'} 
  inputProps={{ 'aria-label': 'controlled' }}
  style={{ position: 'absolute', top: 0, left: 0 , color: status === 'active' ? 'green' : 'red',}}
/>
          </div>
          <img src={image_urls} alt={user_name} style={{ maxWidth: '100%', maxHeight: '200px', border: '0.5px solid #ccc', borderRadius: '5px', alignSelf: 'center' }} />
          <Typography level="h2">{user_name}</Typography>
          <Divider inset="none" />
          <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))'}}>
            <ListItem>
              <ListItemDecorator style={{ fontSize: '20px', fontWeight: 'bold' }}>
                ID:
              </ListItemDecorator>
              {user_id}
            </ListItem>
            <ListItem>
              <ListItemDecorator style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Email:
              </ListItemDecorator>
              {user_email}
            </ListItem>
            <ListItem>
              <ListItemDecorator style={{ fontSize: '20px', fontWeight: 'bold' }}>
                Company Name:
              </ListItemDecorator>
              {company_name}
            </ListItem>
            <ListItem>
              <ListItemDecorator style={{ fontSize: '20px', fontWeight: 'bold' }}>
                CNIC:
              </ListItemDecorator>
              {cnic}
            </ListItem>
          </List>
          <Divider inset="none" />
          <CardActions>
            {/* <Button
              variant="soft"
              color="neutral"
              onClick={() => handleStatusUpdate(user_id)}
            >
              Set Active
            </Button> */}
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default SellerRequests;