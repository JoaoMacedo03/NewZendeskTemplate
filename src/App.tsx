import { ThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import ThemeMaterialUI from './styles/materialUI';
import Page from './pages';
import AppProvider from './hooks';
import GlobalStyles from './styles/global'

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={ThemeMaterialUI}>
        <AppProvider>
          <Page />
        </AppProvider>
        <CssBaseline />
        <GlobalStyles />
      </ThemeProvider>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App