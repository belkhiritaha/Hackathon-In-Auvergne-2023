import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './Dashboard.tsx'
import CompanyActivities from './Activity.tsx'
import { CssBaseline } from '@mui/material'
import './index.css'
import { BrowserRouter as Router, BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CssBaseline />
        <Navbar />

         <BrowserRouter>
                <Routes>
                    <Route index path="/dashboard" element={<Dashboard />}/>
                    <Route path="/activity" element={<CompanyActivities />}/>
                </Routes>
            </BrowserRouter>

    </React.StrictMode>,
)
