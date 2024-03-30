import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, sidebarImages } from './categories'; // Update import statement
import ReorderIcon from '@mui/icons-material/Reorder';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === sidebarImages.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#232f3e' }}>
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/${category.text.toLowerCase().replace(/\s/g, '-')}`}
            style={{
              textDecoration: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid transparent',
              borderRadius: '5px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = '1px solid white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = '1px solid transparent';
            }}
          >
            {index === 0 && <ReorderIcon style={{ marginRight: '10px' }} />}
            <span>{category.text}</span>
          </Link>
        ))}
      </div>
      <div style={{ position: 'relative', height: '100vh' }}>
        <img
          src={sidebarImages[currentImageIndex]}
          alt="Sidebar"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
      </div>
    </>
  );
};

export default Home;
