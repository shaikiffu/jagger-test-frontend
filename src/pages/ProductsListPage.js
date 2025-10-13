import { Container, Grid, CircularProgress, Box, Alert, Snackbar } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { GET_PRODUCTS, GET_CART_COUNT, GET_CART } from '../graphql/queries';
import { ADD_TO_CART } from '../graphql/mutations';

function ProductsListPage() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART_COUNT }, { query: GET_CART }],
    onCompleted: () => {
      setSnackbar({
        open: true,
        message: 'Product added to cart successfully!',
        severity: 'success',
      });
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: `Error adding to cart: ${error.message}`,
        severity: 'error',
      });
    },
  });

  const handleAddToCart = async (productId) => {
    try {
      await addToCart({
        variables: {
          productId,
          quantity: 1,
        },
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
          <Alert severity="error">
            Error loading products: {error.message}
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {data?.products?.map((product) => (
            <Grid item xs={12} sm={6} md={6} key={product.id}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductsListPage;
