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
  Drawer,
  Slider,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination'; // Updated import
import StarIcon from '@material-ui/icons/Star';
import FilterListIcon from '@material-ui/icons/FilterList';
import Carousel from 'react-material-ui-carousel'; // Ensure this package is installed

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  productCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  productMedia: {
    height: 200,
  },
  productContent: {
    flexGrow: 1,
  },
  filterDrawerPaper: {
    padding: theme.spacing(4),
  },
  pagination: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
  filterDrawer: {
    flexShrink: 0,
  },
  saveButton: {
    marginTop: theme.spacing(2),
  },
  carousel: {
    [theme.breakpoints.down('xs')]: {
      height: 150,
    },
  },
  media: {
    height: '100%',
    width: '100%',
  },
}));

const GET_PRODUCTS = gql`
  query GetProducts($filter: ProductFilterInput, $limit: Int, $skip: Int) {
    getProducts(filter: $filter, limit: $limit, skip: $skip) {
      id
      name
      description
      price
      rating
      imageUrl
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
  });
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const [selectedTags, setSelectedTags] = useState([]);


  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        category,
        name: filterValues.name,
        description: filterValues.description,
        minPrice: filterValues.minPrice,
        maxPrice: filterValues.maxPrice
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
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      console.error('User must be logged in to add to cart');
    }
  };

  useEffect(() => {
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

  const handleSaveFilters = () => {
    console.log('Filter values:', filterValues);
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
        anchor={isMobile ? 'bottom' : 'left'}
        open={filterDrawerOpen}
        onClose={handleFilterDrawerToggle}
        classes={{
          paper: classes.filterDrawerPaper,
        }}
      >
        <Grid container spacing={2}>
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.saveButton}
              onClick={handleSaveFilters}
            >
              Save Filters
            </Button>
          </Grid>
        </Grid>
      </Drawer>
      <Grid container spacing={3}>
        {data.getProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card className={classes.productCard}>
              <Carousel
                className={classes.carousel}
                indicators={false}
                navButtonsAlwaysVisible
              >
                {product.imageUrl.length > 0 ? product.imageUrl.map((url, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    image={url}
                    alt={product.name}
                    className={classes.media}
                  />
                )) : (
                  <CardMedia
                    component="img"
                    image="/placeholder.jpg"
                    alt="placeholder"
                    className={classes.media}
                  />
                )}
              </Carousel>
              <CardContent className={classes.productContent}>
                <Typography variant="h5" gutterBottom>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {product.name}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.description}
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body1">
                    Price: ${product.price}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <StarIcon fontSize="small" color="primary" />
                    <Typography variant="body1" color="textSecondary" style={{ marginLeft: 4 }}>
                      {product.rating}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <Button variant="contained" color="primary" onClick={() => handleAddToCart(product.id)}>
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
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
