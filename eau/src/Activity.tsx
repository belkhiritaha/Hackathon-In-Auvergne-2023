import React, { useState } from 'react';
import { Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';

interface Activity {
    id: number;
    description: string;
}

const CompanyActivities: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [newActivity, setNewActivity] = useState<string>('');

    const handleAddActivity = () => {
        if (newActivity.trim() === '') return;

        const newId = activities.length + 1;
        const newActivityItem: Activity = {
            id: newId,
            description: newActivity,
        };

        setActivities([...activities, newActivityItem]);
        setNewActivity('');
    };

    return (
        <>
            <Card>
                <CardContent>
                    <ul>
                        {activities.map((activity) => (
                            <li key={activity.id}>{activity.description}</li>
                        ))}
                    </ul>
                    <TextField
                        label="Add Activity"
                        variant="outlined"
                        fullWidth
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddActivity}>
                        Add
                    </Button>
                </CardContent>
            </Card>
        </>
    );

    return (<div>Company Activities</div>);
};

export default CompanyActivities;
