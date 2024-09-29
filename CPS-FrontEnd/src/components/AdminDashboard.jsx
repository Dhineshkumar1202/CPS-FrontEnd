import React, { useEffect, useState } from 'react';
import API from '../services/api';

function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState({
        placementDrives: [],
        applications: [],
    });

    useEffect(() => {
        const fetchPlacementDrives = async () => {
            try {
                const response = await API.get('/api/placement-drives');
                setDashboardData(prevData => ({
                    ...prevData,
                    placementDrives: response.data,
                }));
            } catch (error) {
                console.error('Error fetching placement drives:', error);
            }
        };

        const fetchApplications = async () => {
            try {
                const response = await API.get('/api/applications');
                setDashboardData(prevData => ({
                    ...prevData,
                    applications: response.data,
                }));
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchPlacementDrives();
        fetchApplications();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Placement Drives</h2>
            <ul>
                {dashboardData.placementDrives.map(drive => (
                    <li key={drive.id}>{drive.name}</li>
                ))}
            </ul>
            <h2>Applications</h2>
            <ul>
                {dashboardData.applications.map(application => (
                    <li key={application.id}>{application.applicant}</li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;
