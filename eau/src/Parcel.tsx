import React, { useState, useEffect } from 'react';
import './Grille.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import SimpleAreaChart from './components/charts/Linechart';

const TAILLE = 10;

// 10 x 10 grid
const grid = [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
    [2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
    [2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
    [2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
    [2, 2, 2, 0, 0, 1, 1, 1, 1, 0],
    [2, 2, 2, 0, 0, 1, 1, 1, 1, 0],
    [2, 2, 2, 0, 0, 0, 1, 1, 1, 0],
    [2, 2, 2, 0, 0, 0, 1, 1, 1, 1],
    [2, 2, 2, 0, 0, 0, 1, 1, 1, 1],
];

const expoitation = [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [12, 12, 12, 0, 0, 1, 1, 1, 1, 1],
    [12, 12, 12, 0, 0, 1, 2, 2, 2, 2],
    [12, 12, 11, 0, 0, 1, 2, 2, 2, 2],
    [12, 11, 11, 0, 0, 1, 2, 2, 2, 2],
    [12, 11, 11, 0, 0, 3, 3, 3, 3, 0],
    [12, 11, 11, 0, 0, 4, 4, 3, 3, 0],
    [12, 11, 11, 0, 0, 0, 4, 5, 5, 0],
    [12, 11, 11, 0, 0, 0, 4, 5, 5, 5],
    [12, 11, 11, 0, 0, 0, 4, 5, 5, 5],
];

const emojis = ["❌", "🌾", "🍆", "🥕", "🥔", "🍅"];
function cellColor(i : number, j : number) {
    const colors = [
        "#ff617b",
        "#74f772",
        '#eef76a',
    ];
    console.log(grid[i][j]);
    console.log(colors[grid[i][j]]);
    return colors[grid[i][j]];
}

function Parcel(props : any) {
    const [grille, setGrille] = useState([]);

    function handleCellClick(e : any) {
        const y = e.target.cellIndex;
        const x = e.target.parentNode.rowIndex;
        props.setActiveCell([x, y]);
        console.log(x, y);
    }

    function Cell(props : any) {
        return (
            <Tooltip title={`Parcelle (${props.x}, ${props.y})`} placement="top">
                <td
                    onClick={handleCellClick}
                    style={{ 
                        backgroundColor: props.dataReady ? cellColor(props.x, props.y) : '#a8a8a8',
                        cursor: 'pointer',
                    }}
                >{
                    props.dataReady ? ( emojis[expoitation[props.x][props.y] > 10 ? expoitation[props.x][props.y] - 10 : expoitation[props.x][props.y]] ) : ("❓")}</td>
            </Tooltip>
        );
    }

    useEffect(() => {
        const generateGrille = () => {
            const grille : any = [];
            for (let i = 0; i < TAILLE; i++) {
                let ligne = [];
                for (let j = 0; j < TAILLE; j++) {
                    ligne.push(
                        <Cell key={j} x={i} y={j} dataReady={props.dataReady} />
                    );
                }
                grille.push(<tr key={i}>{ligne}</tr>);
            }
            setGrille(grille);
        };

        generateGrille();
    }, [props.dataReady]);


    return (
        <div id="grille">
            <table>
                <thead>{grille}</thead>
            </table>
        </div>
    );
}

interface plotData {
    fieldId: string;
    plotId: {
        captors: string[];
        currentCulture: string;
        cultureRotation: string[];
        field: string;
        id: string;
        _id: string;
    }
}
    
const emojiMap = {
    "temperature": "🌡️",
    "humidity": "💧",
    "fertility": "🪴",
};

const rotationMap = {
    "0": "🌾 Blé",
    "1": "🍆 Aubergine",
    "2": "🥕 Carotte",
    "3": "🥔 Pomme de terre",
    "4": "🍅 Tomate",
    "5": "🥒 Concombre",
    "6": "🌽 Maïs",
    "7": "🥦 Brocoli",
};

const GestionDesChamps = () => {
    const [activeCell, setActiveCell] = useState([-1, -1]);
    const [plotData, setPlotData] = useState<plotData[]>([]);
    const [fields, setFields] = useState<{ _id: string; description: string; }[]>([]);
    const [selectedField, setSelectedField] = useState<{ _id: string; description: string; } | null>(null);
    const [sensorData, setSensorData] = useState<{ _id: string; name: string; description: string; position: [number, number]; y: number[] }[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/fields')
            .then((res) => res.json())
            .then((data) => {
                setFields(data);
            });
    }, []);

    useEffect(() => {
        if (selectedField === null) return;
        fetch(`http://localhost:3000/fields/${selectedField._id}/plots`)
            .then((res) => res.json())
            .then((data) => {
                setPlotData(data);
                console.log(plotData);
            });
    }, [selectedField]);

    useEffect(() => {
        if (activeCell[0] === -1 || activeCell[1] === -1) return;
        fetch(`http://localhost:3000/plots/${plotData[10 * activeCell[0] + activeCell[1]]?.plotId._id}/sensors`)
            .then((res) => res.json())
            .then((data) => {
                setSensorData(data);
                console.log(sensorData);
            });
    }, [activeCell]);

    return (
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }} style={{ alignItems: 'center', justifyContent: 'center', overflowY: 'scroll', maxHeight: '90vh', marginTop: '15vh' }}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '20vh', minWidth: '80vw' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Gestion des champs
                </Typography>

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={fields.map((field) => field.description)}
                    sx={{ width: 300, marginBottom: 2 }}
                    renderInput={(params) => <TextField {...params} label="Champs" />}
                    onChange={(event, value) => setSelectedField(fields.find((field) => field.description === value) ?? null)}
                />
                <Button variant="contained" onClick={() => setSelectedField(null)}>Générer un champ</Button>
            </Grid>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" alignItems="center" style={{ minHeight: '80vh', minWidth: '99vw' }}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        { selectedField !== null ? `Champ: ${selectedField.description}` : "Champ non sélectionné" }
                    </Typography>
                    
                    <Parcel setActiveCell={setActiveCell} dataReady={plotData.length > 0} />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        { activeCell[0] !== -1 && activeCell[1] !== -1 ? `Parcelle ${activeCell[0]}-${activeCell[1]}` : "Résumé des champs" }
                    </Typography>

                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} variant='outlined' style={{ backgroundColor: '#f5f5f5' }}>
                        {
                            activeCell[0] !== -1 && activeCell[1] !== -1 ? 
                            grid[activeCell[0]][activeCell[1]] === 0 ? (
                                <>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        Parcelle non exploitable
                                    </Typography>
                                    <Typography variant="p" component="h4" gutterBottom>
                                        (Cliquez sur une parcelle pour voir plus de détails)
                                    </Typography>
                                </>
                            ) :
                            (
                                <>
                                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                                       <Grid item xs={6} md={6}>  
                                            <Typography variant="h6" component="h3" gutterBottom>
                                                Superficie: {(Math.random() * 10).toFixed(2)} ha
                                            </Typography>

                                            <Typography variant="h6" component="h3" gutterBottom>
                                                Exploitation: {emojis[plotData[10 * activeCell[0] + activeCell[1]]?.plotId.currentCulture > 10 ? plotData[10 * activeCell[0] + activeCell[1]]?.plotId.currentCulture - 10 : plotData[10 * activeCell[0] + activeCell[1]]?.plotId.currentCulture]}
                                            </Typography>

                                            <Typography variant="h6" component="h3" gutterBottom>
                                                Capteurs déployés: {sensorData.length}
                                                <ul>
                                                    {
                                                        sensorData.map((sensor) => (
                                                            <li key={sensor._id}>
                                                                <a href={`/sensors/${sensor._id}`}>
                                                                    {sensor.description === "temperature" ? "🌡️" : sensor.description === "humidity" ? "💧" : "🪴"} Capteur 
                                                                    {sensor.name} ({sensor.y[sensor.y.length - 1]} {sensor.description})
                                                                </a>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Typography variant="h6" component="h3" gutterBottom>
                                                Rotation des cultures:
                                                <ul key={plotData[10 * activeCell[0] + activeCell[1]]?.plotId._id}>
                                                    {
                                                        plotData[10 * activeCell[0] + activeCell[1]]?.plotId.cultureRotation.map((rotation) => (
                                                            <li key={rotation}>
                                                                {rotationMap[rotation]}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                    🟩 Parcelles exploitées: {grid.flat().filter((x) => x === 1).length}
                                    </Typography>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                    🟥 Parcelles non exploitables: {grid.flat().filter((x) => x === 0).length}
                                    </Typography>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                    🟨 Parcelles non exploitées: {grid.flat().filter((x) => x === 2).length}
                                    </Typography>

                                    <Typography variant="p" component="h4" gutterBottom>
                                        (Cliquez sur une parcelle pour voir plus de détails)
                                    </Typography>
                                </>
                            
                            )
                        }
                    </Paper>	
                </Grid>
            </Grid>
                    
        </Container>
    );
}


export default GestionDesChamps;