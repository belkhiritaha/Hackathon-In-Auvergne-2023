import { CssBaseline } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './Dashboard.tsx'
import CompanyActivities from './Activity.tsx'
import Parcel from './Parcel.tsx'
import Sensor from './Sensor.tsx'
import './index.css'
import { BrowserRouter as Router, BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'

import NotificationsHandler, { NotificationRef } from "./NotificationHandler.tsx";
import { WebSocketClient } from "./WebSocket.tsx";

const notificationRef = React.createRef<NotificationRef>();

function errorNotify(notification: string | React.ReactNode) {
    notificationRef.current?.errorNotify(notification);
}


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CssBaseline />
        <Navbar />
        <NotificationsHandler ref={notificationRef} />
        <WebSocketClient onError={errorNotify} />

         <BrowserRouter>
            <Routes>
                <Route index path="/dashboard" element={<Dashboard />}/>
                <Route path="/activity" element={<CompanyActivities />}/>
                <Route path="/field" element={<Parcel />}/>
                <Route path="/sensors/:sensorId" element={<Sensor />}/>
            </Routes>
        </BrowserRouter>

    </React.StrictMode>,
)
