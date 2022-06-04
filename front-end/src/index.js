import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/login';
import Register from './pages/register';
//import Test from './pages/login2';
import Home from './pages/home';
import TopBar from './components/topbar';
import Test from './main';
import App from './main';
import { ContextProvider } from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
    
  </React.StrictMode>
);