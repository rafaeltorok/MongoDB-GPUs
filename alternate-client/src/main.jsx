import ReactDOM from 'react-dom/client';
import { 
  ApolloProvider, 
  ApolloClient,
  InMemoryCache 
} from '@apollo/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


const client = new ApolloClient({ 
  uri: import.meta.env.VITE_BACKEND_URL || `http://${window.location.hostname}:4000/graphql`,
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ThemeProvider>
);
