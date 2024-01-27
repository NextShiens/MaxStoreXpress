    // UserTable.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from './UserList';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
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

const UserTable = () => {
    const navigate = useNavigate();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const handleNavigateToUpdatePage = (userId) => {
        const user = users.find((user) => user.id === userId);
        navigate(`/update/${userId}`, { state: { user } });
    };
    const handleCreateButtonClick = () => {
        setShowCreateForm(true);
    };
    const handleCloseCreateForm = () => {
        setShowCreateForm(false);
    };
    return (
        <Box >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" color="black" sx={{ textAlign: 'left', m: 2 }}>
                    User List
                </Typography>
                <Button
                    style={{ borderRadius: '5px',color:'black', margin: '10px',border:'1px solid black' }}
                    onClick={handleCreateButtonClick}
                >
                    Create New User
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
                                    <TableCell sx={{ textAlign: "center" }}>{user.id}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.username}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.__typename}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
                                    <TableCell>
                                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={() => handleNavigateToUpdatePage(user.id)}>
                                            <EditNoteIcon />
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

