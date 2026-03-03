import React, { useState } from 'react';
import { historicalDecisions } from '../data/mockData';
import { CheckCircleIcon, AlertCircleIcon, CalendarIcon, TargetIcon } from '../components/Icons';
import '../styles/dashboard.css';

const HistoricalDecisions = () => {
    const [selectedDecision, setSelectedDecision] = useState(null);
    const [filterOutcome, setFilterOutcome] = useState('all');

    const filteredDecisions = filterOutcome === 'all'
        ? historicalDecisions
        : historicalDecisions.filter(d => d.outcome === filterOutcome);

    const getOutcomeIcon = (outcome) => {
        switch (outcome) {
            case 'success': return <CheckCircleIcon size={20} color="#10b981" />;
            case 'partial': return <AlertCircleIcon size={20} color="#f59e0b" />;
            case 'failure': return <AlertCircleIcon size={20} color="#ef4444" />;
            default: return <CheckCircleIcon size={20} />;
        }
    };

    const getOutcomeBadge = (outcome) => {
        switch (outcome) {
            case 'success': return 'success';
            case 'partial': return 'warning';
            case 'failure': return 'danger';
            default: return 'info';
        }
    };

    const getOutcomeLabel = (outcome) => {
        switch (outcome) {
            case 'success': return 'Success';
            case 'partial': return 'Partial Success';
            case 'failure': return 'Did Not Meet Goals';
            default: return outcome;
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Historical Decisions</h1>
                    <p className="page-subtitle">Learn from past decisions and their outcomes</p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="stats-grid mb-lg">
                <div className="stat-card success">
                    <div className="stat-value">{historicalDecisions.filter(d => d.outcome === 'success').length}</div>
                    <div className="stat-label">Successful Decisions</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-value">{historicalDecisions.filter(d => d.outcome === 'partial').length}</div>
                    <div className="stat-label">Partial Success</div>
                </div>
                <div className="stat-card info">
                    <div className="stat-value">
                        {Math.round(historicalDecisions.reduce((sum, d) => sum + d.confidence, 0) / historicalDecisions.length)}%
                    </div>
                    <div className="stat-label">Avg. Confidence</div>
                </div>
                <div className="stat-card primary">
                    <div className="stat-value">{historicalDecisions.length}</div>
                    <div className="stat-label">Total Decisions</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs mb-lg">
                <button
                    className={`filter-tab ${filterOutcome === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterOutcome('all')}
                >
                    All Decisions
                </button>
                <button
                    className={`filter-tab ${filterOutcome === 'success' ? 'active' : ''}`}
                    onClick={() => setFilterOutcome('success')}
                >
                    Successes
                </button>
                <button
                    className={`filter-tab ${filterOutcome === 'partial' ? 'active' : ''}`}
                    onClick={() => setFilterOutcome('partial')}
                >
                    Partial
                </button>
            </div>

            {/* Decisions Timeline */}
            <div className="decisions-timeline">
                {filteredDecisions.map((decision) => (
                    <div
                        key={decision.id}
                        className="timeline-item"
                        onClick={() => setSelectedDecision(decision)}
                    >
                        <div className="timeline-marker">
                            {getOutcomeIcon(decision.outcome)}
                        </div>
                        <div className="timeline-content">
                            <div className="timeline-header">
                                <div>
                                    <h3 className="timeline-title">{decision.title}</h3>
                                    <div className="timeline-meta">
                                        <CalendarIcon size={14} />
                                        {new Date(decision.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        <span className="separator">•</span>
                                        <span>{decision.category}</span>
                                    </div>
                                </div>
                                <div className="timeline-badges">
                                    <span className={`badge badge-${getOutcomeBadge(decision.outcome)}`}>
                                        {getOutcomeLabel(decision.outcome)}
                                    </span>
                                    <span className="confidence-badge-small">{decision.confidence}% confidence</span>
                                </div>
                            </div>

                            <div className="timeline-body">
                                <div className="decision-section">
                                    <strong>Context:</strong>
                                    <p>{decision.context}</p>
                                </div>

                                <div className="decision-section">
                                    <strong>Data Signals:</strong>
                                    <ul className="signals-list">
                                        {decision.dataSignals.map((signal, index) => (
                                            <li key={index}>{signal}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="decision-section">
                                    <strong>Intuition:</strong>
                                    <p className="intuition-text">{decision.intuition}</p>
                                </div>

                                <div className="decision-section">
                                    <strong>Decision Made:</strong>
                                    <p className="decision-made">{decision.decision}</p>
                                </div>

                                <div className="decision-section outcome-section">
                                    <strong>Actual Result:</strong>
                                    <p className={`outcome-text ${decision.outcome}`}>{decision.actualResult}</p>
                                </div>

                                <div className="lessons-learned">
                                    <div className="lessons-icon">
                                        <TargetIcon size={16} />
                                    </div>
                                    <div>
                                        <strong>Lessons Learned:</strong>
                                        <p>{decision.lessons}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Key Insights */}
            <div className="card mt-lg">
                <div className="card-header">
                    <h2 className="card-title">Key Insights from Historical Decisions</h2>
                </div>
                <div className="insights-grid">
                    <div className="insight-card">
                        <div className="insight-icon success">
                            <CheckCircleIcon size={24} />
                        </div>
                        <div className="insight-content">
                            <h4>High Confidence = High Success</h4>
                            <p>Decisions with 80%+ confidence had a 92% success rate</p>
                        </div>
                    </div>
                    <div className="insight-card">
                        <div className="insight-icon info">
                            <TargetIcon size={24} />
                        </div>
                        <div className="insight-content">
                            <h4>Context Matters</h4>
                            <p>Decisions with detailed context were 2.3x more likely to succeed</p>
                        </div>
                    </div>
                    <div className="insight-card">
                        <div className="insight-icon warning">
                            <AlertCircleIcon size={24} />
                        </div>
                        <div className="insight-content">
                            <h4>Trust Your Intuition</h4>
                            <p>When data and intuition aligned, success rate was 89%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoricalDecisions;
