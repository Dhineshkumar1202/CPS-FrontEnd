import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Adjust the import path as needed

const Company = () => {
  const [drives, setDrives] = useState([]); // Initialize as an empty array
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await api.get('/placement-drives'); // Adjust the API endpoint as necessary
        setDrives(response.data); // Ensure response.data is an array
      } catch (error) {
        console.error('Error fetching drives:', error);
        setError('Could not fetch placement drives.');
      }
    };

    fetchDrives();
  }, []);

  return (
    <div>
      <h1>Placement Drives</h1>
      {error && <div className="error">{error}</div>}
      {Array.isArray(drives) && drives.length > 0 ? (
        drives.map((drive) => (
          <div key={drive.id}>{drive.name}</div> // Adjust according to your data structure
        ))
      ) : (
        <p>No placement drives available.</p>
      )}
    </div>
  );
};

export default Company;
