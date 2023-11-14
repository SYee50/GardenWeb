import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from './components/Layout';
import EditEntryPage from './pages/EditEntryPage.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // Setup app routes
  // Use Link component with to={"/page_name"} to set up links like anchor tags
  <BrowserRouter>
    <Routes>
      {/* Nesting sets up layout on top of the rest of the page component */}
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<App />} />
        <Route path='/edit/:id' element={<EditEntryPage />}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
