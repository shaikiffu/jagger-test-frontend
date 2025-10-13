import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
  TextField,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { GET_PRODUCT, GET_CART_COUNT, GET_CART } from '../graphql/queries';
import { ADD_TO_CART } from '../graphql/mutations';
import ProductImageModal from '../components/ProductImageModal';

function ProductDetailsPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [modalOpen, setModalOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  const [addToCart, { loading: addingToCart }] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART_COUNT }, { query: GET_CART }],
    onCompleted: () => {
      setSnackbar({
        open: true,
        message: `${quantity} item(s) added to cart successfully!`,
        severity: 'success',
      });
      setQuantity(0);
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: `Error adding to cart: ${error.message}`,
        severity: 'error',
      });
    },
  });

  const handleAddToCart = async () => {
    if (quantity > 0) {
      try {
        await addToCart({
          variables: {
            productId: id,
            quantity: quantity,
          },
        });
      } catch (err) {
        console.error('Error adding to cart:', err);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value >= 0 ? value : 0);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error">Error loading product: {error.message}</Alert>
        </Box>
      </Container>
    );
  }

  const product = data?.product;
  if (!product) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="warning">Product not found</Alert>
        </Box>
      </Container>
    );
  }

  // Create thumbnail images (using same image multiple times as placeholder)
  const thumbnails = [product.imageUrl, product.imageUrl, product.imageUrl];

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Side - Image Gallery */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
              }}
            >
              {/* Main Image - Top on mobile, Right on desktop */}
              <Box
                sx={{
                  flex: 1,
                  order: { xs: 1, md: 2 },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    overflow: 'hidden',
                    height: { xs: 'auto', md: 'calc(450px + 32px)' },
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <IconButton
                    onClick={handleOpenModal}
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      backgroundColor: 'white',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <ZoomInIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Thumbnail Images - Bottom on mobile, Left on desktop */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'column' },
                  gap: 2,
                  width: { xs: '100%', md: '150px' },
                  order: { xs: 2, md: 1 },
                }}
              >
                {thumbnails.map((thumb, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      position: 'relative',
                      backgroundColor: '#f5f5f5',
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid #1976d2' : '2px solid transparent',
                      aspectRatio: '1',
                      flex: { xs: 1, md: 'none' },
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                  >
                    <img
                      src={thumb}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal();
                      }}
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        backgroundColor: 'white',
                        padding: '4px',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                    >
                      <ZoomInIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Product Info */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 500 }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {product.shortDescription}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Rating value={product.rating} precision={0.5} readOnly size="medium" sx={{ color: '#ffa500' }} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 500, mb: 0.5 }}>
                  {product.price.toFixed(2)} EUR
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  all prices incl. 10% taxes
                </Typography>
              </Box>

              {/* Quantity Selector and Add to Cart - Aligned to bottom */}
              <Box sx={{ marginTop: 'auto' }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #ccc',
                      borderRadius: 1,
                      width: 'fit-content',
                      bgcolor: 'white',
                    }}
                  >
                    <TextField
                      value={quantity}
                      onChange={handleQuantityChange}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        inputProps: {
                          style: { textAlign: 'center', width: '40px' },
                        },
                      }}
                      size="small"
                    />

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '1px solid #ccc',
                      }}
                    >
                      <IconButton
                        onClick={incrementQuantity}
                        size="small"
                        sx={{
                          borderRadius: 0,
                          padding: '2px 8px',
                          borderBottom: '1px solid #ccc',
                        }}
                      >
                        <KeyboardArrowUp fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={decrementQuantity}
                        size="small"
                        sx={{
                          borderRadius: 0,
                          padding: '2px 8px',
                        }}
                      >
                        <KeyboardArrowDown fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                    disabled={quantity === 0 || addingToCart}
                    sx={{
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      px: 4,
                    }}
                  >
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

     

      {/* Description Section - Full Width */}
      <Box sx={{ backgroundColor: '#e8e8e8', py: 4, mt: 6, position: 'relative', height: '226px' }}>
        <Container maxWidth="lg">
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
            DESCRIPTION
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {product.longDescription}
          </Typography>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <ProductImageModal
        open={modalOpen}
        onClose={handleCloseModal}
        imageUrl={product.imageUrl}
        productName={product.name}
      />
    </>
  );
}

export default ProductDetailsPage;
