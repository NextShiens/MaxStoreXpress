// usertable.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import users from './UserList';
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
    Typography
} from '@mui/material';

const UserTable = () => {
    const navigate = useNavigate();

    const handleNavigateToUpdatePage = (userId) => {
        const user = users.find((user) => user.id === userId);
        navigate(`/update/${userId}`, { state: { user } });
    };

    return (

        <Box mx={2}>
            <Typography variant="h5" color="black"  sx={{ textAlign: "left",  m: 2 }}>
                User List
            </Typography>
            <Box sx={{ mx: "auto" }} width={1300}>
                <TableContainer component={Paper} sx={{ maxHeight: 400, mb: 2 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow >
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
                            {users.map((user) =>
                                <TableRow key={user.id}>
                                    <TableCell >
                                        <Avatar src={user.imageurl} />
                                    </TableCell>     
                                    <TableCell sx={{ textAlign: "center" }}>{user.id}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.username}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.__typename}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
                                    
                                    <TableCell  >
                                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={() => handleNavigateToUpdatePage(user.id)}>
                                            <EditNoteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default UserTable;
