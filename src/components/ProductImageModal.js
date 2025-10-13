import { Dialog, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ProductImageModal({ open, onClose, imageUrl, productName }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      PaperProps={{
        sx: {
          backgroundColor: 'white',
          borderRadius: 1,
          maxWidth: '900px',
          width: '90vw',
          position: 'relative',
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey.500',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Product Name Header */}
      <Box sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 500, textAlign: 'center' }}>
          {productName}
        </Typography>
      </Box>

      {/* Large Product Image */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          minHeight: '500px',
        }}
      >
        <img
          src={imageUrl}
          alt={productName}
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Dialog>
  );
}

export default ProductImageModal;
