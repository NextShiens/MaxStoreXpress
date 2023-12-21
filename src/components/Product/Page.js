import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            setProduct(data);
            setLoading(false);
        };
        getProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="container px-0 mb-5" style={{ marginTop: "66px" }}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <NavLink className="text-decoration-none text-dark" to={`/`}>
                            <div className="d-flex align-items-center m-3">
                                <Skeleton height={20} width={50} />
                            </div>
                        </NavLink>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="images p-3">
                                    <div className="text-center p-4">
                                        <Skeleton height={300} width={250} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="border p-4">
                                    <div className="mt-4 mb-3">
                                        <span className="text-muted text-capitalize">
                                            <Skeleton height={30} width={150} />
                                        </span>
                                        <h5 className="text-uppercase">
                                            <Skeleton height={30} width={200} />
                                        </h5>
                                        <Skeleton height={20} width={70} />
                                        <Skeleton height={30} width={100} />
                                    </div>
                                    <p className="about">
                                        <Skeleton height={10} width={300} />
                                        <Skeleton height={10} width={300} />
                                        <Skeleton height={10} width={300} />
                                        <Skeleton height={10} width={300} />
                                    </p>
                                    <div className="cart mt-4 align-items-center">
                                        <Skeleton height={40} width={150} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container px-0 mb-5" style={{ marginTop: "66px" }}>
            <NavLink className="text-decoration-none text-dark" to={`/products`}>
                <div className="d-flex align-items-center m-3">
                    <i className="fa fa-long-arrow-left"></i>
                    <Button variant="contained" className="ml-1">&nbsp;Back</Button>
                </div>
            </NavLink>
            <div className="row">
                <div className="col-md-6">
                    <div className="text-center p-4">
                        <img id="main-image" alt="product" src={product.image} width="250" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="border p-4">
                        <span className="text-muted text-capitalize"> in {product.category}</span>
                        <h5 className="text-uppercase">{product.title}</h5>
                        Rating {product.rating && product.rating.rate}
                        <i className="fa fa-star text-warning"></i>
                        <div className="price d-flex flex-row align-items-center">
                            <big className="display-6"><b>${product.price}</b></big>
                        </div>
                        <p className="text-muted">{product.description}</p>
                        <div className="cart mt-4 align-items-center">
                            <Button variant="outlined" className="text-uppercase mr-2 px-4">Buy</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
