// import * as React from 'react';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { Link as RouterLink } from 'react-router-dom';

// const Sidebar = ({ isOpen, onClose }) => {
//   const navLinks = [
//     { text: 'Home', to: '/' },
//     { text: 'Products', to: '/products' },
//     { text: 'About Us', to: '/about' },
//     { text: 'Contact Us', to: '/contact' },
//     { text: 'Services', to: '/services' },
//     { text: 'Gallery', to: '/gallery' },
//   ];

//   return (
//     <Drawer anchor="left" open={isOpen} onClose={onClose}>
//       <List>
//         {navLinks.map((link, index) => (
//           <React.Fragment key={index}>
//             <ListItem 
//               button 
//               component={RouterLink} 
//               to={link.to} 
//               onClick={onClose}
//             >
//               <ListItemText primary={link.text} />
//             </ListItem>
//             {index < navLinks.length - 1 && <Divider />}
//           </React.Fragment>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// const Navbar = () => {
//   const [drawerOpen, setDrawerOpen] = React.useState(false);

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setDrawerOpen(open);
//   };

//   return (
//     <>
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           <IconButton 
//             edge="start" 
//             color="inherit" 
//             aria-label="menu" 
//             sx={{ mr: 2 }}
//             onClick={toggleDrawer(true)}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Typography 
//             variant="h6" 
//             component={RouterLink} 
//             to="/"
//             color="inherit"
//             sx={{ flexGrow: 1 }}
//           >
//             Your Logo
//           </Typography>

//           <TextField
//             label="Search"
//             variant="outlined"
//             size="medium"
//             sx={{ width: '300px', mr: 2 }}
//           />

//           <Button 
//             component={RouterLink} 
//             to="/login" 
//             color="inherit" 
//             variant="outlined"
//           >
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Sidebar isOpen={drawerOpen} onClose={toggleDrawer(false)} />
//     </>
//   );
// };

// export default Sidebar;
