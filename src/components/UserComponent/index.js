import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Skeleton from '@mui/material/Skeleton';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography } from '@mui/material';
import { Grid, Card, CardContent } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAuth } from "react-oidc-context";

const SOME_NAME = gql`query ($helloInput: InputHello) {
  hello3(helloInput: $helloInput)

}`

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!, $firstName: String!, $lastName: String!, $attributes: JSON!, $tenantID: String!) {
    createUser(input: {username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName, attributes: $attributes, tenantID: $tenantID}) {
      Username
      Attributes {
        Name
        Value
      }
      Enabled
      UserStatus
    }
  }
`;


const GET_USERS = gql`
  query GetUsers($page: Int, $pageSize: Int, $sortField: String, $sortOrder: String) {
    getUsers(page: $page, pageSize: $pageSize, sortField: $sortField, sortOrder: $sortOrder) {
      Username
      Attributes {
        Name
        Value
      }
      UserCreateDate
      UserLastModifiedDate
      Enabled
      UserStatus
    }
  }
`;
const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String!, $email: String!, $firstName: String!, $lastName: String!) {
    updateUser(id: $id, input: { username: $username, email: $email, firstName: $firstName, lastName: $lastName }) {
      id
    }
  }
`;
const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;


const UPDATE_USER_ROLES = gql`
  mutation UpdateUserRoles($id: ID!, $roles: [String]!) {
    updateUserRoles(id: $id, roles: $roles)
  }
`;

const UserComponent = () => {
  const { user, isAuthenticated, } = useAuth();
  console.log("user: ", user);
  console.log("isAuthenticated: ", isAuthenticated);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [password, setPassword] = useState('');
  const [attributes, setAttributes] = useState({ phone: '', address: '', dateOfBirth: '', preferredLanguage: '' });
  const [tenantID, setTenantID] = useState('');

  const open = Boolean(anchorEl);
  useEffect(() => {
    if (user && user.signInUserSession) {
      const groups = user.signInUserSession.idToken.payload['cognito:groups'];
      if (groups && groups.includes('SuperAdmin')) {
        console.log('User is a SuperAdmin');
      } else {
        console.log('User is not a SuperAdmin');
      }
    }
  }, [user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { loading:loadingFromSomeName, error:errorFROMSomeNAme } = useQuery(SOME_NAME, {variables: {helloInput: {
    name:"umer farooq",
    address: "lahore"
  }}})
  const [updateUserRoles] = useMutation(UPDATE_USER_ROLES);
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables: {
      page: 1,
      pageSize: 10,
      sortField: 'Username',
      sortOrder: 'asc'
    }
  });
  const [deleteUser] = useMutation(DELETE_USER);

  const [updateUser] = useMutation(UPDATE_USER);

  const handleUpdateUser = async (id) => {
    // Open a dialog and get the new details for the user
    // This is just a placeholder - you'll need to implement this yourself
    // const { username, email, firstName, lastName } = await openUpdateUserDialog();

    try {
      const { data } = await updateUser({ variables: { id, username, email, firstName, lastName } });
      console.log(data);
      refetch();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };
  const handleCreateUser = async () => {
    try {
      const { data } = await createUser({
        variables: {
          username,
          password,
          email,
          firstName,
          lastName,
          tenantID,
          attributes: JSON.stringify(attributes)
        }
      });
      console.log(data);
      refetch();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const { data } = await deleteUser({ variables: { id } });
      console.log(data);
      refetch();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };
  const handleUpdateUserRoles = async (id, roles) => {
    try {
      const { data } = await updateUserRoles({ variables: { id, roles } });
      console.log(data);
      refetch();
    } catch (error) {
      console.error('Failed to update user roles:', error);
    }
  };


  if (loading) {
    return (
      <div className="p-4">
        <Skeleton variant="text" />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </div>
    );
  }
  if (error) return `Error! ${error.message}`;

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">User Management</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" className="mb-2">Create User</Typography>
              <TextField size="small" className="mb-2 w-full" type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
              <TextField size="small" className="mb-2 w-full" type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
              <TextField size="small" className="mb-2 w-full" type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} />
              <TextField size="small" className="mb-2 w-full" type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
              <TextField size="small" className="mb-2 w-full" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              <TextField size="small" className="mb-2 w-full" type="text" placeholder="Phone" onChange={e => setAttributes({ ...attributes, phone: e.target.value })} />
              <TextField size="small" className="mb-2 w-full" type="text" placeholder="Address" onChange={e => setAttributes({ ...attributes, address: e.target.value })} />
              <TextField size="small" className="mb-2 w-full" type="text" placeholder="Date Of Birth" onChange={e => setAttributes({ ...attributes, dateOfBirth: e.target.value })} />
              <TextField size="small" className="mb-2 w-full" type="text" placeholder="Language" onChange={e => setAttributes({ ...attributes, preferredLanguage: e.target.value })} />
              <TextField size="small" className="mb-2 w-full" type="text" placeholder="Tenant ID" onChange={e => setTenantID(e.target.value)} />
              <Button variant="contained" color="success" className="mb-4 w-full" onClick={handleCreateUser}>Create User</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" className="mb-2">Get Users</Typography>
          <TableContainer component={Paper} className="mb-4">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Tenant ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.getUsers.map((user) => (
                  <TableRow key={user.Username}>
                    <TableCell>{user.Username}</TableCell>
                    <TableCell>{user.Attributes.map(attr => `${attr.Name}: ${attr.Value}`).join(', ')}</TableCell>
                    <TableCell>{user.UserCreateDate}</TableCell>
                    <TableCell>{user.UserLastModifiedDate}</TableCell>
                    <TableCell>{user.Enabled.toString()}</TableCell>
                    <TableCell>{user.UserStatus}</TableCell>
                    <TableCell>{user.Attributes.find(attr => attr.Name === 'custom:tenantID')?.Value}</TableCell>
                    <TableCell>
                      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <ArrowDropDownIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() => { handleUpdateUser(user.id); handleClose(); }}
                          sx={{ color: 'blue' }}
                        >
                          Update
                        </MenuItem>
                        <MenuItem
                          onClick={() => { handleDeleteUser(user.id); handleClose(); }}
                          sx={{ color: 'red' }}
                        >
                          Delete
                        </MenuItem>
                        <MenuItem
                          onClick={() => { handleUpdateUserRoles(user.id, ['newRole1', 'newRole2']); handleClose(); }}
                          sx={{ color: 'blue' }}
                        >
                          Update Roles
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserComponent;