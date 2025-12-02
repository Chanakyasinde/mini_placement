import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetails = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applying, setApplying] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        fetchJobDetails();
        checkApplicationStatus();
    }, [jobId]);

    const fetchJobDetails = async () => {
        try {
            const token = localStorage.getItem('studentToken');
            const response = await fetch(`http://localhost:3000/student/dashboard/jobsStudent`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch job details');
            }

            const data = await response.json();
            const jobsList = Array.isArray(data.data) ? data.data : [];
            const foundJob = jobsList.find(j => j.jobId === parseInt(jobId));

            if (!foundJob) {
                throw new Error('Job not found');
            }

            setJob(foundJob);
            setLoading(false);
        } catch (err) {
            console.error("Fetch Job Details Error:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    const checkApplicationStatus = async () => {
        try {
            const token = localStorage.getItem('studentToken');
            const response = await fetch(`http://localhost:3000/student/jobsApplied`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                const appliedJobs = data.data || [];
                const applied = appliedJobs.some(app => app.jobId === parseInt(jobId));
                setHasApplied(applied);
            }
        } catch (err) {
            console.error("Error checking application status:", err);
        }
    };

    const handleApply = async () => {
        if (hasApplied) {
            alert("You have already applied to this job.");
            return;
        }

        try {
            setApplying(true);
            const token = localStorage.getItem('studentToken');

            const response = await fetch('http://localhost:3000/student/apply', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jobId: parseInt(jobId) })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Applied successfully!");
                setHasApplied(true);
            } else {
                alert(data.message || 'Failed to apply');
            }
        } catch (err) {
            console.error("Apply Error:", err);
            alert('Error applying to job');
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingText}>Loading job details...</div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div style={styles.errorContainer}>
                <div style={styles.errorText}>{error || 'Job not found'}</div>
                <button style={styles.backButton} onClick={() => navigate('/student/dashboard')}>
                    Back to Dashboard
                </button>
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
                <div style={styles.mainCard}>
                    <h1 style={styles.jobTitle}>{job.jobTitle}</h1>

                    <div style={styles.metaRow}>
                        <div style={styles.metaItem}>
                            <span style={styles.metaLabel}>Company:</span>
                            <span style={styles.metaValue}>{job.company.companyName}</span>
                        </div>
                        <div style={styles.metaItem}>
                            <span style={styles.metaLabel}>Location:</span>
                            <span style={styles.metaValue}>{job.location || 'Remote'}</span>
                        </div>
                        {job.stipend && (
                            <div style={styles.metaItem}>
                                <span style={styles.metaLabel}>Stipend:</span>
                                <span style={styles.metaValue}>{job.stipend}</span>
                            </div>
                        )}
                    </div>

                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Job Description</h2>
                        <p style={styles.description}>{job.description || 'No description provided'}</p>
                    </div>

                    {job.skills && job.skills.length > 0 && (
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>Required Skills</h2>
                            <div style={styles.skillsContainer}>
                                {job.skills.map((skill, idx) => (
                                    <span key={idx} style={styles.skillTag}>{skill.skillName}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={styles.actionSection}>
                        <button
                            style={{
                                ...styles.applyButton,
                                backgroundColor: hasApplied ? '#555555' : '#ffffff',
                                color: hasApplied ? '#cccccc' : '#000000',
                                cursor: hasApplied || applying ? 'not-allowed' : 'pointer'
                            }}
                            onClick={handleApply}
                            disabled={hasApplied || applying}
                        >
                            {hasApplied ? "Already Applied" : applying ? "Applying..." : "Apply Now"}
                        </button>
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
        padding: '1.5rem 3rem',
        borderBottom: '1px solid #333333',
    },
    backButton: {
        background: 'transparent',
        border: '1px solid #333333',
        color: '#a3a3a3',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.2s',
    },
    content: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3rem 2rem',
    },
    mainCard: {
        backgroundColor: '#1a1a1a',
        border: '1px solid #333333',
        borderRadius: '12px',
        padding: '2.5rem',
    },
    jobTitle: {
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '1.5rem',
        color: '#ffffff',
    },
    metaRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        marginBottom: '2rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid #333333',
    },
    metaItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    },
    metaLabel: {
        fontSize: '0.85rem',
        color: '#a3a3a3',
        fontWeight: '500',
    },
    metaValue: {
        fontSize: '1rem',
        color: '#ffffff',
        fontWeight: '500',
    },
    section: {
        marginBottom: '2rem',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#ffffff',
    },
    description: {
        fontSize: '1rem',
        lineHeight: '1.8',
        color: '#cccccc',
        whiteSpace: 'pre-wrap',
    },
    skillsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
    },
    skillTag: {
        backgroundColor: '#333333',
        color: '#ffffff',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontSize: '0.9rem',
        fontWeight: '500',
    },
    actionSection: {
        marginTop: '2.5rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid #333333',
    },
    applyButton: {
        backgroundColor: '#ffffff',
        color: '#000000',
        border: 'none',
        padding: '1rem 3rem',
        borderRadius: '6px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        width: '100%',
        maxWidth: '300px',
    },
    loadingContainer: {
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#ffffff',
        fontSize: '1.2rem',
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
        color: '#ef4444',
        fontSize: '1.2rem',
    }
};

export default JobDetails;
