import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Student = () => {
    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {
        const { data } = await axios.get('/api/applications');
        setApplications(data);
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div className="container">
            <h1>Student Dashboard</h1>
            <div className="card">
                <h2>Your Applications</h2>
                <ul>
                    {applications.map(application => (
                        <li key={application._id}>{application.driveName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Student;
