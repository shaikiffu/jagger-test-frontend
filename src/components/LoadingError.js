import { Container, Box, CircularProgress, Alert } from '@mui/material';

function LoadingError({ loading, error, maxWidth = 'lg' }) {
  if (loading) {
    return (
      <Container maxWidth={maxWidth}>
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
      <Container maxWidth={maxWidth}>
        <Box sx={{ py: 4 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      </Container>
    );
  }

  return null;
}

export default LoadingError;
