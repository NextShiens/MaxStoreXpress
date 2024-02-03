import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
<<<<<<< Updated upstream
import { Button, Grid } from '@mui/material';
=======
import { Button, Card, CardContent, Grid, Typography, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DataProducts from './DataProducts';
>>>>>>> Stashed changes

function Products() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(data);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
<<<<<<< Updated upstream
        let componentMounted = true;
        
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            
            if (componentMounted) {
                const data = await response.json();
                setData(data);
                setFilter(data);
                setLoading(false);
            }
        };

        getProducts();

        return () => {
            componentMounted = false;
        };
=======
>>>>>>> Stashed changes
    }, []);

    const filterProduct = (category) => {
        const updateList = data.filter((x) => x.category === category);
        setFilter(updateList);
    };

<<<<<<< Updated upstream
=======
    const handleMenuOpen = (event, productId) => {
        setAnchorEl(event.currentTarget);
        setSelectedProductId(productId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProductId(null);
    };

    const handleEdit = (productId) => {
        console.log(`Edit product with ID: ${productId}`);
        handleMenuClose();
    };

    const handleDelete = (productId) => {
        const updatedData = data.filter((product) => product.id !== productId);
        setData(updatedData);
        setFilter(updatedData);
        console.log(`Delete product with ID: ${productId}`);
        handleMenuClose();
    };

>>>>>>> Stashed changes
    if (loading) {
        return (
            <div className="container mx-auto p-4 my-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(6)].map((_, index) => (
<<<<<<< Updated upstream
                        <div key={index} className="card">
                            <Skeleton height={300} />
                            <div className="m-3 mb-0">
=======
                        <Card key={index} className="card" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Skeleton height={300} width={'100%'} />
                            <CardContent>
>>>>>>> Stashed changes
                                <Skeleton width={150} />
                            </div>
                            <div className="flex justify-between items-center m-3">
                                <div><Skeleton width={50} /></div>
                                <Skeleton width={50} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

<<<<<<< Updated upstream
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="sticky top-10">
                    <Button variant="outlined" size="small" onClick={() => setFilter(data)}>All</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("women's clothing")}>Women's Clothing</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("men's clothing")}>Men's Clothing</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("jewelery")}>Jewelery</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("electronics")}>Electronics</Button>
                </div>
                <Grid container spacing={4}>
                    {filter.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <div className="card">
                                <img src={product.image} className="m-3" style={{ height: "300px", width: "auto", objectFit: "contain" }} alt={product.title} />
                                <div className="m-3 mb-0">
                                    <small className="card-title">{product.title.substring(0, 50)}...</small>
                                </div>
                                <div className="flex justify-between items-center m-3">
                                    <div><b>${product.price}</b></div>
                                    <NavLink to={`/product/${product.id}`}>
                                        <Button variant="outlined" size="small" className="border-primary">
                                            <i className="fa fa-arrow-right text-muted"> ShowDetails</i>
                                        </Button>
                                    </NavLink>
                                </div>
                            </div>
=======
    const productImages = [
        { src: 'https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg', alt: 'Image 1' },
        { src: 'https://m.media-amazon.com/images/I/519MRhRKGFL._AC_UX575_.jpg', alt: 'Image 2' },
        { src: 'https://m.media-amazon.com/images/I/51+P9uAvb1L._AC_UY695_.jpg', alt: 'Image 3' },
        { src: 'https://m.media-amazon.com/images/I/71oEKkghg-L._AC_UX575_.jpg', alt: 'Image 4' }
    ];

    const imageCarousel = (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={5000}
            centerMode={false}
            className=""
            containerClass="carousel-container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 4,
                    partialVisibilityGutter: 40
                },
                tablet: {
                    breakpoint: { max: 1024, min: 464 },
                    items: 2,
                    partialVisibilityGutter: 30
                },
                mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 1,
                    partialVisibilityGutter: 30
                }
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {productImages.map((image, index) => (
                <div key={index}>
                    <img src={image.src} alt={image.alt} style={{ width: '50%', height: '50%' }} />
                </div>
            ))}
        </Carousel>
    );

    return (
        <div className="container mx-auto p-4 my-8" style={{marginLeft:'20px',marginTop: '20px', marginBottom: '20px',  marginRight: '20px'}}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8" style={{ marginTop: "25px" }}>
                <div className="sticky top-10" >
                    {imageCarousel}
                    <Button variant="outlined" size="small" onClick={() => setFilter(data)} className="mb-2" >All</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("women's clothing")} className="mb-2" >Women's Clothing</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("men's clothing")} className="mb-2" >Men's Clothing</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("jewelry")} className="mb-2" >Jewelry</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("electronics")} className="mb-2" >Electronics</Button>
                </div>
                <Grid container spacing={4}>
                    {DataProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <Card className="card" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={product.img}
                                        className="m-3"
                                        style={{ maxHeight: "100px", width: "auto", objectFit: "contain", borderRadius: '8px 8px 0 0' }}
                                        alt={product.title}
                                    />
                                    <Button
                                        aria-controls={`menu-${product.id}`}
                                        aria-haspopup="true"
                                        onClick={(e) => handleMenuOpen(e, product.id)}
                                        size="small"
                                        style={{ color: 'white', position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id={`menu-${product.id}`}
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl && selectedProductId === product.id)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={() => handleEdit(product.id)}>Edit</MenuItem>
                                        <MenuItem onClick={() => handleDelete(product.id)}>Delete</MenuItem>
                                    </Menu>
                                </div>
                                <CardContent>
                                    <Typography variant="subtitle1" gutterBottom style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {product.title.substring(0, 50)}...
                                    </Typography>
                                    <Typography variant="body1">
                                        <b>${product.price}</b>
                                    </Typography>
                                    <NavLink to={`/product/${product.id}`}>
                                        <Button variant="outlined" size="small" style={{ color: 'black', fontSize: '0.8rem', borderRadius: '0 0 8px 8px' }}>
                                            Show Details
                                        </Button>
                                    </NavLink>
                                </CardContent>
                            </Card>
>>>>>>> Stashed changes
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Products;
