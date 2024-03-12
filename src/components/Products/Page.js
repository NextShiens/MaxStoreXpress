import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Grid } from '@mui/material';

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

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="card skeleton-card">
                            <Skeleton height={300} />
                            <div className="m-3 mb-0">
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

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="categories-container">
                    <div className="category-box" onClick={() => filterProduct("electronics")}>Electronics</div>
                    <div className="category-box" onClick={() => filterProduct("clothing")}>Clothing</div>
                    <div className="category-box" onClick={() => filterProduct("jewelery")}>Jewelery</div>
                    <div className="category-box" onClick={() => filterProduct("grocery")}>Grocery</div>
                </div>
                <Grid container spacing={4}>
                    {filter.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <div className="card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '5px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '85%', height: '300px' }}>
                                <img src={product.image} className="m-3" style={{ height: "50%", width: "100%", objectFit: "contain", border: '1px solid #ccc', borderRadius: '8px' }} alt={product.title} />
                                <div className="m-3 mb-0" style={{ minHeight: '40px' }}>
                                    <small className="card-title" style={{ display: 'block' }}><strong>{product.title.substring(0, 50)}...</strong></small>
                                </div>
                                <div className="m-3 mb-0" style={{ minHeight: '20px' }}>
                                    <small className="card-title" style={{ display: 'block' }}><strong>${product.price}</strong></small>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Products;
