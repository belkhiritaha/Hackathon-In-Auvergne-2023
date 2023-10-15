import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

interface sensorData {
    name: string;
    description: string;
    position: string;
    y: number[];
    expected: number[];
}

function fakeData() {
    const fakeSensorData = {
        name: "Capteur XYZ-123",
        description: "Capteur de température",
        position: "Parcelle A-1",
        type: "Température",
        manufacturer: "Acme Sensors",
        installationDate: "2023-01-15",
        location: "Serre 1, Étagère 2",
        unit: "°C",
        measurementRange: "-20°C à 50°C",
        measurementFrequency: "Toutes les 15 minutes",
        status: "Actif",
        batteryStatus: "80%",
        responsible: "John Doe",
        notes: "Capteur utilisé pour surveiller la température de la serre 1.",
        dataHistory: [
            { timestamp: "2023-10-01 08:00", value: 24.5 },
            { timestamp: "2023-10-01 08:15", value: 25.0 },
        ],
        alerts: [
            { timestamp: "2023-10-01 08:30", message: "Mesure anormalement haute" },
        ],
    };
    return fakeSensorData;
}    

function Sensor() {
    const { sensorId } = useParams();
    console.log(sensorId);
    const [sensorData, setSensorData] = useState<sensorData | null>(null);
    const [showSensorData, setShowSensorData] = useState(true);
    const [showExpectedData, setShowExpectedData] = useState(true);

    const fakeDataObj = fakeData();

    useEffect(() => {
        const apiUrl = `http://localhost:3000/sensors/${sensorId}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setSensorData(data);
            })
            .catch((error) => {
                console.error('Error fetching sensor data:', error);
            });
    }, [sensorId]);

    const formatData = (sensorData: sensorData) => {
        const data = [];
        for (let i = 0; i < sensorData.y.length; i++) {
            const sign = Math.random() > 0.5 ? 1 : -1;
            data.push({
                name: i,
                sensorData: sensorData.y[i],
                expectedData: sensorData.expected[i],
            });
        }
        return data;
    };

    const emojiMap = {
        "temperature": "🌡️",
        "humidity": "💧",
        "fertility": "🪴",
    };
    
    return (
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }} style={{ alignItems: 'center', justifyContent: 'center', overflowY: 'scroll', maxHeight: '90vh', marginTop: '10vh' }}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '20vh', minWidth: '99vw' }}>

                <Paper variant='outlined' style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h5" gutterBottom>
                    📟 Fiche d'identité du capteur
                    </Typography>
                    <Typography variant="body1">
                    📋 Nom : {sensorData?.name}
                    </Typography>
                    <Typography variant="body1">
                    🏭 Manufacturer : {fakeDataObj.manufacturer}
                    </Typography>
                    <Typography variant="body1">
                    🔋 Batterie : {fakeDataObj.batteryStatus}
                    </Typography>
                    <Typography variant="body1">
                    📃 Description : {emojiMap[sensorData?.description]} {sensorData?.description}
                    </Typography>
                    <Typography variant="body1">
                    📌 Position : Parcelle {sensorData?.position}
                    </Typography>
                    <Typography variant="body1">
                    📆 Date d'installation : {fakeDataObj.installationDate}
                    </Typography>
                    <Typography variant="body1">
                    🚨 Alertes : 
                        <ul>
                            {fakeDataObj.alerts.map((alert) => (
                                <li>{alert.timestamp} - {alert.message + ' (' + sensorData?.y[0] + ')'}</li>
                            ))}
                        </ul>
                    </Typography>
                </Paper>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Chip
                            label="📟 Données du capteur"
                            onClick={() => setShowSensorData(!showSensorData)}
                            color={showSensorData ? 'primary' : 'default'}
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            label="🔎 Données prévisionnelles"
                            onClick={() => setShowExpectedData(!showExpectedData)}
                            color={showExpectedData ? 'success' : 'default'}
                        />
                    </Grid>
                </Grid>

                {sensorData && (
                    <AreaChart
                        width={730}
                        height={250}
                        data={formatData(sensorData)}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        {showSensorData && (
                            <Area
                                type="monotone"
                                dataKey="sensorData"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorUv)"
                            />
                        )}
                        {showExpectedData && (
                            <Area
                                type="monotone"
                                dataKey="expectedData"
                                stroke="#82ca9d"
                                fillOpacity={1}
                                fill="url(#colorPv)"
                            />
                        )}
                    </AreaChart>
                )}
            </Grid>
        </Container>
    );
}

export default Sensor;
