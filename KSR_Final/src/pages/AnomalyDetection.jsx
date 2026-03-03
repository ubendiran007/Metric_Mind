import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { anomalyAlerts } from '../data/mockData';
import {
    AlertTriangleIcon,
    AlertCircleIcon,
    InfoIcon,
    CalendarIcon,
    TargetIcon,
} from '../components/Icons';
import '../styles/dashboard.css';

const AnomalyDetection = () => {
    const [filter, setFilter] = useState('all');
    const [selectedAlert, setSelectedAlert] = useState(null);

    const filteredAlerts = filter === 'all'
        ? anomalyAlerts
        : anomalyAlerts.filter(alert => alert.type === filter);

    const getAlertIcon = (type) => {
        switch (type) {
            case 'warning': return <AlertTriangleIcon size={24} />;
            case 'danger': return <AlertCircleIcon size={24} />;
            case 'info': return <InfoIcon size={24} />;
            default: return <InfoIcon size={24} />;
        }
    };

    const getSeverityBadge = (severity) => {
        const colors = {
            critical: 'danger',
            high: 'warning',
            medium: 'warning',
            low: 'info'
        };
        return colors[severity] || 'info';
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Anomaly Detection</h1>
                    <p className="page-subtitle">AI-powered pattern recognition and deviation analysis</p>
                </div>
                <Link to="/context" className="btn btn-primary">Add Context to Alert</Link>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs mb-lg">
                <button
                    className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Alerts ({anomalyAlerts.length})
                </button>
                <button
                    className={`filter-tab ${filter === 'danger' ? 'active' : ''}`}
                    onClick={() => setFilter('danger')}
                >
                    Critical ({anomalyAlerts.filter(a => a.type === 'danger').length})
                </button>
                <button
                    className={`filter-tab ${filter === 'warning' ? 'active' : ''}`}
                    onClick={() => setFilter('warning')}
                >
                    Warning ({anomalyAlerts.filter(a => a.type === 'warning').length})
                </button>
                <button
                    className={`filter-tab ${filter === 'info' ? 'active' : ''}`}
                    onClick={() => setFilter('info')}
                >
                    Info ({anomalyAlerts.filter(a => a.type === 'info').length})
                </button>
            </div>

            {/* Anomaly Detection Explanation */}
            <div className="info-banner mb-lg">
                <div className="info-icon">
                    <TargetIcon size={20} />
                </div>
                <div>
                    <strong>How Anomaly Detection Works:</strong> Our AI analyzes historical patterns and identifies deviations that are statistically significant (typically 2+ standard deviations from the mean). This helps distinguish genuine anomalies from normal noise.
                </div>
            </div>

            {/* Alerts Grid */}
            <div className="anomaly-grid">
                {filteredAlerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`anomaly-card ${alert.type}`}
                        onClick={() => setSelectedAlert(alert)}
                    >
                        <div className="anomaly-header">
                            <div className={`anomaly-icon-large ${alert.type}`}>
                                {getAlertIcon(alert.type)}
                            </div>
                            <div className="anomaly-badges">
                                <span className={`badge badge-${getSeverityBadge(alert.severity)}`}>
                                    {alert.severity.toUpperCase()}
                                </span>
                                {alert.actionRequired && (
                                    <span className="badge badge-action">Action Required</span>
                                )}
                                {alert.contextAdded && (
                                    <span className="badge badge-success">Context Added</span>
                                )}
                            </div>
                        </div>

                        <h3 className="anomaly-title">{alert.title}</h3>
                        <p className="anomaly-description">{alert.description}</p>

                        <div className="anomaly-meta-grid">
                            <div className="meta-item">
                                <div className="meta-label">Metric</div>
                                <div className="meta-value">{alert.metric}</div>
                            </div>
                            <div className="meta-item">
                                <div className="meta-label">Deviation</div>
                                <div className="meta-value deviation">{alert.deviation}</div>
                            </div>
                            <div className="meta-item">
                                <div className="meta-label">Department</div>
                                <div className="meta-value">{alert.department}</div>
                            </div>
                            <div className="meta-item">
                                <div className="meta-label">Detected</div>
                                <div className="meta-value">
                                    <CalendarIcon size={14} />
                                    {new Date(alert.timestamp).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        {!alert.contextAdded && (
                            <Link
                                to="/context"
                                className="btn btn-secondary btn-block mt-md"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Add Context
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {/* Selected Alert Modal (if needed) */}
            {selectedAlert && (
                <div className="modal-overlay" onClick={() => setSelectedAlert(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedAlert.title}</h2>
                            <button className="modal-close" onClick={() => setSelectedAlert(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Full Description:</strong></p>
                            <p>{selectedAlert.description}</p>
                            <p className="mt-md"><strong>Recommended Action:</strong></p>
                            <p>Review the context and add any relevant business information that might explain this deviation.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedAlert(null)}>Close</button>
                            <Link to="/context" className="btn btn-primary">Add Context</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnomalyDetection;
