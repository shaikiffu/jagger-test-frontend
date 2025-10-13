import { Box } from '@mui/material';
import Header from './Header';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1,  pt: 3}}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
