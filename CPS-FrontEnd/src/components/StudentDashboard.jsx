import React from 'react'; // Import React
import { useState, useEffect } from 'react';
import api from '../services/api';

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentApplications = async () => {
      try {
        const response = await api.get('/student/applications');
        setApplications(response.data);
      } catch (err) {
        setError('Failed to load applications.');
        console.error(err); // Log error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchStudentApplications();
  }, []);

  // Delete Application
  const deleteApplication = async (applicationId) => {
    try {
      await api.delete(`/student/delete-application/${applicationId}`);
      setApplications(applications.filter(app => app.id !== applicationId));
    } catch (err) {
      setError('Failed to delete application.');
      console.error(err); // Log error for debugging
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      {loading ? (
        <div>Loading your applications...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Job Title</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">No applications found.</td>
                </tr>
              ) : (
                applications.map(({ id, jobTitle, status }) => (
                  <tr key={id}>
                    <td className="py-2 px-4 border">{jobTitle}</td>
                    <td className="py-2 px-4 border">{status}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => deleteApplication(id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
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

export default StudentDashboard;
