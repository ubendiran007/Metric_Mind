import React from 'react';
import { TargetIcon, LightbulbIcon, CheckCircleIcon, UsersIcon } from '../components/Icons';
import '../styles/dashboard.css';

const Settings = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">About InsightBridge</h1>
                    <p className="page-subtitle">Decision Intelligence Platform for Modern Managers</p>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="hero-card mb-lg">
                <div className="hero-icon">
                    <TargetIcon size={48} />
                </div>
                <h2 className="hero-title">Bridging Data and Intuition</h2>
                <p className="hero-text">
                    InsightBridge helps managers make better decisions by combining quantitative performance metrics
                    with contextual judgment and decision intuition. We believe the best decisions come from balancing
                    data-driven insights with human understanding of real-world context.
                </p>
            </div>

            {/* The Problem */}
            <div className="card mb-lg">
                <div className="card-header">
                    <h2 className="card-title">The Problem We Solve</h2>
                </div>
                <div className="problem-solution-grid">
                    <div className="problem-card">
                        <div className="problem-icon danger">❌</div>
                        <h4>Traditional Analytics</h4>
                        <ul>
                            <li>Focus only on numbers and metrics</li>
                            <li>Miss important contextual factors</li>
                            <li>Treat all deviations as equally important</li>
                            <li>Ignore manager's domain expertise</li>
                            <li>Generate generic recommendations</li>
                        </ul>
                    </div>
                    <div className="problem-card">
                        <div className="problem-icon success">✓</div>
                        <h4>InsightBridge Approach</h4>
                        <ul>
                            <li>Combines metrics with context</li>
                            <li>Captures real-world business factors</li>
                            <li>Distinguishes signal from noise</li>
                            <li>Integrates human judgment</li>
                            <li>Provides context-aware recommendations</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Key Features */}
            <div className="card mb-lg">
                <div className="card-header">
                    <h2 className="card-title">Key Features</h2>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon blue">
                            <TargetIcon size={32} />
                        </div>
                        <h3>Smart Anomaly Detection</h3>
                        <p>AI-powered pattern recognition that distinguishes genuine anomalies from normal noise using statistical analysis (2+ standard deviations).</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon green">
                            <LightbulbIcon size={32} />
                        </div>
                        <h3>Context Integration</h3>
                        <p>Capture and integrate real-world context like market conditions, strategic initiatives, and team situations into decision-making.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon orange">
                            <CheckCircleIcon size={32} />
                        </div>
                        <h3>Decision Confidence Scoring</h3>
                        <p>Get confidence scores (0-100%) for recommendations based on data quality, historical patterns, and context alignment.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon cyan">
                            <UsersIcon size={32} />
                        </div>
                        <h3>Historical Learning</h3>
                        <p>Learn from past decisions and outcomes to improve future recommendations and understand what works in your organization.</p>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="card mb-lg">
                <div className="card-header">
                    <h2 className="card-title">How InsightBridge Works</h2>
                </div>
                <div className="workflow-steps">
                    <div className="workflow-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h4>Monitor Performance</h4>
                            <p>Track KPIs and performance metrics across your organization in real-time.</p>
                        </div>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h4>Detect Anomalies</h4>
                            <p>AI identifies statistically significant deviations that require attention.</p>
                        </div>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h4>Add Context</h4>
                            <p>Managers provide real-world context and business factors behind the numbers.</p>
                        </div>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h4>Get Recommendations</h4>
                            <p>Receive AI-powered recommendations that combine data with your context.</p>
                        </div>
                    </div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-step">
                        <div className="step-number">5</div>
                        <div className="step-content">
                            <h4>Learn & Improve</h4>
                            <p>Track decision outcomes and continuously improve recommendation accuracy.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Innovation Highlights */}
            <div className="card mb-lg">
                <div className="card-header">
                    <h2 className="card-title">What Makes InsightBridge Innovative</h2>
                </div>
                <div className="innovation-list">
                    <div className="innovation-item">
                        <div className="innovation-number">1</div>
                        <div className="innovation-content">
                            <h4>Context-Aware AI</h4>
                            <p>Unlike traditional analytics that only look at numbers, InsightBridge integrates human context and business knowledge into AI recommendations, making them more accurate and actionable.</p>
                        </div>
                    </div>
                    <div className="innovation-item">
                        <div className="innovation-number">2</div>
                        <div className="innovation-content">
                            <h4>Signal vs. Noise Detection</h4>
                            <p>Advanced statistical analysis (standard deviation-based) helps managers focus on genuine anomalies rather than normal fluctuations, reducing alert fatigue.</p>
                        </div>
                    </div>
                    <div className="innovation-item">
                        <div className="innovation-number">3</div>
                        <div className="innovation-content">
                            <h4>Intuition + Data Balance</h4>
                            <p>Respects and integrates manager intuition and domain expertise alongside data, recognizing that the best decisions come from combining both.</p>
                        </div>
                    </div>
                    <div className="innovation-item">
                        <div className="innovation-number">4</div>
                        <div className="innovation-content">
                            <h4>Outcome-Based Learning</h4>
                            <p>Tracks decision outcomes over time to continuously improve recommendation accuracy and learn what works in your specific organizational context.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Technology Stack</h2>
                </div>
                <div className="tech-grid">
                    <div className="tech-item">
                        <strong>Frontend:</strong> React 19, React Router, Recharts
                    </div>
                    <div className="tech-item">
                        <strong>Backend:</strong> Node.js, Express
                    </div>
                    <div className="tech-item">
                        <strong>Styling:</strong> Custom CSS with Design System
                    </div>
                    <div className="tech-item">
                        <strong>Data Viz:</strong> Recharts, Custom SVG
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
