import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { decisionRecommendations } from '../data/mockData';
import { TargetIcon, CheckCircleIcon, AlertTriangleIcon, LightbulbIcon } from '../components/Icons';
import '../styles/dashboard.css';

const DecisionRecommendations = () => {
    const [selectedRecommendation, setSelectedRecommendation] = useState(decisionRecommendations[0]);

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'high': return 'danger';
            case 'medium': return 'warning';
            case 'low': return 'info';
            default: return 'info';
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">AI Decision Recommendations</h1>
                    <p className="page-subtitle">Data-driven insights combined with your contextual input</p>
                </div>
                <Link to="/context" className="btn btn-secondary">Update Context</Link>
            </div>

            <div className="grid-3-1">
                {/* Recommendations List */}
                <div className="recommendations-sidebar">
                    <h3 className="sidebar-title">Active Recommendations</h3>
                    {decisionRecommendations.map((rec) => (
                        <div
                            key={rec.id}
                            className={`recommendation-item ${selectedRecommendation.id === rec.id ? 'active' : ''}`}
                            onClick={() => setSelectedRecommendation(rec)}
                        >
                            <div className="rec-item-header">
                                <span className={`badge badge-${getUrgencyColor(rec.urgency)}`}>
                                    {rec.urgency.toUpperCase()}
                                </span>
                                <span className="confidence-badge">{rec.confidence}%</span>
                            </div>
                            <h4 className="rec-item-title">{rec.title}</h4>
                            <p className="rec-item-category">{rec.category}</p>
                        </div>
                    ))}
                </div>

                {/* Selected Recommendation Detail */}
                <div className="recommendation-detail">
                    <div className="decision-card">
                        <div className="decision-header-large">
                            <div>
                                <span className={`badge badge-${getUrgencyColor(selectedRecommendation.urgency)} badge-lg`}>
                                    {selectedRecommendation.urgency.toUpperCase()} PRIORITY
                                </span>
                                <h2 className="decision-title-large">{selectedRecommendation.title}</h2>
                                <p className="decision-category">{selectedRecommendation.category}</p>
                            </div>
                        </div>

                        {/* Confidence Score */}
                        <div className="confidence-score">
                            <div className="confidence-label">
                                <TargetIcon size={20} />
                                Decision Confidence Score
                            </div>
                            <div className="confidence-value">
                                <div className="confidence-number">{selectedRecommendation.confidence}%</div>
                                <div className="confidence-bar">
                                    <div
                                        className="confidence-fill"
                                        style={{ width: `${selectedRecommendation.confidence}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendation Description */}
                        <div className="recommendation-content">
                            <h3 className="section-title">
                                <LightbulbIcon size={20} />
                                Recommended Action
                            </h3>
                            {selectedRecommendation.description.map((para, index) => (
                                <p key={index} className="recommendation-text">{para}</p>
                            ))}
                        </div>

                        {/* Data Factors */}
                        <div className="factors-section">
                            <h3 className="section-title">Data-Driven Factors</h3>
                            <div className="recommendation-factors">
                                {selectedRecommendation.dataFactors.map((factor, index) => (
                                    <div key={index} className="factor-item">
                                        <div className="factor-header">
                                            <div className="factor-icon">
                                                <CheckCircleIcon size={16} />
                                            </div>
                                            <strong>{factor.label}</strong>
                                            <span className="factor-weight">{(factor.weight * 100).toFixed(0)}% weight</span>
                                        </div>
                                        <div className="factor-text">{factor.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Context Factors */}
                        <div className="factors-section">
                            <h3 className="section-title">Contextual Factors Considered</h3>
                            <ul className="context-factors-list">
                                {selectedRecommendation.contextFactors.map((factor, index) => (
                                    <li key={index}>{factor}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Estimated Impact */}
                        <div className="impact-section">
                            <h3 className="section-title">Estimated Impact</h3>
                            <div className="impact-grid">
                                <div className="impact-card">
                                    <div className="impact-label">Revenue Impact</div>
                                    <div className="impact-value positive">{selectedRecommendation.estimatedImpact.revenue}</div>
                                </div>
                                <div className="impact-card">
                                    <div className="impact-label">Key Metric</div>
                                    <div className="impact-value positive">{selectedRecommendation.estimatedImpact.retention || selectedRecommendation.estimatedImpact.capacity}</div>
                                </div>
                                <div className="impact-card">
                                    <div className="impact-label">Timeline</div>
                                    <div className="impact-value">{selectedRecommendation.estimatedImpact.timeline}</div>
                                </div>
                            </div>
                        </div>

                        {/* Risks */}
                        <div className="risks-section">
                            <h3 className="section-title">
                                <AlertTriangleIcon size={20} />
                                Potential Risks
                            </h3>
                            <ul className="risks-list">
                                {selectedRecommendation.risks.map((risk, index) => (
                                    <li key={index}>{risk}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Alternatives */}
                        <div className="alternatives-section">
                            <h3 className="section-title">Alternative Approaches</h3>
                            <div className="alternatives-list">
                                {selectedRecommendation.alternatives.map((alt, index) => (
                                    <div key={index} className="alternative-item">
                                        <span className="alternative-number">{index + 1}</span>
                                        <span>{alt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="decision-actions">
                            <button className="btn btn-secondary">Request More Analysis</button>
                            <button className="btn btn-secondary">View Alternatives</button>
                            <button className="btn btn-primary btn-lg">Approve & Implement</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecisionRecommendations;
