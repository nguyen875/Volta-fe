import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Sidebar } from './pages/sidebar/sidebar.part';
import { RenderRoutes } from './routes/render.route';
import { SnackbarProvider } from './common/contexts/snackbar.context';
import { LoginScreen } from './pages/screens/login/login.screen';
import { ROUTES } from './routes/route.constant';

function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginScreen />} />
          <Route
            path="*"
            element={
              <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1 }}>
                  <RenderRoutes />
                </Box>
              </Box>
            }
          />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;