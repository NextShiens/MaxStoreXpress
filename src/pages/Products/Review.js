import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Menu, MenuItem } from '@mui/material';

import { users } from '../UserManagement/UserList';

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Avatar,
} from '@mui/material';


function Review() {
    const [rating, setRating] = useState(0);
    const [total, setTotal] = useState(0);
    const [initialized, setInitialized] = useState(false);
    const [newPercentage, setNewPercentage] = useState(0);
    const [regularPercentage, setRegularPercentage] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [users, setUsers] = useState([]);
    
    
    useEffect(() => {
        fetch("http://localhost:4000/review")
            .then((response) => response.json())
            .then((data) => {
                console.log('User data:', data);
                setUsers(data);
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);
    
      



    const getCurrentDateTime = () => {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const dateTimeString = currentDate.toLocaleDateString('en-US', options);
        const [datePart, timePart] = dateTimeString.split(', ');
        const formattedTime = timePart.replace('at', '').trim();
        return `${datePart}, ${formattedTime}`;
    };

    useEffect(() => {
        if (!initialized) {
            setRating(0);
            setTotal(0);
            setNewPercentage(0);
            setRegularPercentage(0);
            setInitialized(true);
        }

        const ratingInterval = setInterval(() => {
            if (rating < 4) {
                setRating(prevRating => prevRating + 1);
            } else {
                clearInterval(ratingInterval);
            }
        }, []);

        const totalInterval = setInterval(() => {
            if (total < 348) {
                setTotal(prevTotal => prevTotal + 1);
            }
        }, []);

        const newPercentageInterval = setInterval(() => {
            if (newPercentage < 25) {
                setNewPercentage(prevPercentage => prevPercentage + 1);
            } else {
                clearInterval(newPercentageInterval);
            }
        }, []);

        const regularPercentageInterval = setInterval(() => {
            if (regularPercentage < 75) {
                setRegularPercentage(prevPercentage => prevPercentage + 1);
            } else {
                clearInterval(regularPercentageInterval);
            }
        }, []);

        return () => {
            clearInterval(ratingInterval);
            clearInterval(totalInterval);
            clearInterval(newPercentageInterval);
            clearInterval(regularPercentageInterval);
        };
    }, [rating, total, newPercentage, regularPercentage, initialized]);

    const handleMenuToggle = (event) => {
        if (anchorEl) {
            setAnchorEl(null);
            setMenuOpen(false);
        } else {
            setAnchorEl(event.currentTarget);
            setMenuOpen(true);
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuOpen(false);
    };

    return (
        <Box style={{ backgroundColor: '#F1F1F1' }}>
            <Box style={{ backgroundColor: '#fff', padding: '10px', margin: '10px', marginTop: '30px', display: 'flex', justifyContent: 'space-between', }}>
                <Typography variant="h6" style={{ marginLeft: '20px', marginTop: '10px', fontWeight: 'bold', fontStyle: 'italic', padding: '10px' }}>Reviews</Typography>
                <Typography variant="body1" style={{ marginRight: '20px', backgroundColor: '#F9F9F9', padding: '10px', borderRadius: '5px', border: '1px solid #E2E1E1' }}>{getCurrentDateTime()}</Typography>
            </Box>
            <Box style={{ display: 'flex', margin: '10px', justifyContent: 'space-between', marginTop: '30px', }}>
                <Box style={{ paddingTop: '20px', backgroundColor: '#fff', width: '250px', borderRadius: '5px', }}>
                    <Stack spacing={1} style={{ margin: '10px', alignItems: 'center' }}>
                        <Rating
                            name="customized-empty"
                            value={rating}
                            readOnly
                        />
                    </Stack>
                    <h1 style={{ textAlign: 'center' }}>{rating}</h1>
                    <h3 style={{ textAlign: 'center' }}>Review Rates</h3>
                </Box>
                <Box style={{ paddingTop: '20px', backgroundColor: '#fff', width: '250px', borderRadius: '10px', }}>
                    <GroupIcon style={{ color: 'green', fontSize: '60px', marginLeft: '100px' }} />
                    <h1 style={{ textAlign: 'center' }}>{total}</h1>
                    <h3 style={{ textAlign: 'center' }}>Total</h3>
                </Box>
                <Box style={{ paddingTop: '20px', backgroundColor: '#fff', width: '250px', borderRadius: '10px', }}>
                    <GroupAddIcon style={{ color: 'blue', fontSize: '60px', marginLeft: '100px' }} />
                    <h1 style={{ textAlign: 'center' }}>{newPercentage}%</h1>
                    <h3 style={{ textAlign: 'center' }}>New</h3>
                </Box>
                <Box style={{ paddingTop: '20px', backgroundColor: '#fff', width: '250px', borderRadius: '10px', }}>
                    <Diversity1Icon style={{ color: 'purple', fontSize: '60px', marginLeft: '100px' }} />
                    <h1 style={{ textAlign: 'center' }}>{regularPercentage}%</h1>
                    <h3 style={{ textAlign: 'center' }}>Regular</h3>
                </Box>
                <Box style={{ height: 'auto', backgroundColor: '#fff', width: '450px', borderRadius: '10px', }}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ fontSize: '20px', marginLeft: '10px', display: 'flex' }}>5<StarBorderIcon style={{ color: 'black' }} /></p>
                        <div style={{ backgroundColor: '#F1F1F1', width: '100%', height: '20px', marginLeft: '20px', borderRadius: '10px' }}>
                            <div style={{ width: '31%', height: '100%', backgroundColor: '#FFD700', borderRadius: '10px' }}></div>
                        </div>
                        <h2 style={{ fontSize: '20px', marginLeft: '20px', marginRight: '10px' }}>31%</h2>
                    </Box>
                    <Box style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
                        <p style={{ fontSize: '20px', marginLeft: '10px', display: 'flex' }}>5<StarBorderIcon style={{ color: 'black' }} /></p>
                        <div style={{ backgroundColor: '#F1F1F1', width: '100%', height: '20px', marginLeft: '20px', borderRadius: '10px' }}>
                            <div style={{ width: '43%', height: '100%', backgroundColor: '#FFD700', borderRadius: '10px' }}></div>
                        </div>
                        <h2 style={{ fontSize: '20px', marginLeft: '20px', marginRight: '10px' }}>43%</h2>
                    </Box>
                    <Box style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
                        <p style={{ fontSize: '20px', marginLeft: '10px', display: 'flex' }}>5<StarBorderIcon style={{ color: 'black' }} /></p>
                        <div style={{ backgroundColor: '#F1F1F1', width: '100%', height: '20px', marginLeft: '20px', borderRadius: '10px' }}>
                            <div style={{ width: '19%', height: '100%', backgroundColor: '#FFD700', borderRadius: '10px' }}></div>
                        </div>
                        <h2 style={{ fontSize: '20px', marginLeft: '20px', marginRight: '10px' }}>19%</h2>
                    </Box>
                    <Box style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
                        <p style={{ fontSize: '20px', marginLeft: '10px', display: 'flex' }}>5<StarBorderIcon style={{ color: 'black' }} /></p>
                        <div style={{ backgroundColor: '#F1F1F1', width: '100%', height: '20px', marginLeft: '20px', borderRadius: '10px' }}>
                            <div style={{ width: '0%', height: '100%', backgroundColor: '#FFD700', borderRadius: '10px' }}></div>
                        </div>
                        <h2 style={{ fontSize: '20px', marginLeft: '30px', marginRight: '10px' }}>0%</h2>
                    </Box>
                    <Box style={{ display: 'flex', alignItems: 'center', marginTop: '-20px' }}>
                        <p style={{ fontSize: '20px', marginLeft: '10px', display: 'flex' }}>5<StarBorderIcon style={{ color: 'black' }} /></p>
                        <div style={{ backgroundColor: '#F1F1F1', width: '100%', height: '20px', marginLeft: '20px', borderRadius: '10px' }}>
                            <div style={{ width: '7%', height: '100%', backgroundColor: '#FFD700', borderRadius: '10px' }}></div>
                        </div>
                        <h2 style={{ fontSize: '20px', marginLeft: '30px', marginRight: '10px' }}>7%</h2>
                    </Box>
                </Box>
            </Box>
            <Box style={{ backgroundColor: '#fff', padding: '10px', margin: '10px', marginTop: '30px', color: 'black', textAlign: 'left', display: 'flex', justifyContent: 'space-between', fontFamily: 'Your-Font-Family-Here' }}>
                <Typography variant="h6" style={{ marginLeft: '20px', marginTop: '10px', fontWeight: 'bold', fontStyle: 'italic', padding: '10px' }}>Latest Accepted Reviews</Typography>
                <Typography
                    variant="h6"
                    style={{
                        marginRight: '50px',
                        marginTop: '10px',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        padding: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={handleMenuToggle}
                >
                    {menuOpen ? "Recent" : "Recent"} {menuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Recent</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Oldest</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Highest Rating</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Lowest Rating</MenuItem>
                </Menu>
            </Box>
            <hr style={{ width: '98%', marginRight: '20px', color: 'yellow', marginTop: '-10px' }} />
            <Box style={{ margin: '10px' }} >
                <Table stickyHeader style={{ background: '#fff', marginTop: '-12px' }}>

                    <TableBody >
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

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}

export default Review;
