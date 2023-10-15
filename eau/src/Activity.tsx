import CssBaseline from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'; // Import CardMedia for images
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';

interface Activity {
    _id: number;
    description: string;
    image: string;
    soil_type?: string | null;
    humidity?: number | null;
    temperature?: number | null;
    arosage?: number | null;
    quantity?: number | null;
}

const addActivityFetch = (activity: Activity) => {
    fetch('http://localhost:3000/activities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const modifyActivityFetch = (activity: Activity) => {
    fetch('http://localhost:3000/activities/' + activity._id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


const ActivityCard: React.FC<Activity> = (activity) => {
    const [isParamOpen, setIsParamOpen] = useState<boolean>(false);

    if (isParamOpen) return (
        <Card variant='outlined' style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f5f5f5' }} elevation={0} >
            <CardMedia component="img" height="140" image={activity.image} alt={activity.description} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {activity.description}
                </Typography>

                <Autocomplete disablePortal
                    id="combo-box-demo"
                    options={['Terre', 'Argile']}
                    defaultValue={activity.soil_type}
                    renderInput={(params) => <TextField {...params} label="Type de sol" />}
                    style={{ marginBottom: 16 }}
                    onChange={(event, value) => {
                        modifyActivityFetch({
                            ...activity,
                            soil_type: value,
                        });
                    }}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['1', '2', '3', '4', '5']}
                    defaultValue={activity.humidity}
                    renderInput={(params) => <TextField {...params} label="Humidité" />}
                    style={{ marginBottom: 16 }}
                    onChange={(event, value) => {
                        modifyActivityFetch({
                            ...activity,
                            humidity: value,
                        });
                    }}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['1', '2', '3', '4', '5']}
                    defaultValue={activity.temperature}
                    renderInput={(params) => <TextField {...params} label="Température" />}
                    style={{ marginBottom: 16 }}
                    onChange={(event, value) => {
                        modifyActivityFetch({
                            ...activity,
                            temperature: value,
                        });
                    }}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['1', '2', '3', '4', '5']}
                    defaultValue={activity.arosage}
                    renderInput={(params) => <TextField {...params} label="Arrosage" />}
                    style={{ marginBottom: 16 }}
                    onChange={(event, value) => {
                        modifyActivityFetch({
                            ...activity,
                            arosage: value,
                        });
                    }}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['1', '2', '3', '4', '5']}
                    defaultValue={activity.quantity}
                    renderInput={(params) => <TextField {...params} label="Quantité" />}
                    style={{ marginBottom: 16 }}
                    onChange={(event, value) => {
                        modifyActivityFetch({
                            ...activity,
                            quantity: value,
                        });
                    }}
                />
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => setIsParamOpen(!isParamOpen)}>Fermer</Button>
            </CardActions>
        </Card>
    );

    return (
        <Card variant='outlined' style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f5f5f5' }} elevation={0} >
            <CardMedia component="img" height="140" image={activity.image} alt={activity.description} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {activity.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => setIsParamOpen(!isParamOpen)}>Paramètres</Button>
            </CardActions>
        </Card>
    );
}

const CompanyActivities: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [newActivity, setNewActivity] = useState<string>('');
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        fetch('http://localhost:3000/activities')
            .then((res) => res.json())
            .then((data) => {
                setActivities(data);
            });
    }, [trigger]);

    const handleAddActivity = () => {
        if (newActivity.trim() === '') return;

        const newId = activities.length + 1;
        let activityImage = "";
        if (newActivity === "Blé") {
            activityImage = "/ble.jpg";
        } else if (newActivity === "Maïs") {
            activityImage = "/mais.jpg";
        } else if (newActivity === "Orge") {
            activityImage = "/orge.jpg";
        } else if (newActivity === "Aubergine") {
            activityImage = "/aubergine.jpeg";
        } else if (newActivity === "Carotte") {
            activityImage = "/carotte.jpg";
        } else if (newActivity === "Patate") {
            activityImage = "/patate.jpg";
        } else if (newActivity === "Tomate") {
            activityImage = "/tomate.jpg";
        } else {
            activityImage = "/unknown.svg.png";
        }
        const newActivityItem: Activity = {
            _id: newId,
            description: newActivity,
            image: activityImage,
        };

        setNewActivity('');
        addActivityFetch(newActivityItem);
        setTrigger(!trigger);
    };

    return (
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }} style={{ alignItems: 'center', justifyContent: 'center', overflowY: 'scroll', maxHeight: '90vh', marginTop: '10vh' }}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '20vh', minWidth: '99vw' }}>
                <Grid item xs={3} style={{ marginBottom: 16 }} justifyContent={'center'} alignItems={'center'}>
                    <Typography variant="h4" gutterBottom>
                        Activités
                    </Typography>
                    <Card variant='outlined' style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f5f5f5' }} elevation={0} >
                        <CardContent>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                value={newActivity}
                                onChange={(e) => setNewActivity(e.target.value)}
                                style={{ marginBottom: 16 }}
                            />
                            <Button variant="contained" color="primary" onClick={handleAddActivity}>
                                Ajouter une activité
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    {activities.map((activity) => (
                        <Grid item xs={12} sm={6} md={4} key={activity.id}>
                            <ActivityCard {...activity} />
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </Container>
    );
};

export default CompanyActivities;
