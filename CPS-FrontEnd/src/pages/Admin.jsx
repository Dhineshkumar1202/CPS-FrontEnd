import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [placementDrives, setPlacementDrives] = useState([]);

    const fetchPlacementDrives = async () => {
        const { data } = await axios.get('/api/placement-drives');
        setPlacementDrives(data);
    };

    useEffect(() => {
        fetchPlacementDrives();
    }, []);

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <div className="card">
                <h2>Placement Drives</h2>
                <ul>
                    {placementDrives.map(drive => (
                        <li key={drive._id}>{drive.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;
