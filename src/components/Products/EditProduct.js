import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const productDetails = await response.json();
                setProduct(productDetails);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleUpdateProduct = async () => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                console.log('Product updated successfully!');
                navigate(`/product/${id}`);
            } else {
                console.error('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2>Edit Product</h2>
            <form>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProduct}
                >
                    Update Product
                </Button>
            </form>
        </div>
    );
}

export default EditProduct;
