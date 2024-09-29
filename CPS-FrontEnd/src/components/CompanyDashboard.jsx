
import React, { useState, useEffect } from 'react';
import API from '../services/api';  

function CompanyDashboard() {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await API.get('/api/companies/dashboard');
        setCompanyData(response.data);
      } catch (err) {
        console.error('Error fetching company data:', err);
        setError('Failed to load company data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Company Dashboard</h1>
      <h2>Welcome, {companyData.name}</h2>
      <div>
        <h3>Active Job Postings</h3>
        <ul>
          {companyData.jobPostings.map((job) => (
            <li key={job.id}>
              {job.title} - {job.status}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Upcoming Interviews</h3>
        <ul>
          {companyData.interviews.map((interview) => (
            <li key={interview.id}>
              {interview.studentName} for {interview.jobTitle} on {interview.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CompanyDashboard;
