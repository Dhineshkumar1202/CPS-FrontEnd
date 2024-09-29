import React from 'react'; // Import React
import { useState, useEffect } from 'react';
import api from '../services/api';

const CompanyDashboard = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanyDrives = async () => {
      try {
        const response = await api.get('/company/drives');
        setDrives(response.data);
      } catch (err) {
        setError('Failed to load drives.');
        console.error(err); // Log error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDrives();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>
      {loading ? (
        <div>Loading your drives...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Drive Title</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drives.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">No drives found.</td>
                </tr>
              ) : (
                drives.map(drive => (
                  <tr key={drive.id}>
                    <td className="py-2 px-4 border">{drive.title}</td>
                    <td className="py-2 px-4 border">{drive.date}</td>
                    <td className="py-2 px-4 border">
                      <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
