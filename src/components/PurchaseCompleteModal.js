import { Dialog, DialogContent, DialogTitle, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PurchaseCompleteModal({ open, onClose }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onClose();
    navigate('/');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 1,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
          Purchase Complete
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
          Thank you for your purchase! Your order has been successfully placed. A confirmation
          email has been sent to your inbox with the details of your order. We hope to serve you
          again soon!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="text"
            color="primary"
            onClick={handleGoHome}
            sx={{
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Go Back Home
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default PurchaseCompleteModal;
