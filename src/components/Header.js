import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_CART_COUNT, GET_PRODUCT } from '../graphql/queries';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [animate, setAnimate] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: cartData } = useQuery(GET_CART_COUNT, {
    pollInterval: 1000, // Poll every second to keep cart count updated
  });

  // Check if we're on a product details page
  const isProductDetailsPage = location.pathname.startsWith('/product/');
  const productId = isProductDetailsPage ? params.id || location.pathname.split('/')[2] : null;

  // Fetch product details if on product page
  const { data: productData } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
    skip: !isProductDetailsPage || !productId,
  });

  const cartItemCount = cartData?.cartCount || 0;
  const isProductsPage = location.pathname === '/';
  const isCartPage = location.pathname === '/cart';

  // Trigger animation when cart count changes
  useEffect(() => {
    if (cartItemCount > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  // Add scroll listener to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine header background and title - all pages have blue background
  const isBlueBackground = true;
  const headerTitle = isProductDetailsPage
    ? (productData?.product?.name || 'Product')
    : isCartPage
    ? 'Cart'
    : 'Products';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: isBlueBackground ? '#1976d2' : '#ffffff',
        color: isBlueBackground ? '#ffffff' : '#000000',
        borderBottom: isBlueBackground ? 'none' : '1px solid #e0e0e0',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '1.25rem',
          }}
          onClick={() => navigate('/')}
        >
          {headerTitle}
        </Typography>
        <Box>
          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            aria-label="shopping cart"
            sx={{
              '&:hover': {
                backgroundColor: isBlueBackground
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <Badge
              badgeContent={cartItemCount}
              color="error"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: animate ? '#ff9800' : '#f44336',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                  transform: animate ? 'scale(1.3)' : 'scale(1)',
                  fontSize: '0.75rem',
                  top: -12,
                  right: -17,
                },
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: '1.8rem' }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
