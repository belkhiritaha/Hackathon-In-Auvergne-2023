import React from 'react';
import { Paper, Typography, Grid, Container } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, ScatterChart, Scatter, LineChart, Line, AreaChart, Area } from 'recharts';

const Dashboard = () => {
    // Données factices pour les capteurs
    const factice_data = [
        { name: 'Parcelle 4-3', temperature: 24.3, humidity: 47, fertility: 0.3 },
        { name: 'Parcelle 1-2', temperature: 25.8, humidity: 46, fertility: 0.6 },
        { name: 'Parcelle 6-5', temperature: 23.6, humidity: 49, fertility: -0.2 },
        { name: 'Parcelle 5-1', temperature: 25.1, humidity: 45, fertility: 0.7 },
        { name: 'Parcelle 3-1', temperature: 24.6, humidity: 51, fertility: -0.3 },
        { name: 'Parcelle 8-2', temperature: 23.9, humidity: 47, fertility: 0.1 },
        { name: 'Parcelle 6-2', temperature: 24.9, humidity: 48, fertility: 0.0 },
        { name: 'Parcelle 4-2', temperature: 24.2, humidity: 49, fertility: -0.4 },
        { name: 'Parcelle 9-3', temperature: 23.7, humidity: 46, fertility: 0.5 },
        { name: 'Parcelle 2-3', temperature: 25.7, humidity: 47, fertility: -0.2 },
        { name: 'Parcelle 1-1', temperature: 26.0, humidity: 45, fertility: 0.8 },
        { name: 'Parcelle 5-2', temperature: 24.5, humidity: 50, fertility: -0.1 },
        { name: 'Parcelle 7-3', temperature: 23.4, humidity: 48, fertility: 0.4 },
        { name: 'Parcelle 3-2', temperature: 25.2, humidity: 46, fertility: -0.2 },
        { name: 'Parcelle 8-3', temperature: 24.0, humidity: 47, fertility: 0.3 },
        { name: 'Parcelle 4-1', temperature: 24.8, humidity: 70, fertility: -0.3 },
        { name: 'Parcelle 6-1', temperature: 23.3, humidity: 45, fertility: 0.5 },
        { name: 'Parcelle 5-3', temperature: 25.3, humidity: 48, fertility: -0.1 },
        { name: 'Parcelle 2-2', temperature: 25.4, humidity: 47, fertility: 0.1 },
        { name: 'Parcelle 1-3', temperature: 24.7, humidity: 50, fertility: -0.4 },
        { name: 'Parcelle 7-4', temperature: 23.5, humidity: 48, fertility: 0.2 },
    ];


    const sensorData = [
        { name: 'Parcelle 2-6', temperature: 25.5, humidity: 45, fertility: 0.5 },
        { name: 'Parcelle 3-4', temperature: 24.8, humidity: 50, fertility: -0.1 },
        { name: 'Parcelle 7-8', temperature: 23.2, humidity: 48, fertility: 0.2 },
    ];

    return (
        <div style={{ maxHeight: '100vh', overflow: 'auto' }}>
            <Container
                maxWidth={false}
                sx={{ mt: 4, mb: 4 }}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '10vh',
                    overflow: 'auto',
                }}
            >
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '20vh', minWidth: '95vw' }}
                >
                    <Typography variant="h4" gutterBottom>
                        Tableau de Bord
                    </Typography>
                    <Grid container spacing={2}>
                        {/* {sensorData.map((sensor, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f5f5f5' }}>
                                    <Typography variant="h6" gutterBottom>
                                    ⛳ {sensor.name}
                                    </Typography>
                                    <Typography variant="body1">
                                    🌡️ Température : {sensor.temperature} °C
                                    </Typography>
                                    <Typography variant="body1">
                                    💧 Humidité : {sensor.humidity} %
                                    </Typography>
                                    <Typography variant="body1">
                                    🌱 Fertilité : {sensor.fertility}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))} */}
                        {
                            <>
                                <Grid item xs={12} sm={6} md={3} key={'a'}>
                                    <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#a8f7f7' }} key={sensorData.length}>
                                        <Typography variant="h6" gutterBottom>
                                            💧 Niveau d'humidité des parcelles: <b>47%</b>
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3} key={'b'}>
                                    <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f7a8a8' }} key={sensorData.length}>
                                        <Typography variant="h6" gutterBottom>
                                            🌡️ Température des parcelles: <b>24.3 °C</b>
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3} key={'c'}>
                                    <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f7d96d' }} key={sensorData.length}>
                                        <Typography variant="h6" gutterBottom>
                                            🌱 Niveau de fertilité des parcelles: <b>0.3</b>
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3} key={'d'}>
                                    <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#57d470' }} key={sensorData.length}>
                                        <Typography variant="h6" gutterBottom>
                                            🔄 Quantité d'eau économisée: <b>1821 L</b>
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </>
                        }
                    </Grid>
                </Grid>
            </Container>

            <Grid container spacing={2} justifyContent="center" overflow={'auto'}>
                <Grid item xs={12} sm={6} md={4} key={sensorData.length}>
                    <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="h5" gutterBottom>
                            ⛲ Consommation d'eau
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    dataKey="value"
                                    data={[
                                        { name: 'Eau prélevée', value: 327 },
                                        { name: 'Eau rejetée', value: 82 },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={80}
                                    fill="#8884d8"
                                >
                                    {
                                        [{ name: 'Eau prélevée', value: 327 }, { name: 'Eau rejetée', value: 82 }].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#66cd66' : '#ff6666'} />
                                        ))
                                    }
                                    <Tooltip />
                                </Pie>
                                <Legend />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={6} key={sensorData.length}>
                    <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="h5" gutterBottom>
                            💧 Niveau d'humidité des parcelles
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={factice_data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Bar dataKey="humidity" fill="#82ca9d" />
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4} key={sensorData.length}>
                    <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="h5" gutterBottom>
                            🌡️ Temperature Trends
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={factice_data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4} key={sensorData.length}>
                    <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="h5" gutterBottom>
                            🌱 Fertility Trends
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={factice_data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="fertility" stroke="#82ca9d" fill="#82ca9d" />
                                <Legend />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4} key={sensorData.length}>
                    <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="h5" gutterBottom>
                            💧 Humidity vs. Fertility
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart data={factice_data}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="humidity" name="Humidity" />
                                <YAxis type="number" dataKey="fertility" name="Fertility" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Parcels" data={factice_data} fill="#8884d8" />
                                <Legend />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>






            </Grid>
        </div>
    );
};

export default Dashboard;
