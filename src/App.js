import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ProductsListPage from './pages/ProductsListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import Layout from './components/Layout';

// Configure Apollo Client with enhanced caching
const client = new ApolloClient({
  uri: 'https://jaggaer-backend-api-908f5a13acd5.herokuapp.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            // Cache products for 5 minutes
            merge(existing, incoming) {
              return incoming;
            },
          },
          product: {
            // Cache individual products by ID
            read(existing, { args, toReference }) {
              return existing || toReference({
                __typename: 'Product',
                id: args.id,
              });
            },
          },
          cart: {
            // Always fetch fresh cart data
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      Product: {
        // Define key fields for Product caching
        keyFields: ['id'],
      },
      CartItem: {
        // Define key fields for CartItem caching
        keyFields: ['id'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network', // Use cache but also fetch fresh data
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first', // Use cache first, only fetch if not in cache
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<ProductsListPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
