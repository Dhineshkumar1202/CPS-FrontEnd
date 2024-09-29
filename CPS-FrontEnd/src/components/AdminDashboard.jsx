import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newJob, setNewJob] = useState('');  // To create a new job listing

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/admin/applications');
        setApplications(response.data);
      } catch (err) {
        setError('Failed to load applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Create Job Listing
  const createJob = async () => {
    try {
      const response = await api.post('/admin/create-job', { title: newJob });
      alert('Job Created Successfully');
    } catch (err) {
      setError('Failed to create job.');
    }
  };

  // Approve or Reject Application
  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await api.put(`/admin/update-application/${applicationId}`, { status });
      setApplications(applications.map(app => app.id === applicationId ? { ...app, status } : app));
    } catch (err) {
      setError('Failed to update application status.');
    }
  };

  // Delete Application
  const deleteApplication = async (applicationId) => {
    try {
      await api.delete(`/admin/delete-application/${applicationId}`);
      setApplications(applications.filter(app => app.id !== applicationId));
    } catch (err) {
      setError('Failed to delete application.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Create Job Section */}
      <div className="mb-4">
        <input
          type="text"
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="Enter job title"
        />
        <button onClick={createJob} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Job
        </button>
      </div>
      
      {loading ? (
        <div>Loading applications...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Student Name</th>
                <th className="py-2 px-4 border">Job Title</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.id}>
                  <td className="py-2 px-4 border">{application.studentName}</td>
                  <td className="py-2 px-4 border">{application.jobTitle}</td>
                  <td className="py-2 px-4 border">{application.status}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'Approved')}
                      className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'Rejected')}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => deleteApplication(application.id)}
                      className="bg-gray-500 text-white px-4 py-1 rounded ml-2 hover:bg-gray-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
