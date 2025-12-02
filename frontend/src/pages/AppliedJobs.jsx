import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/global.css';

const AppliedJobs = () => {
    const navigate = useNavigate();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAppliedJobs();
    }, []);

    const fetchAppliedJobs = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('studentToken');
            if (!token) {
                navigate('/');
                return;
            }

            const response = await fetch(`http://localhost:3000/student/jobsApplied`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            setAppliedJobs(data.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Fetch Applied Jobs Error:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingText}>Loading your applications...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button style={styles.backButton} onClick={() => navigate('/student/dashboard')}>
                    ← Back to Dashboard
                </button>
            </div>

            <div style={styles.content}>
                <h1 style={styles.pageTitle}>Your Applications</h1>

                {appliedJobs.length === 0 ? (
                    <div style={styles.emptyState}>
                        <p style={styles.emptyStateText}>You haven't applied to any jobs yet.</p>
                        <button style={styles.browseButton} onClick={() => navigate('/student/dashboard')}>Browse Jobs</button>
                    </div>
                ) : (
                    <div style={styles.jobsGrid}>
                        {appliedJobs.map((app, idx) => (
                            <div key={idx} style={styles.jobCard}>
                                <div style={styles.cardHeader}>
                                    <h3 style={styles.companyName}>{app.job?.company?.companyName || 'Company'}</h3>
                                    <span style={{
                                        ...styles.statusBadge,
                                        backgroundColor: app.status === 'Shortlisted' ? 'rgba(34, 197, 94, 0.2)' :
                                            app.status === 'Rejected' ? 'rgba(239, 68, 68, 0.2)' :
                                                'rgba(255, 255, 255, 0.1)',
                                        color: app.status === 'Shortlisted' ? '#22c55e' :
                                            app.status === 'Rejected' ? '#ef4444' :
                                                '#ffffff'
                                    }}>
                                        {app.status}
                                    </span>
                                </div>

                                <h4 style={styles.jobTitle}>{app.job?.jobTitle || 'Job Title'}</h4>

                                <div style={styles.detailsRow}>
                                    <span style={styles.detailLabel}>Applied on:</span>
                                    <span style={styles.detailValue}>{new Date().toLocaleDateString()}</span> {/* Placeholder if date not available */}
                                </div>

                                <button
                                    style={styles.viewButton}
                                    onClick={() => navigate(`/student/job/${app.jobId}`)}
                                >
                                    View Job Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
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
    backButton: {
        backgroundColor: '#333333',
        color: '#ffffff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
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
    },
    jobsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    jobCard: {
        backgroundColor: '#1a1a1a',
        border: '1px solid #333333',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    companyName: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#a3a3a3',
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '999px',
        fontSize: '0.8rem',
        fontWeight: '600',
    },
    jobTitle: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        color: '#ffffff',
    },
    detailsRow: {
        display: 'flex',
        gap: '0.5rem',
        fontSize: '0.9rem',
    },
    detailLabel: {
        color: '#a3a3a3',
    },
    detailValue: {
        color: '#e5e5e5',
    },
    viewButton: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: '1px solid #333333',
        padding: '0.75rem',
        borderRadius: '6px',
        marginTop: 'auto',
        cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#333333',
        }
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
    emptyState: {
        textAlign: 'center',
        padding: '4rem',
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        border: '1px solid #333333',
    },
    emptyStateText: {
        fontSize: '1.2rem',
        color: '#a3a3a3',
        marginBottom: '1.5rem',
    },
    browseButton: {
        backgroundColor: '#ffffff',
        color: '#000000',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '6px',
        fontWeight: '600',
        cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
    }
};

export default AppliedJobs;
