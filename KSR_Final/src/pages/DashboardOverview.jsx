import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { kpiMetrics, performanceTrends, departmentData, anomalyAlerts } from '../data/mockData';
import {
    DollarIcon,
    CheckCircleIcon,
    ActivityIcon,
    TargetIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    AlertTriangleIcon,
    AlertCircleIcon,
    InfoIcon,
    CalendarIcon,
} from '../components/Icons';
import '../styles/dashboard.css';

const DashboardOverview = () => {
    const metrics = Object.values(kpiMetrics);
    const recentAlerts = anomalyAlerts.slice(0, 3);

    const getKPIIcon = (label) => {
        if (label.includes('Revenue')) return <DollarIcon size={24} />;
        if (label.includes('Satisfaction')) return <CheckCircleIcon size={24} />;
        if (label.includes('Productivity')) return <ActivityIcon size={24} />;
        if (label.includes('Accuracy')) return <TargetIcon size={24} />;
        return <ActivityIcon size={24} />;
    };

    const getKPIColor = (index) => {
        const colors = ['blue', 'green', 'orange', 'cyan'];
        return colors[index % colors.length];
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard Overview</h1>
                    <p className="page-subtitle">Real-time performance metrics and insights</p>
                </div>
                <div className="flex gap-md">
                    <Link to="/context" className="btn btn-secondary">Add Context</Link>
                    <Link to="/recommendations" className="btn btn-primary">View Recommendations</Link>
                </div>
            </div>

            {/* KPI Cards */}
            <section className="kpi-grid fade-in">
                {metrics.map((metric, index) => (
                    <div key={index} className="kpi-card">
                        <div className="kpi-header">
                            <div className={`kpi-icon ${getKPIColor(index)}`}>
                                {getKPIIcon(metric.label)}
                            </div>
                            <div className={`kpi-trend ${metric.trend > 0 ? 'positive' : 'negative'}`}>
                                {metric.trend > 0 ? <TrendingUpIcon size={14} /> : <TrendingDownIcon size={14} />}
                                <span>{Math.abs(metric.trend)}%</span>
                            </div>
                        </div>
                        <div className="kpi-label">{metric.label}</div>
                        <div className="kpi-value">
                            {metric.unit === '$' ? `$${(metric.value / 1000000).toFixed(1)}M` : `${metric.value}${metric.unit}`}
                        </div>
                        <div className="kpi-footer">
                            <CalendarIcon size={14} />
                            <span>{metric.period}</span>
                        </div>
                    </div>
                ))}
            </section>

            {/* Charts Section */}
            <div className="grid-2 mt-lg">
                {/* Performance Trends */}
                <div className="card fade-in">
                    <div className="card-header">
                        <div>
                            <h2 className="card-title">Performance Trends</h2>
                            <p className="card-subtitle">6-month performance overview</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={performanceTrends}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="month" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2} name="Satisfaction %" />
                                <Line type="monotone" dataKey="productivity" stroke="#2563eb" strokeWidth={2} name="Productivity %" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Department Comparison */}
                <div className="card fade-in">
                    <div className="card-header">
                        <div>
                            <h2 className="card-title">Department Performance</h2>
                            <p className="card-subtitle">Efficiency comparison across teams</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={departmentData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="efficiency" fill="#2563eb" name="Efficiency %" />
                                <Bar dataKey="productivity" fill="#10b981" name="Productivity %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Alerts */}
            <div className="card mt-lg fade-in">
                <div className="card-header">
                    <div>
                        <h2 className="card-title">Recent Anomalies</h2>
                        <p className="card-subtitle">AI-detected deviations requiring attention</p>
                    </div>
                    <Link to="/anomalies" className="btn btn-ghost">View All</Link>
                </div>
                <div className="alert-list">
                    {recentAlerts.map((alert) => (
                        <div key={alert.id} className={`alert-item ${alert.type}`}>
                            <div className="alert-icon">
                                {alert.type === 'warning' && <AlertTriangleIcon size={20} />}
                                {alert.type === 'danger' && <AlertCircleIcon size={20} />}
                                {alert.type === 'info' && <InfoIcon size={20} />}
                            </div>
                            <div className="alert-content">
                                <div className="alert-title">{alert.title}</div>
                                <div className="alert-description">{alert.description}</div>
                                <div className="alert-meta">
                                    {new Date(alert.timestamp).toLocaleString()} • {alert.priority}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
