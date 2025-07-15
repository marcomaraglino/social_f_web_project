import { StrictMode } from 'react'
import React from 'react';
import {AuthProvider} from "@/utils/AuthProvider.jsx";

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AlertProvider} from "@/utils/AlertProvider.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateEvent from "./views/CreateEvent/CreateEvent.jsx";
import Layout from "./views/Layout.jsx";
import {EventProvider} from "@/utils/EventProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <EventProvider>
          <App />
          </EventProvider>
      </AuthProvider>
  </StrictMode>,
)
