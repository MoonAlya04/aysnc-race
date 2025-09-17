import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import './App.css';
import Layout from './Layout';
import Winners from './App/Winners/Page';
import Garage from './App/Garage/Page';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Garage />} />
            <Route path="winners" element={<Winners />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
