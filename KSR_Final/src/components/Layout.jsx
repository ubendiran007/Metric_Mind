import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    DashboardIcon,
    TargetIcon,
    CalendarIcon,
    SettingsIcon,
    SearchIcon,
    BellIcon,
    HelpIcon,
} from './Icons';

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userBusinesses, setUserBusinesses] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [showNotifications, setShowNotifications] = React.useState(false);
    const [showQuery, setShowQuery] = React.useState(false);
    const [queryText, setQueryText] = React.useState('');
    const [queryResponse, setQueryResponse] = React.useState('');
    const [notifications, setNotifications] = React.useState([]);

    React.useEffect(() => {
        const businesses = JSON.parse(localStorage.getItem('userBusinesses') || '[]');
        setUserBusinesses(businesses);
        
        // Generate notifications
        const problems = JSON.parse(localStorage.getItem('decisionProblems') || '[]');
        const notifs = [];
        
        problems.forEach(problem => {
            const lastEntry = problem.entries[problem.entries.length - 1];
            const daysSinceLastEntry = lastEntry 
                ? Math.floor((new Date() - new Date(lastEntry.date)) / 86400000)
                : 0;
            
            if (problem.trackingMode === 'daily' && daysSinceLastEntry >= 1) {
                notifs.push({
                    id: `reminder-${problem.id}`,
                    type: 'reminder',
                    message: `Daily entry needed for ${problem.metric}`,
                    severity: 'warning'
                });
            } else if (problem.trackingMode === 'weekly' && daysSinceLastEntry >= 7) {
                notifs.push({
                    id: `reminder-${problem.id}`,
                    type: 'reminder',
                    message: `Weekly entry needed for ${problem.metric}`,
                    severity: 'warning'
                });
            }
            
            if (problem.performanceScore >= 85) {
                notifs.push({
                    id: `resolved-${problem.id}`,
                    type: 'resolved',
                    message: `${problem.metric} is now normal (${problem.performanceScore}%). Consider removing.`,
                    severity: 'success'
                });
            } else if (problem.performanceScore < 60) {
                notifs.push({
                    id: `danger-${problem.id}`,
                    type: 'danger',
                    message: `${problem.metric} is critical (${problem.performanceScore}%). Immediate action needed!`,
                    severity: 'danger'
                });
            }
        });
        
        setNotifications(notifs);
    }, [location]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Filter logic will be handled by individual pages
    };

    const handleQuerySubmit = () => {
        if (!queryText.trim()) return;
        
        // Simple AI response based on keywords
        let response = '';
        const q = queryText.toLowerCase();
        
        if (q.includes('dashboard') || q.includes('kpi') || q.includes('metric')) {
            response = 'The Dashboard shows your business KPIs with target vs achieved values. You can switch between businesses using tabs at the top.';
        } else if (q.includes('trend') || q.includes('analysis')) {
            response = 'Trend Analysis lets you track metrics over time. Select week/month view and choose metrics to visualize trends with charts.';
        } else if (q.includes('decision') || q.includes('intelligence') || q.includes('tracking')) {
            response = 'Decision Intelligence combines numeric values with your context. AI decides if issues need daily or weekly tracking based on severity (<70% = daily, ≥70% = weekly).';
        } else if (q.includes('business') || q.includes('add') || q.includes('create')) {
            response = 'Go to My Businesses to add new businesses. Choose from presets (Textile, Hospital, etc.) or create custom businesses with AI-generated metrics.';
        } else if (q.includes('entry') || q.includes('data') || q.includes('input')) {
            response = 'Add entries day-by-day or week-by-week with date selection. Each entry includes a value and context explaining what happened.';
        } else if (q.includes('notification') || q.includes('alert')) {
            response = 'Notifications remind you to add entries, alert you about critical issues (<60% score), and suggest removing resolved problems (>85% score).';
        } else {
            response = 'MetricMind helps you track business metrics with context. Use Dashboard for overview, Trend Analysis for patterns, and Decision Intelligence for problem tracking with AI suggestions.';
        }
        
        setQueryResponse(response);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-container">
                        <div className="logo-icon">MM</div>
                        <div className="logo-text">MetricMind</div>
                    </div>
                </div>

                <nav className="nav-menu">
                    <div className="nav-section">
                        <div className="nav-section-title">Business</div>
                        <Link to="/dashboard" className={`nav-item ${location.pathname.startsWith('/dashboard') ? 'active' : ''}`}>
                            <span className="nav-icon"><DashboardIcon size={20} /></span>
                            <span>Dashboard</span>
                        </Link>
                        <div 
                            onClick={() => {
                                window.location.href = '/job-selection';
                            }}
                            className={`nav-item ${location.pathname === '/job-selection' ? 'active' : ''}`}
                        >
                            <span className="nav-icon"><SettingsIcon size={20} /></span>
                            <span>My Businesses</span>
                        </div>
                    </div>

                    <div className="nav-section">
                        <div className="nav-section-title">Analytics</div>
                        <div 
                            onClick={() => {
                                window.location.href = '/analysis';
                            }}
                            className={`nav-item ${location.pathname === '/analysis' ? 'active' : ''}`}
                        >
                            <span className="nav-icon"><TargetIcon size={20} /></span>
                            <span>Trend Analysis</span>
                        </div>
                        <div 
                            onClick={() => {
                                window.location.href = '/history';
                            }}
                            className={`nav-item ${location.pathname === '/history' ? 'active' : ''}`}
                        >
                            <span className="nav-icon"><CalendarIcon size={20} /></span>
                            <span>Decision Intelligence</span>
                        </div>
                    </div>

                    <div className="nav-section">
                        <div className="nav-section-title">Settings</div>
                        <div 
                            onClick={() => {
                                window.location.href = '/settings';
                            }}
                            className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
                        >
                            <span className="nav-icon"><SettingsIcon size={20} /></span>
                            <span>About</span>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                {/* Top Bar */}
                <header className="top-bar">
                    <div className="top-bar-left">
                        <h1 className="page-title">MetricMind</h1>
                    </div>

                    <div className="top-bar-right">
                        <div className="search-box">
                            <span className="search-icon"><SearchIcon size={18} color="#94a3b8" /></span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search metrics, insights, decisions..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>

                        <button className="icon-button" onClick={() => setShowNotifications(!showNotifications)}>
                            <BellIcon size={20} color="#475569" />
                            {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
                        </button>

                        <button className="icon-button" onClick={() => setShowQuery(!showQuery)}>
                            <HelpIcon size={20} color="#475569" />
                        </button>

                        <div className="user-profile">
                            <div className="user-avatar">H</div>
                            <div className="user-info">
                                <div className="user-name">Team HackrrR</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="content-area">
                    {React.cloneElement(children, { searchQuery })}
                </div>

                {/* Notifications Panel */}
                {showNotifications && (
                    <div style={{
                        position: 'fixed',
                        top: '70px',
                        right: '20px',
                        width: '400px',
                        maxHeight: '500px',
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', color: '#1e293b' }}>Notifications</h3>
                            <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>×</button>
                        </div>
                        <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
                            {notifications.length === 0 ? (
                                <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No notifications</div>
                            ) : (
                                notifications.map(notif => (
                                    <div key={notif.id} style={{
                                        padding: '16px 20px',
                                        borderBottom: '1px solid #f1f5f9',
                                        borderLeft: `4px solid ${notif.severity === 'danger' ? '#ef4444' : notif.severity === 'warning' ? '#f59e0b' : '#10b981'}`
                                    }}>
                                        <div style={{ fontSize: '14px', color: '#1e293b', lineHeight: '1.5' }}>{notif.message}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Query Panel */}
                {showQuery && (
                    <div style={{
                        position: 'fixed',
                        top: '70px',
                        right: '20px',
                        width: '450px',
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', color: '#1e293b' }}>Ask AI Assistant</h3>
                            <button onClick={() => setShowQuery(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>×</button>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <textarea
                                value={queryText}
                                onChange={(e) => setQueryText(e.target.value)}
                                placeholder="Ask anything about MetricMind..."
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    resize: 'vertical',
                                    marginBottom: '12px'
                                }}
                            />
                            <button
                                onClick={handleQuerySubmit}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Ask AI
                            </button>
                            {queryResponse && (
                                <div style={{
                                    marginTop: '16px',
                                    padding: '16px',
                                    background: '#eff6ff',
                                    borderRadius: '8px',
                                    borderLeft: '4px solid #2563eb'
                                }}>
                                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>🤖 AI Response:</div>
                                    <div style={{ fontSize: '14px', color: '#1e3a8a', lineHeight: '1.6' }}>{queryResponse}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Layout;
