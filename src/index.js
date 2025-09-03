import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from "./Layout.tsx";
import Garage from "./App/Garage/Page.tsx";
import Winners from "./App/Winners/Page.tsx";
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/" element={<Garage />} />
          <Route path="/winners" element={<Winners />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

