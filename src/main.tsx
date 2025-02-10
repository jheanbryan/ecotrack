import { createRoot } from 'react-dom/client'
import { MyGlobalStyles } from './styles/globalStyles';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MyGlobalStyles />
    <App />
  </BrowserRouter>,
)