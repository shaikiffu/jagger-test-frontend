import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CartItem({ item, onRemove }) {
  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        borderRadius: 1,
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ position: 'relative', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 500, mb: 0.5 }}>
              {item.product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {item.product.shortDescription || 'No description available'}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Quantity: {item.quantity}
            </Typography>
          </Box>
          <IconButton
            onClick={() => onRemove(item.id)}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'error.main',
                backgroundColor: 'rgba(211, 47, 47, 0.04)',
              },
            }}
            aria-label="delete item"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

import PropTypes from 'prop-types';

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    quantity: PropTypes.number.isRequired,
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      shortDescription: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
