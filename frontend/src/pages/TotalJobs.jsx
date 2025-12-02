import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/global.css';

const TotalJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Fetch from the public student endpoint
                const response = await fetch('http://localhost:3000/student/totalJobs');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const data = await response.json();
                setJobs(data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingText}>Loading available jobs...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.errorContainer}>
                <div style={styles.errorText}>Error: {error}</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.logo} onClick={() => navigate('/')}>PlacementHub</div>
                <div style={styles.headerButtons}>
                    <button style={styles.loginButton} onClick={() => navigate('/login')}>Login</button>
                    <button style={styles.signupButton} onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            </div>

            <div style={styles.content}>
                <h1 style={styles.pageTitle}>Explore All Jobs</h1>

                <div style={styles.jobsGrid}>
                    {jobs.map((job) => (
                        <div key={job.jobId || job._id} style={styles.jobCard}>
                            <div style={styles.cardHeader}>
                                <h3 style={styles.companyName}>{job.company?.companyName || 'Company'}</h3>
                                <button
                                    style={styles.applyButton}
                                    onClick={() => alert("You need to Login/Signup as a student to apply for this job")}
                                >
                                    Apply
                                </button>
                            </div>

                            <div style={styles.jobDetails}>
                                <div style={styles.detailRow}>
                                    <span style={styles.label}>Job Title:</span>
                                    <span style={styles.value}>{job.jobTitle || 'Untitled'}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <span style={styles.label}>Location:</span>
                                    <span style={styles.value}>{job.location || 'Remote'}</span>
                                </div>
                                {job.stipend && (
                                    <div style={styles.detailRow}>
                                        <span style={styles.label}>Stipend:</span>
                                        <span style={styles.value}>{job.stipend}</span>
                                    </div>
                                )}
                                <div style={styles.detailRow}>
                                    <span style={styles.label}>Posted on:</span>
                                    <span style={styles.value}>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}</span>
                                </div>
                            </div>

                            {job.description && (
                                <div style={styles.descriptionSection}>
                                    <span style={styles.label}>Description:</span>
                                    <p style={styles.description}>
                                        {job.description.substring(0, 150)}
                                        {job.description.length > 150 ? '...' : ''}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 3rem',
        borderBottom: '1px solid #333333',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    headerButtons: {
        display: 'flex',
        gap: '1rem',
    },
    loginButton: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: '1px solid #ffffff',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
    },
    signupButton: {
        backgroundColor: '#ffffff',
        color: '#000000',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem',
    },
    pageTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '2rem',
        textAlign: 'center',
    },
    jobsGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    jobCard: {
        backgroundColor: '#1a1a1a',
        border: '1px solid #333333',
        borderRadius: '12px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    companyName: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#ffffff',
    },
    applyButton: {
        backgroundColor: '#ffffff',
        color: '#000000',
        border: 'none',
        padding: '0.5rem 1.25rem',
        borderRadius: '6px',
        fontWeight: '600',
        cursor: 'pointer',
    },
    jobDetails: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
    },
    detailRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    },
    label: {
        fontSize: '0.9rem',
        color: '#a3a3a3',
        fontWeight: '600',
    },
    value: {
        fontSize: '1rem',
        color: '#e5e5e5',
    },
    descriptionSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    description: {
        color: '#cccccc',
        lineHeight: '1.5',
        fontSize: '0.95rem',
    },
    loadingContainer: {
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#a3a3a3',
        fontSize: '1.2rem',
    },
    errorContainer: {
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#ef4444',
        fontSize: '1.2rem',
    }
};

export default TotalJobs;