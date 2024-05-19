
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import {Switch } from '@mui/material';
import {Card} from '@mui/material';
import CreateUserForm from '../../pages/UserManagement/CreateUser.js';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useProfile } from '../../auth/profileProvider.js';
import { ToastContainer } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const CREATE_USER_MUTATION = gql`
mutation CreateUser(
$username: String!,
$password: String!,
$email: String!,
$firstName: String!,
$lastName: String!,
$attributes: [AttributeInput!],
$tenantID: String!
) {
createUser(input: {
username: $username,
password: $password,
email: $email,
firstName: $firstName,
lastName: $lastName,
attributes: $attributes,
tenantID: $tenantID
}) {
Username
Attributes {
Name
Value
}
Enabled
UserStatus
}
}`


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
const { user, userPreferences, createLoading, updateLoading, createError } = useProfile();
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [userId, setUserId] = useState('');
const [anchorEl, setAnchorEl] = React.useState(null);
const [password, setPassword] = useState('');
const [attributes, setAttributes] = useState({ phone: '', address: '', dateOfBirth: '', preferredLanguage: '' });
const [tenantID, setTenantID] = useState('');


const [showCreateForm, setShowCreateForm] = useState(false);

const handleOpenCreateForm = () => {
setShowCreateForm(true);
};

const handleCloseCreateForm = () => {
setShowCreateForm(false);
};


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
const handleCreateUser = async (formData) => {
try {
const attributesInput = [
{ Name: "phone", Value:formData.phone },
{ Name: "address", Value: formData.address },
{ Name: "dateOfBirth", Value: formData.dateOfBirth },
{ Name: "preferredLanguage", Value: formData.preferredLanguage }
];

const { data } = await createUser({
variables: {
username:formData.username,
password:formData.password,
email:formData.email,
firstName:formData.firstName,
lastName:formData.lastName,
tenantID:formData.tenantID,
attributes: attributesInput
}
});
console.log(data);
refetch();
} catch (error) {
console.error('Failed to create user:', error);
}
};
const handleDeleteUser = async (Username) => {  
try {
const { data } = await deleteUser({ variables: {id:Username} });
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
console.log(data);
if (error) return `Error! ${error.message}`;

return (
<div>
<Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
<Typography variant="h1" color="black" sx={{ textAlign: 'left', m: 2 ,fontSize:'22px', fontWeight:'bolder'}}>
User List
</Typography>
<Button
style={{ borderRadius: '5px', color: 'black', backgroundColor:'transparent',margin: '10px', border: '1px solid black' }}
onClick={handleOpenCreateForm}
>
Create New User <AddCircleOutlineIcon style={{ marginLeft: '10px'}} />
</Button>
</Box>
{showCreateForm && <CreateUserForm handleCreateUser={handleCreateUser} open={showCreateForm} onClose={handleCloseCreateForm} />}
</Box>
<Box
style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px', padding: '20px' }}
>
{data && data.getUsers && data.getUsers.map(({ Username, firstName, lastName, email, tenantID, Attributes }) => (
<Card size="lg" variant="outlined" sx={{padding:'10px',backgroundColor:'#DCDCDC'}}key={Username}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<Typography fontSize="lg" textColor="solid" fontWeight="bold">
UserName
</Typography>
<Typography fontSize="lg" textColor="primary" fontWeight="bold">
{Username}
</Typography>
</div>
<Divider inset="none" />
<List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))'}}>
<ListItem sx={{display:'flex',alignItems:'center'}}>
<ListItemDecorator style={{ fontSize: '20px', fontWeight: 'bold' }}>
ID:
</ListItemDecorator>
{Attributes && Attributes.find(attr => attr.Name === 'sub')?.Value}
</ListItem>
<ListItem>
<ListItemDecorator style={{ fontSize: '20px', fontWeight: 'bold' }}>
Email:
</ListItemDecorator>
{Attributes && Attributes.find(attr => attr.Name === 'email')?.Value}
</ListItem>
<ListItem>
<ListItemDecorator style={{ fontSize: '20px', fontWeight: 'bold' }}>
First Name:
</ListItemDecorator>
{Attributes && Attributes.find(attr => attr.Name === 'given_name')?.Value}
</ListItem>
<ListItem>
<ListItemDecorator style={{ fontSize: '20px', fontWeight: 'bold' }}>
Last Name:
</ListItemDecorator>
{Attributes && Attributes.find(attr => attr.Name === 'family_name')?.Value}
</ListItem>
</List>
<Divider inset="none" />
<CardActions>
<Button
  style={{ borderRadius: '5px', color: 'black', backgroundColor:'white',margin: '10px', border: '1px solid black' }}
  onClick={() => handleDeleteUser(Username)}
>
  delete
</Button>
</CardActions>
</Card>
))}


</Box>
</div>
);
}

export default UserComponent;