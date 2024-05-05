import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import Home from 'pages/Home';
import theme from 'libs/theme';
import ModalContextProvider from 'libs/context/ModalContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ModalContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </BrowserRouter>
        </ModalContextProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
