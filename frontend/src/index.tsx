import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './routes/Routes';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
    < GoogleOAuthProvider clientId="793865253198-suh6rgdpp4cstr2i0tmv7hio59bmb2u1.apps.googleusercontent.com" > <Router /></ GoogleOAuthProvider >

   
  </React.StrictMode>
);

