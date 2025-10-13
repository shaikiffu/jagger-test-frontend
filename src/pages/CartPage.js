import { Container, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import CartItem from '../components/CartItem';
import PurchaseCompleteModal from '../components/PurchaseCompleteModal';
import { GET_CART, GET_CART_COUNT } from '../graphql/queries';
import { REMOVE_FROM_CART, CLEAR_CART } from '../graphql/mutations';

function CartPage() {
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_CART);

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_CART }, { query: GET_CART_COUNT }],
    onError: (error) => {
      console.error('Error removing from cart:', error);
    },
  });

  const [clearCart] = useMutation(CLEAR_CART, {
    refetchQueries: [{ query: GET_CART }, { query: GET_CART_COUNT }],
    onError: (error) => {
      console.error('Error clearing cart:', error);
    },
  });

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart({
        variables: { itemId },
      });
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const handlePurchase = () => {
    setPurchaseModalOpen(true);
    // Clear cart after showing modal
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const handleClosePurchaseModal = () => {
    setPurchaseModalOpen(false);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
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
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert severity="error">Error loading cart: {error.message}</Alert>
        </Box>
      </Container>
    );
  }

  const cart = data?.cart;
  const hasItems = cart?.items && cart.items.length > 0;

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="text"
            onClick={handleClearCart}
            disabled={!hasItems}
            sx={{
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': {
                color: 'error.main',
                backgroundColor: 'transparent',
              },
            }}
          >
            Clear the cart
          </Button>
        </Box>

        {!hasItems ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Add some products to get started!
            </Typography>
          </Box>
        ) : (
          <>
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
            ))}

            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop: '1px solid #e0e0e0',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>
                Total: {cart.total.toFixed(2)} EUR
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handlePurchase}
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  px: 6,
                  py: 1.5,
                }}
              >
                Purchase
              </Button>
            </Box>
          </>
        )}
      </Container>

      <PurchaseCompleteModal open={purchaseModalOpen} onClose={handleClosePurchaseModal} />
    </>
  );
}

export default CartPage;
