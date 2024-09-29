import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Student = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    const fetchApplications = async () => {
        try {
            const response = await axios.get('/api/applications');
           
            console.log('Applications response:', response.data);

            
            setApplications(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error('Error fetching applications:', err);
            setError('Failed to fetch applications');
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

   
    console.log('Applications state:', applications);

    return (
        <div className="container">
            <h1>Student Dashboard</h1>
            {error && <div className="error">{error}</div>}
            <div className="card">
                <h2>Your Applications</h2>
                {applications.length > 0 ? (
                    <ul>
                        {applications.map(application => (
                            <li key={application._id}>{application.driveName}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No applications found.</p>
                )}
            </div>
        </div>
    );
};

export default Student;
