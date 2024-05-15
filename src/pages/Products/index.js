import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "react-oidc-context";
import { Box, Typography, Snackbar, MenuItem, Select, Switch } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../globalReduxStore/actions";
import { useGetProducts, useDeleteProduct, useUpdateProductStatus } from "../../globalReduxStore/reducers/productoperation";

const Products = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loading, error, data, refetch } = useGetProducts({
    limit: 50,
    skip: 0,
    filter: {
      category: "",
      status: ""
    }
  });
  const deleteProduct = useDeleteProduct();
  const updateProductStatus = useUpdateProductStatus();
  const { user, isAuthenticated } = useAuth();
  const [tenantID, setTenantID] = useState();
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (isAuthenticated && user && user.profile && user.profile["custom:tenantID"]) {
      setTenantID(user.profile["custom:tenantID"]);
    }
  
    if (data && data.getProducts) {
      dispatch(actionCreators.setProducts(data.getProducts));
    }
  }, [user, isAuthenticated, data, dispatch]);

  useEffect(() => {
    refetch({
      limit: 50,
      skip: 0,
      filter: {
        category: selectedCategory,
        status: selectedStatus
      }
    });
  }, [selectedCategory, selectedStatus]);

  const handleEdit = (product) => {
    Navigate(`/EditProduct/${product.id}`, { state: { product } });
  };

  const handleDelete = async (productId) => {
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteProduct({ variables: { ID: productId.toString() } });
          dispatch(actionCreators.deleteProduct(productId));
          setOpenSnackbar(true);
          resetDeleteMessage();
          refetch();
        } catch (err) {
          console.error("Error deleting product:", err);
        }
      }
    });
  };

  const handleProductStatusChange = async (productId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "non-active" : "active";
    try {
      await updateProductStatus({ variables: { id: productId, status: newStatus } });
      dispatch(actionCreators.updateProductStatus({ id: productId, status: newStatus }));
      setStatusUpdateSuccess(true);
      setOpenSnackbar(true);
      refetch();
    } catch (err) {
      console.error("Error updating product status:", err);
    }
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const dateTimeString = currentDate.toLocaleDateString("en-US", options);
    const [datePart, timePart] = dateTimeString.split(", ");
    const formattedTime = timePart.replace("at", "").trim();
    return `${datePart}, ${formattedTime}`;
  };

  const resetDeleteMessage = () => {
    setDeleteSuccess(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#ffffff", border: "1px solid #ffffff", borderRadius: "6px", padding: "15px", margin: "10px", marginTop: "30px", boxShadow: "0 0 14px rgba(0, 0, 0, 0.1)", height: "90px", width: "99%" }}>
        <Typography variant="h6" style={{ marginLeft: "40px", marginTop: "5px", fontWeight: "bold", fontFamily: "sans-serif", fontSize: "38px" }}>
          Products
        </Typography>
        <Typography variant="body1" style={{ backgroundColor: "#F9F9F9", padding: "13px", borderRadius: "5px", border: "1px solid #E2E1E1", marginRight: "30px", width: "328px", height: "61px", textAlign: "center", fontWeight: "700" }}>
          {getCurrentDateTime()}
        </Typography>
      </Box>

      <div style={{ display: "flex", alignItems: "center", margin: "20px", marginBottom: "10px", borderColor: "blue", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", borderRadius: "5px", borderColor: "blue", marginRight: "20px" }}>
          <Select value={selectedCategory} onChange={handleCategoryChange} displayEmpty inputProps={{ "aria-label": "category" }}>
            <MenuItem value="" disabled>Select Category</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="grocery">Grocery</MenuItem>
            <MenuItem value="jewellery">Jewellery</MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
          </Select>
        </div>
        <div style={{ display: "flex" }}>
          <Select value={selectedStatus} onChange={handleStatusChange} displayEmpty inputProps={{ "aria-label": "status" }}>
            <MenuItem value="" disabled>Select Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="non-active">Non-active</MenuItem>
          </Select>
        </div>
      </div>

      <div className="card" style={{ position: "relative", padding: "24px", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 0 14px rgba(0, 0, 0, 0.1)", width: "210px", height: "78px", marginLeft: "24px", justifyContent: "flex-start", marginTop:"-64px" }}>
        <Typography variant="subtitle1" style={{  fontFamily: "sans-serif" }}>selectedCategory:</Typography>
        <Typography variant="body1" style={{ fontFamily: "sans-serif" }}>{selectedCategory}</Typography>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginBottom: "20px", padding: "20px" }}>
        {data.getProducts.map((product, index) => (
          <div key={product.id} style={{ border: "1px solid #ffffff", borderRadius: "6px", padding: "30px", height: "100%", marginBottom: index % 3 === 2 ? "0" : "20px", boxShadow: "0 0 14px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#ffffff", fontFamily: "sans-serif ,Archivo SemiExpanded", fontWeight: "bold" }}>
            <div style={{ flex: 1 }}>
              <div style={{ position: "relative" }}>
                <Switch checked={product.status === "active"} onChange={() => handleProductStatusChange(product.id, product.status)} color={product.status === "active" ? "primary" : "secondary"} inputProps={{ "aria-label": "controlled" }} style={{ position: "absolute", top: 0, left: 0, color: product.status === "active" ? "green" : "red" }} />
                <img src={product.imageUrl} alt={product.name} style={{ maxWidth: "225px", maxHeight: "200px", border: "0.5px solid #ccc", borderRadius: "5px", alignSelf: "center" }} />
              </div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#333", fontFamily: 'sans-serif' }}>
                {product.name}
              </h2>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#666" }}>
                Description: {product.description}
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Price: ${product.price}
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Min Price: ${product.minPrice}
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Max Price: ${product.maxPrice}
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Category: {product.category}
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Slug: {product.slug}
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Brand: {product.brand}
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Tags: {product.tags.join(", ")}
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Stock: {product.stock}
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Discount: {product.discount}%
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Status: {product.status}
              </p>
              <p style={{ fontWeight: "bold", lineHeight: 1.4, fontSize: "1rem", color: "#777" }}>
                Payment Methods: {product.paymentMethods.join(", ")}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <button  onClick={() => handleEdit(product)} style={{ backgroundColor: "white", color: "blue", padding: "20px 30px", border: "2px solid blue", borderRadius: "23px", cursor: "pointer", height: "36px", display: "flex", alignItems: "center", marginRight: "5px", transition: "background-color 0.3s, color 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "blue"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = "blue"; }}>
                  <EditIcon style={{ marginRight: "5px" }}  />
                  Edit
                </button>
              <button onClick={() => handleDelete(product.id)} style={{ backgroundColor: "white", color: "red", padding: "20px 30px", border: "2px solid red", borderRadius: "23px", cursor: "pointer", height: "36px", display: "flex", alignItems: "center", marginRight: "5px", transition: "background-color 0.3s, color 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "red"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = "red"; }}>
                <DeleteIcon style={{ marginRight: "2px" }} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          Product deleted successfully!
        </MuiAlert>
      </Snackbar>

      <Snackbar open={statusUpdateSuccess} autoHideDuration={2000} onClose={() => setStatusUpdateSuccess(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setStatusUpdateSuccess(false)} severity="success">
          Product status updated successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Products;
