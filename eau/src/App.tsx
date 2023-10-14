import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import SimpleAreaChart from './components/charts/Linechart'

function App() {
    return (
        <>
            <Navbar />

            <SimpleAreaChart /> 
        </>
    )
}

export default App
