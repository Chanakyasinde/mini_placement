import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/global.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); // ⬅ NEW: Store filtered jobs
  const [alreadyApplied, setAlreadyApplied] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Company Name'); // Default filter

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (!jobs.length) {
      setFilteredJobs([]);
      return;
    }

    const lowerTerm = searchTerm.toLowerCase().trim();
    if (!lowerTerm) {
      setFilteredJobs(jobs);
      return;
    }

    const filtered = jobs.filter(job => {
      if (filterType === 'Company Name') {
        return job.company.companyName?.toLowerCase().includes(lowerTerm);
      } else if (filterType === 'Location') {
        return job.location?.toLowerCase().includes(lowerTerm);
      } else if (filterType === 'Stipend') {
        return job.stipend?.toLowerCase().includes(lowerTerm);
      } else if (filterType === 'Skills') {
        // job.Skills is an array of strings
        return job.skills?.some(skill => skill.toLowerCase().includes(lowerTerm));
      }
      return false;
    });

    setFilteredJobs(filtered);
  }, [searchTerm, filterType, jobs]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('studentToken');
      if (!token) {
        setError('Please login to access dashboard');
        setLoading(false);
        return;
      }

      // Fetch student profile
      const profileResponse = await fetch(`http://localhost:3000/student/dashboard`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const profileData = await profileResponse.json();

      // Fetch available jobs
      const jobsResponse = await fetch(`http://localhost:3000/student/dashboard/jobsStudent`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const jobsData = await jobsResponse.json();
      console.log(jobsData);
      const jobsList = jobsData.data

      // Fetch applied jobs (NEW)
      const appliedRes = await fetch(`http://localhost:3000/student/jobsApplied`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const appliedData = await appliedRes.json();
      setAlreadyApplied(appliedData.data || []);

      setStudentData(profileData.data);
      setJobs(jobsList);
      setFilteredJobs(jobsList);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const getApplicationStatus = (jobId) => {
    const application = alreadyApplied.find(a => a.jobId === jobId);
    return application ? application.status : null;
  };

  const hasAlreadyApplied = (jobId) => !!getApplicationStatus(jobId);

  const handleProfileClick = () => navigate(`/student/profile`);

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    navigate('/');
  };

  const handleApply = async (jobId) => {
    if (hasAlreadyApplied(jobId)) {
      alert("You already applied to this job.");
      return;
    }

    try {
      setApplying(jobId);
      const token = localStorage.getItem('studentToken');

      const res = await fetch('http://localhost:3000/student/apply', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });

      const response = await res.json();
      if (res.ok) {
        alert("Applied successfully!");
        setAlreadyApplied(prev => [...prev, { jobId, status: 'Applied' }]);
      } else {
        alert(response.message || 'Failed to apply');
      }
    } catch (err) {
      console.error("Apply Error:", err);
      alert('Error applying to job');
    } finally {
      setApplying(null);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorText}>{error}</div>
        <button style={styles.retryButton} onClick={fetchDashboardData}>Retry</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img src="/job-search.png" alt="PlacementHub Logo" className="logo-icon" />
        <div style={styles.logo}>PlacementHub</div>
        <button style={{ ...styles.profileButton, marginLeft: 'auto', marginRight: '8px', backgroundColor: '#f6f3f3ff', transition: 'opacity 0.2s' }} onClick={handleLogout}>Log Out</button>
        <button style={styles.profileButton} onClick={handleProfileClick}>Student Profile</button>
      </div>

      {/* Welcome */}
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcomeTitle}>Welcome, {studentData?.studentName}!</h1>
        <p style={styles.welcomeSubtitle}>Find and apply to your dream jobs</p>
      </div>

      {/* Main Content */}
      <div style={styles.content}>

        {/* Jobs List */}
        <div style={styles.jobsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Available Jobs</h2>
          </div>

          {/* Search & Filter Component */}
          <div style={styles.searchContainer}>
            <select
              style={styles.filterDropdown}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="Company Name">Company Name</option>
              <option value="Location">Location</option>
              <option value="Stipend">Stipend</option>
              <option value="Skills">Skills</option>
            </select>

            <input
              type="text"
              placeholder={`Search by ${filterType}...`}
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.jobsList}>
            {filteredJobs.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyStateText}>No jobs found matching your search.</p>
              </div>
            ) : (
              filteredJobs.map(job => (
                <div key={job.jobId} style={styles.jobCard}>
                  <div
                    style={{ ...styles.jobInfo, cursor: 'pointer' }}
                    onClick={() => navigate(`/student/job/${job.jobId}`)}
                  >
                    <h3 style={styles.companyName}>{job.company.companyName || 'Company'}</h3>

                    <div style={styles.jobDetailsGrid}>
                      <div style={styles.jobDetailRow}>
                        <span style={styles.jobLabel}>Location:</span>
                        <span style={styles.jobValue}>{job.location || 'Remote'}</span>
                      </div>

                      <div style={styles.jobDetailRow}>
                        <span style={styles.jobLabel}>Job Title:</span>
                        <span style={styles.jobValue}>{job.jobTitle || 'Untitled Job'}</span>
                      </div>

                      {job.stipend && (
                        <div style={styles.jobDetailRow}>
                          <span style={styles.jobLabel}>Stipend:</span>
                          <span style={styles.jobValue}>{job.stipend}</span>
                        </div>
                      )}

                      <div style={styles.jobDetailRow}>
                        <span style={styles.jobLabel}>Status:</span>
                        <span style={{ ...styles.jobValue, color: job.isActive ? '#22c55e' : '#ef4444' }}>
                          {job.isActive ? 'Active' : 'Closed'}
                        </span>
                      </div>

                      <div style={styles.jobDetailRow}>
                        <span style={styles.jobLabel}>Posted on:</span>
                        <span style={styles.jobValue}>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>

                    {job.description && (
                      <div style={styles.descriptionSection}>
                        <span style={styles.jobLabel}>Description:</span>
                        <p style={styles.jobDescription}>
                          {job.description.substring(0, 150)}
                          {job.description.length > 150 ? '...' : ''}
                        </p>
                      </div>
                    )}

                    {job.skills && job.skills.length > 0 && (
                      <div style={styles.skillsSection}>
                        <span style={styles.jobLabel}>Skills Required:</span>
                        <div style={styles.skillsContainer}>
                          {job.skills.map((skill, idx) => (
                            <span key={idx} style={styles.skillTag}>{skill.skillName}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Apply Button */}
                  <button
                    style={{
                      ...styles.applyButton,
                      backgroundColor: hasAlreadyApplied(job.jobId) ?
                        (getApplicationStatus(job.jobId) === 'Shortlisted' ? '#22c55e' :
                          getApplicationStatus(job.jobId) === 'Rejected' ? '#ef4444' :
                            '#555555')
                        : '#ffffff',
                      color: hasAlreadyApplied(job.jobId) ? '#ffffff' : '#000000',
                      cursor: hasAlreadyApplied(job.jobId) ? 'default' : 'pointer',
                      opacity: hasAlreadyApplied(job.jobId) ? 0.9 : 1
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(job.jobId);
                    }}
                    disabled={hasAlreadyApplied(job.jobId) || applying === job.jobId}
                  >
                    {hasAlreadyApplied(job.jobId)
                      ? getApplicationStatus(job.jobId)
                      : applying === job.jobId
                        ? "Applying..."
                        : "Apply"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>Your Profile</h3>
          <h2 style={{ fontSize: '14px', textAlign: 'center', margin: '5px', color: '#de3c3c' }}> The information provided below will be sent to company when applied.</h2>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}><span style={styles.infoLabel}>Email</span><span style={styles.infoValue}>{studentData?.email}</span></div>
            <div style={styles.infoItem}><span style={styles.infoLabel}>Phone</span><span style={styles.infoValue}>{studentData?.phoneNumber}</span></div>
            <div style={styles.infoItem}><span style={styles.infoLabel}>College</span><span style={styles.infoValue}>{studentData?.college || 'N/A'}</span></div>
            <div style={styles.infoItem}><span style={styles.infoLabel}>CGPA</span><span style={styles.infoValue}>{studentData?.cgpa || 'N/A'}</span></div>
            <div style={styles.infoItem}><span style={styles.infoLabel}>Year of Passing</span><span style={styles.infoValue}>{studentData?.yearOfPassing || 'N/A'}</span></div>
          </div>
        </div>

      </div>
    </div>
  );
};

// (Your same styles object unchanged)

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f0f0f',
    color: '#ffffff',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem 3rem',
    borderBottom: '1px solid #333333',
    justifyContent: 'flex-start',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#ffffff',
    color: '#000000',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  welcomeSection: {
    padding: '4rem 3rem 2rem',
    textAlign: 'center',
  },
  welcomeTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
  },
  welcomeSubtitle: {
    fontSize: '1.25rem',
    color: '#a3a3a3',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 3rem',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
  },
  jobsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: '600',
  },
  jobsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  jobCard: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333333',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column', // Changed to column
    gap: '1rem',
    transition: 'border-color 0.2s',
  },
  jobInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  companyName: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  jobDetailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  jobDetailRow: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  jobLabel: {
    fontSize: '0.9rem',
    color: '#a3a3a3',
    fontWeight: '600',
  },
  jobValue: {
    fontSize: '0.95rem',
    color: '#e5e5e5',
  },
  descriptionSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  jobDescription: {
    fontSize: '0.95rem',
    color: '#cccccc',
    lineHeight: '1.5',
  },
  skillsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  skillsContainer: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#333333',
    color: '#ffffff',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
  },
  applyButton: {
    backgroundColor: '#ffffff',
    color: '#000000',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%', // Full width button
    marginTop: '0.5rem',
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333333',
    borderRadius: '12px',
    padding: '1.5rem',
    height: 'fit-content',
  },
  infoTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  infoLabel: {
    fontSize: '0.85rem',
    color: '#a3a3a3',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: '1rem',
    color: '#ffffff',
  },
  loadingContainer: {
    minHeight: '100vh',
    backgroundColor: '#0f0f0f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: '1.25rem',
    color: '#a3a3a3',
  },
  errorContainer: {
    minHeight: '100vh',
    backgroundColor: '#0f0f0f',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  },
  errorText: {
    fontSize: '1.25rem',
    color: '#ef4444',
  },
  retryButton: {
    backgroundColor: '#ffffff',
    color: '#000000',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
    color: '#a3a3a3',
  },
  emptyStateText: {
    fontSize: '1.1rem',
  },
  searchContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  filterDropdown: {
    padding: '0.75rem',
    borderRadius: '8px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    border: '1px solid #333333',
    fontSize: '0.95rem',
    outline: 'none',
    cursor: 'pointer',
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '8px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    border: '1px solid #333333',
    fontSize: '0.95rem',
    outline: 'none',
  }
};

export default StudentDashboard;
