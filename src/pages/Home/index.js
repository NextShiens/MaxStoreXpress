import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useAddToCart } from '../../globalReduxStore/reducers/cartOperations';
import { useAuth } from 'react-oidc-context';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  Button,
  Box,
  TextField,
  Chip,
  Slider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import FilterListIcon from '@material-ui/icons/FilterList';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  productMedia: {
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
  productContent: {
    flexGrow: 1,
  },
  filters: {
    marginBottom: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
  filterDrawer: {
    width: 300,
    flexShrink: 0,
  },
  filterDrawerPaper: {
    width: 300,
  },
  priceSlider: {
    padding: theme.spacing(2),
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const GET_PRODUCTS = gql`
  query GetProducts($filter: ProductFilterInput, $limit: Int, $skip: Int) {
    getProducts(filter: $filter, limit: $limit, skip: $skip) {
      id
      tenantID
      name
      slug
      brand
      price
      minPrice
      maxPrice
      description
      category
      tags
      imageUrl
      rating
      stock
      discount
      createdAt
      updatedAt
    }
  }
`;

const HomePage = () => {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState('rating');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [filterValues, setFilterValues] = useState({
    name: '',
    description: '',
    minPrice: 0,
    maxPrice: 1000,
    rating: '',
    brand: [],
  });
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        category,
        name: filterValues.name,
        description: filterValues.description,
        minPrice: filterValues.minPrice.toString(),
        maxPrice: filterValues.maxPrice.toString(),
        rating: filterValues.rating,
      },
      limit: 12,
      skip: (page - 1) * 12,
    },
  });

  const addToCart = useAddToCart();
  const { user } = useAuth();
  const userID = user?.profile?.sub || null;

  const handleAddToCart = async (productId) => {
    if (userID) {
      try {
        const cartInput = {
          userID,
          productID: productId,
          quantity: 1,
        };
        await addToCart({ variables: { cartInput } });
        // Handle success or show a success message
      } catch (error) {
        // Handle error
        console.error('Error adding to cart:', error);
      }
    } else {
      // Handle case when user is not logged in
      console.error('User must be logged in to add to cart');
    }
  };

  useEffect(() => {
    // Sort products based on the selected option
    if (data) {
      data.getProducts.sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        } else if (sortBy === 'price') {
          return a.price - b.price;
        }
      });
    }
  }, [data, sortBy]);

  const handleFilterChange = (event) => {
    setFilterValues({
      ...filterValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilterDrawerToggle = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePriceChange = (event, newValue) => {
    setFilterValues({
      ...filterValues,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };

  if (loading) {
    return (
      <Container className={classes.root}>
        <Grid container spacing={3}>
          {[...Array(12)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rect" height={200} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) return <Typography>Error :(</Typography>;

  return (
    <Container className={classes.root}>
      {/* Header and filter drawer */}
      <Box className={classes.header}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Welcome to MaxedStore
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sign up now and start selling your products!
          </Typography>
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FilterListIcon />}
          onClick={handleFilterDrawerToggle}
        >
          Filters
        </Button>
      </Box>
      <Drawer
        className={classes.filterDrawer}
        variant="temporary"
        anchor="left"
        open={filterDrawerOpen}
        onClose={handleFilterDrawerToggle}
        classes={{
          paper: classes.filterDrawerPaper,
        }}
      >
      </Drawer>
      <Grid container spacing={3} className={classes.filters}>
        <Grid item xs={12} sm={6} md={4}>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            fullWidth
          >
            <MenuItem value="rating">Sort by Rating</MenuItem>
            <MenuItem value="price">Sort by Price</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
            <MenuItem value="books">Books</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="name"
            label="Name"
            value={filterValues.name}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="description"
            label="Description"
            value={filterValues.description}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            name="rating"
            label="Rating"
            value={filterValues.rating}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Product cards */}
      <Grid container spacing={3}>
        {data.getProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card className={classes.productCard}>
              <Link to={`/product/${product.id}`}>
                <CardMedia
                  className={classes.productMedia}
                  component="img" image={product.imageUrl[0] || '/placeholder.jpg'}
                  alt={product.name}
                />
                <CardContent className={classes.productContent}>
                  <Typography variant="h5" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1">
                      Price: ${product.price}
                    </Typography>
                    <Box ml={1} display="flex" alignItems="center">
                      <StarIcon fontSize="small" color="primary" />
                      <Typography variant="body1" color="textSecondary">
                        {product.rating}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Link>
              <Button onClick={() => handleAddToCart(product.id)}>
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>{/* Pagination */}
      <Box className={classes.pagination}>
        <Pagination
          count={10}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Box>
    </Container>
  );
};
export default HomePage;