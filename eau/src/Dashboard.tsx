import { useState } from 'react'
import './App.css'
import SimpleAreaChart from './components/charts/Linechart'
import SimpleRadialChart from './components/charts/RadialChart'

function App() {
    return (
        <>
            <SimpleAreaChart />

            <SimpleRadialChart /> 
        </>
    )
}

export default App
