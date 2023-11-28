import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from './components/Layout';
import EditEntryPage from './pages/EditEntryPage.jsx'
import MoreEntryPage from './pages/MoreEntryPage.jsx'
import CreateEntryPage from './pages/CreateEntryPage.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // Setup app routes
  // Use Link component with to={"/page_name"} to set up links like anchor tags
  <BrowserRouter>
    <Routes>
      {/* Nesting sets up layout on top of the rest of the page component */}
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<App />} />
        <Route path='/create' element={<CreateEntryPage />} />
        
        {/* Dynamic links that change based on id */}
        <Route path='/edit/:id' element={<EditEntryPage />}/>
        <Route path='/more/:id' element={<MoreEntryPage />}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
