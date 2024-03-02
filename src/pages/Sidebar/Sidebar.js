import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import HealthIcon from '@mui/icons-material/HealthAndSafety';
import FashionIcon from '@mui/icons-material/Person';
import BabyIcon from '@mui/icons-material/PregnantWoman';
import HomeIcon from '@mui/icons-material/Home';
import ElectronicsIcon from '@mui/icons-material/Devices';
import AccessoryIcon from '@mui/icons-material/Headset';
import TvIcon from '@mui/icons-material/Tv';
import SportsIcon from '@mui/icons-material/Sports';
import AccessoriesIcon from '@mui/icons-material/ShoppingBag';
import AutomotiveIcon from '@mui/icons-material/DriveEta';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        if (hoveredItem) {
          const response = await axios.get(`http://localhost:4000/sidebar/${hoveredItem}`);
          setSubcategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [hoveredItem]);

  const handleMouseEnter = (key) => {
    setHoveredItem(key);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleCategoryClick = (key) => {
    setActiveCategory(key);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: 350,
            height: 495,
            boxSizing: 'border-box',
            marginTop: '122px',
            marginLeft: '60px',
            borderRadius: '20px',
            border: '1px solid grey',
          },
        }}
      >
        <List sx={{ flex: '1' }}>
          {[
            { text: "Groceries & Pets", icon: <PetsIcon />, key: 'Groceries & Pets' },
            { text: "Health & Beauty", icon: <HealthIcon />, key: 'Health & Beauty' },
            { text: "Men's Fashion", icon: <FashionIcon />, key: "Men's Fashion" },
            { text: "Mother & Baby", icon: <BabyIcon />, key: 'Mother & Baby' },
            { text: "Home & Lifestyle", icon: <HomeIcon />, key: 'Home & Lifestyle' },
            { text: "Electronics Devices", icon: <ElectronicsIcon />, key: 'Electronics Devices' },
            { text: "Electronic Accessories", icon: <AccessoryIcon />, key: 'Electronic Accessories' },
            { text: "TV & Home Appliances", icon: <TvIcon />, key: 'TV & Home Appliances' },
            { text: "Sports & Outdoor", icon: <SportsIcon />, key: 'Sports & Outdoor' },
            { text: "Watches Bags & Jewellery", icon: <AccessoriesIcon />, key: 'Watches Bags & Jewellery' },
            { text: "Automotive & Motorbike", icon: <AutomotiveIcon />, key: 'Automotive & Motorbike' },
          ].map((item) => (
            <Box key={item.key} sx={{ position: 'relative' }}>
              <ListItem
                component={Link}
                to={`/${item.text.toLowerCase().replace(/\s+/g, '-')}`}
                sx={{
                  textDecoration: 'none',
                  color: activeCategory === item.key ? 'grey' : 'inherit',
                  backgroundColor: activeCategory === item.key ? '#f0f0f0' : 'inherit',
                  position: 'relative',
                  paddingBottom: '8px',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                  '&:hover .arrow-icon': {
                    display: hoveredItem === item.key ? 'block' : 'none', 
                  },
                }}
                onMouseEnter={() => handleMouseEnter(item.key)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCategoryClick(item.key)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <Typography variant="body1" sx={{ fontSize: '18px' }}>{item.text}</Typography>
                <Box className="arrow-icon" sx={{ display: 'none', position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}>
                  <ArrowForwardIosIcon />
                </Box>
              </ListItem>
            </Box>
          ))}
        </List>
      </Drawer>
      {hoveredItem && (
        <Box
          component={List}
          sx={{
            position: 'fixed',
            backgroundColor: '#fff',
            border: '1px solid grey',
            borderRadius: '20px',
            padding: '8px',
            marginLeft: '410px',
            width: 250,
            height: 480,
            overflow: 'auto', 
          }}
          onMouseLeave={handleMouseLeave} 
        >
          {subcategories.map((subcategory, subIndex) => (
            <ListItem
              key={subIndex}
              component={Link} 
              to={`/${subcategory.toLowerCase().replace(/\s+/g, '-')}`} 
              sx={{ color: hoveredItem === subcategory ? 'grey' : 'inherit', textDecoration: 'none', '&:hover': { backgroundColor: '#f0f0f0' } }} 
              onMouseEnter={() => handleMouseEnter(subcategory)} 
            >
              <Typography variant="body1">{subcategory}</Typography>
              {hoveredItem === subcategory && ( 
                <Box className="arrow-icon" sx={{ display: 'block', position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}>
                  <ArrowForwardIosIcon />
                </Box>
              )}
            </ListItem>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Sidebar;
