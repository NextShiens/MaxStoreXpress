import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';

function Products() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(data);

    useEffect(() => {
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
    }, []);

    const filterProduct = (category) => {
        const updateList = data.filter((x) => x.category === category);
        setFilter(updateList);
    };

    const handleEdit = (productId) => {
        console.log(`Edit product with ID: ${productId}`);
    };

    const handleDelete = (productId) => {
        console.log(`Delete product with ID: ${productId}`);
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <Card key={index} className="card">
                            <Skeleton height={300} />
                            <CardContent>
                                <Skeleton width={150} />
                                <Skeleton width={50} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="sticky top-10">
                    <Button variant="outlined" size="small" onClick={() => setFilter(data)}>All</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("women's clothing")}>Women's Clothing</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("men's clothing")}>Men's Clothing</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("jewelry")}>Jewelry</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("electronics")}>Electronics</Button>
                </div>
                <Grid container spacing={4}>
                    {filter.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <Card className="card" style={{ backgroundColor: '#001f3f', color: 'white' }}>
                                <img
                                    src={product.image}
                                    className="m-3"
                                    style={{ maxHeight: "200px", width: "auto", objectFit: "contain" }}
                                    alt={product.title}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {product.title.substring(0, 50)}...
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <b>${product.price}</b>
                                    </Typography>
                                    <div className="flex justify-between items-center mt-3">
                                        <NavLink to={`/product/${product.id}`}>
                                            <Button variant="outlined" size="small" style={{ backgroundColor: 'green', color: 'white' }}>
                                                <i className="fa fa-arrow-right text-muted"> Show Details</i>
                                            </Button>
                                        </NavLink>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            style={{ backgroundColor: 'yellow', color: 'black' }}
                                            onClick={() => handleEdit(product.id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            style={{ backgroundColor: 'red', color: 'white' }}
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Products;
