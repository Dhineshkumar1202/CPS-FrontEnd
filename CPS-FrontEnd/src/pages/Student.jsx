import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Adjust the import path as needed

const Student = () => {
  const [applications, setApplications] = useState([]); // Initialize as an empty array
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/applications'); // Adjust the API endpoint as necessary
        setApplications(response.data); // Ensure response.data is an array
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Could not fetch applications.');
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h1>My Applications</h1>
      {error && <div className="error">{error}</div>}
      {Array.isArray(applications) && applications.length > 0 ? (
        applications.map((app) => (
          <div key={app.id}>{app.name}</div> // Adjust according to your data structure
        ))
      ) : (
        <p>No applications available.</p>
      )}
    </div>
  );
};

export default Student;
