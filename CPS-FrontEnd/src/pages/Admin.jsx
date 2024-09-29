import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Adjust the import path as needed

const Admin = () => {
  const [placementDrives, setPlacementDrives] = useState([]); // Initialize as an empty array
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlacementDrives = async () => {
      try {
        const response = await api.get('/placement-drives'); // Adjust the API endpoint as necessary
        setPlacementDrives(response.data); // Ensure response.data is an array
      } catch (error) {
        console.error('Error fetching placement drives:', error);
        setError('Could not fetch placement drives.');
      }
    };

    fetchPlacementDrives();
  }, []);

  return (
    <div>
      <h1>Placement Drives</h1>
      {error && <div className="error">{error}</div>}
      {Array.isArray(placementDrives) && placementDrives.length > 0 ? (
        placementDrives.map((drive) => (
          <div key={drive.id}>{drive.name}</div> // Adjust according to your data structure
        ))
      ) : (
        <p>No placement drives available.</p>
      )}
    </div>
  );
};

export default Admin;
