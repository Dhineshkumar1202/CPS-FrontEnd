import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Company = () => {
    const [drives, setDrives] = useState([]);

    const fetchDrives = async () => {
        const { data } = await axios.get('/api/company-drives');
        setDrives(data);
    };

    useEffect(() => {
        fetchDrives();
    }, []);

    return (
        <div className="container">
            <h1>Company Dashboard</h1>
            <div className="card">
                <h2>Placement Drives</h2>
                <ul>
                    {drives.map(drive => (
                        <li key={drive._id}>{drive.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Company;
