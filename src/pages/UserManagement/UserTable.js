import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Box,
    Typography,
} from '@mui/material';
import CreateUserForm from './CreateUser';
import { ToastContainer } from 'react-toastify';

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

const DELETE_USER = gql`
  mutation DeleteUser($username: String!) {
    deleteUser(Username: $username)
  }
`;

const UserTable = () => {
    const navigate = useNavigate();
    const [showCreateForm, setShowCreateForm] = useState(false);

    const { loading, error, data, refetch } = useQuery(GET_USERS, {
        variables: {
            page: 1,
            pageSize: 10,
            sortField: 'username',
            sortOrder: 'asc',
        },
    });

    const [deleteUser] = useMutation(DELETE_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const users = data?.getUsers || [];

    const handleNavigateToUpdatePage = (userId) => {
        navigate(`/update/${userId}`, { state: { user: users.find(user => user.id === userId) } });
    };

    const handleCreateButtonClick = () => {
        setShowCreateForm(true);
    };

    const handleCloseCreateForm = () => {
        setShowCreateForm(false);
    };

    const handleDeleteUser = async (Username) => {
        try {
            await deleteUser({ variables: {username:Username} });
            refetch();
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" color="black" sx={{ textAlign: 'left', m: 2 }}>
                    User List
                </Typography>
                <Button
                    style={{ borderRadius: '5px', color: 'black', margin: '10px', border: '1px solid black' }}
                    onClick={handleCreateButtonClick}
                >
                    Create New User <AddCircleOutlineIcon style={{ marginLeft: '10px' }} />
                </Button>
            </Box>
            <Box sx={{ mx: "auto" }} width={'100%'}>
                <TableContainer component={Paper} sx={{ maxHeight: 400, mb: 2 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#F1F1F1" }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#F1F1F1" }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#F1F1F1" }}>Username</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#F1F1F1" }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#F1F1F1" }}>Typename</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#F1F1F1" }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#F1F1F1" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Avatar src={user.imageurl} />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.Attributes[0]?.Value}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.Username}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.Attributes[2]?.Value} {user.Attributes[3]?.Value}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.__typename}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.Attributes[4]?.Value}</TableCell>
                                    <TableCell>
                                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={() => handleNavigateToUpdatePage(user.Username)}>
                                            <EditNoteIcon />
                                        </IconButton>
                                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={() => handleDeleteUser(user.Username)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ToastContainer position="top-right" autoClose={3000} />
            </Box>
            {showCreateForm && (
                <CreateUserForm open={showCreateForm} onClose={handleCloseCreateForm} />
            )}
        </Box>
    );
};

export default UserTable;
