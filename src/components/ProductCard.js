import { Card, CardContent, CardMedia, Typography, Button, Box, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 280,
          objectFit: 'cover',
          backgroundColor: '#f5f5f5',
        }}
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <Box sx={{ flexGrow: 1, mb: 2 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 500, mb: 1, fontSize: '1.25rem' }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1.5, lineHeight: 1.5 }}
          >
            {product.shortDescription}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              value={product.rating}
              precision={0.5}
              readOnly
              size="small"
              sx={{ color: '#ffa500' }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="medium"
            onClick={handleShowDetails}
            sx={{
              flex: 1,
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: '0.875rem',
              py: 1,
            }}
          >
            Show Details
          </Button>
          <Button
            variant="outlined"
            size="medium"
            onClick={handleAddToCart}
            sx={{
              flex: 1,
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: '0.875rem',
              py: 1,
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    shortDescription: PropTypes.string,
    imageUrl: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
