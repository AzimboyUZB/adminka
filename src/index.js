import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/styles/style.css'

const wrapper = ReactDOM.createRoot(document.querySelector('.wrapper'));
wrapper.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
