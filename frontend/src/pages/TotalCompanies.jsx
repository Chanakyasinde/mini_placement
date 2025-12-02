import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/global.css';

const TotalCompanies = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/company/getAllCompanies`);
                if (!response.ok) {
                    throw new Error('Failed to fetch companies');
                }
                const data = await response.json();
                setCompanies(data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching companies:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingText}>Loading companies...</div>
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
                <h1 style={styles.pageTitle}>Our Partner Companies</h1>

                <div style={styles.grid}>
                    {companies.map((company) => (
                        <div key={company.companyId} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <h3 style={styles.companyName}>{company.companyName || 'Company Name'}</h3>
                                <span style={{
                                    ...styles.statusBadge,
                                    backgroundColor: company.status ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: company.status ? '#4ade80' : '#f87171',
                                    borderColor: company.status ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                }}>
                                    {company.status ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <div style={styles.cardBody}>
                                <div style={styles.infoRow}>
                                    <span style={styles.label}>Location:</span>
                                    <span style={styles.value}>{company.location || 'N/A'}</span>
                                </div>
                                <div style={styles.infoRow}>
                                    <span style={styles.label}>Type:</span>
                                    <span style={styles.value}>{company.companyType || 'N/A'}</span>
                                </div>
                                <div style={styles.infoRow}>
                                    <span style={styles.label}>Jobs Posted:</span>
                                    <span style={styles.value}>{company._count?.jobs || 0}</span>
                                </div>
                                <div style={styles.infoRow}>
                                    <span style={styles.label}>Website:</span>
                                    <a
                                        href={company.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={styles.link}
                                    >
                                        {company.websiteUrl || 'N/A'}
                                    </a>
                                </div>
                            </div>

                            <button
                                style={styles.viewJobsButton}
                                onClick={() => alert("Please Login/Signup as a student to view all jobs from this company")}
                            >
                                See Total Jobs
                            </button>
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
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    card: {
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
        alignItems: 'start',
        marginBottom: '0.5rem',
    },
    companyName: {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#ffffff',
        margin: 0,
    },
    statusBadge: {
        fontSize: '0.8rem',
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        border: '1px solid',
        fontWeight: '500',
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1rem',
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    },
    label: {
        fontSize: '0.85rem',
        color: '#a3a3a3',
    },
    value: {
        fontSize: '0.95rem',
        color: '#e5e5e5',
    },
    link: {
        color: '#3b82f6',
        textDecoration: 'none',
        fontSize: '0.95rem',
    },
    viewJobsButton: {
        marginTop: 'auto',
        backgroundColor: '#ffffff',
        color: '#000000',
        border: 'none',
        padding: '0.75rem',
        borderRadius: '6px',
        fontWeight: '600',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.2s',
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

export default TotalCompanies;