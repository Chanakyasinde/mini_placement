import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../components/styles/global.css';

const CompanyDashboard = () => {
    const navigate = useNavigate();
    // const { companyName } = useParams(); // Removed useParams
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []); // Removed dependency on companyName

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('companyToken');

            if (!token) {
                setError('Please login to access dashboard');
                return;
            }

            const response = await fetch(`http://localhost:3000/api/company/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }

            const data = await response.json();
            setCompanyData(data.company);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleProfileClick = () => {
        navigate(`/company/profile`);
    };

    const handleAddJob = () => {
        // Placeholder for add job functionality
        alert('Add Job functionality coming soon!');
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
                <button style={styles.retryButton} onClick={fetchDashboardData}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header with Profile Button */}
            <div style={styles.header}>
                <div style={styles.logo}>PlacementHub</div>
                <button style={styles.profileButton} onClick={handleProfileClick}>
                    Company Profile
                </button>
            </div>

            {/* Welcome Section */}
            <div style={styles.welcomeSection}>
                <h1 style={styles.welcomeTitle}>Welcome, {companyData?.name}!</h1>
                <p style={styles.welcomeSubtitle}>
                    Manage your job postings and company profile
                </p>
            </div>

            {/* Dashboard Content */}
            <div style={styles.content}>
                {/* Active Jobs Section */}
                <div style={styles.jobsSection}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Active Jobs</h2>
                        <button style={styles.addJobButton} onClick={handleAddJob}>
                            + Add Job
                        </button>
                    </div>

                    {companyData?.jobsPosted && companyData.jobsPosted.length > 0 ? (
                        <div style={styles.jobsList}>
                            {companyData.jobsPosted.map((job, index) => (
                                <div key={job.jobId || index} style={styles.jobCard}>
                                    <div style={styles.jobInfo}>
                                        <h3 style={styles.jobTitle}>{job.jobTitle || 'Untitled Job'}</h3>
                                        <div style={styles.jobMeta}>
                                            <span style={styles.jobMetaItem}>
                                                {job.jobType || 'Full-time'}
                                            </span>
                                            <span style={styles.jobDivider}>•</span>
                                            <span style={styles.jobMetaItem}>
                                                {job.location || companyData.location}
                                            </span>
                                            {job.salary && (
                                                <>
                                                    <span style={styles.jobDivider}>•</span>
                                                    <span style={styles.jobMetaItem}>{job.salary}</span>
                                                </>
                                            )}
                                        </div>
                                        {job.description && (
                                            <p style={styles.jobDescription}>
                                                {job.description.substring(0, 150)}
                                                {job.description.length > 150 ? '...' : ''}
                                            </p>
                                        )}
                                    </div>
                                    <div style={styles.jobActions}>
                                        <button style={styles.editButton}>Edit</button>
                                        <button style={styles.viewButton}>View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.emptyState}>
                            <p style={styles.emptyStateText}>No active jobs posted yet</p>
                            <p style={styles.emptyStateSubtext}>
                                Click "Add Job" to post your first job opening
                            </p>
                        </div>
                    )}
                </div>

                {/* Company Info Card */}
                <div style={styles.infoCard}>
                    <h3 style={styles.infoTitle}>Company Information</h3>
                    <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                            <span style={styles.infoLabel}>Industry</span>
                            <span style={styles.infoValue}>{companyData?.industry || 'N/A'}</span>
                        </div>
                        <div style={styles.infoItem}>
                            <span style={styles.infoLabel}>Location</span>
                            <span style={styles.infoValue}>{companyData?.location || 'N/A'}</span>
                        </div>
                        <div style={styles.infoItem}>
                            <span style={styles.infoLabel}>Type</span>
                            <span style={styles.infoValue}>{companyData?.companyType || 'N/A'}</span>
                        </div>
                        <div style={styles.infoItem}>
                            <span style={styles.infoLabel}>Email</span>
                            <span style={styles.infoValue}>{companyData?.email || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        color: '#ffffff',
        fontFamily: "'Inter', sans-serif",
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 3rem',
        borderBottom: '1px solid #333333',
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
    addJobButton: {
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
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    jobInfo: {
        flex: 1,
    },
    jobTitle: {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
    },
    jobMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem',
    },
    jobMetaItem: {
        fontSize: '0.9rem',
        color: '#a3a3a3',
    },
    jobDivider: {
        color: '#666666',
    },
    jobDescription: {
        fontSize: '0.95rem',
        color: '#cccccc',
        lineHeight: '1.5',
    },
    jobActions: {
        display: 'flex',
        gap: '0.5rem',
    },
    editButton: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: '1px solid #333333',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontSize: '0.85rem',
        fontWeight: '500',
        cursor: 'pointer',
    },
    viewButton: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: '1px solid #333333',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontSize: '0.85rem',
        fontWeight: '500',
        cursor: 'pointer',
    },
    emptyState: {
        backgroundColor: '#1a1a1a',
        border: '1px solid #333333',
        borderRadius: '12px',
        padding: '3rem',
        textAlign: 'center',
    },
    emptyStateText: {
        fontSize: '1.1rem',
        color: '#ffffff',
        marginBottom: '0.5rem',
    },
    emptyStateSubtext: {
        fontSize: '0.95rem',
        color: '#a3a3a3',
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
};

export default CompanyDashboard;