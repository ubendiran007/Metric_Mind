import React from 'react';
import TrendChart from './TrendChart';
import {
  DashboardIcon,
  ChartIcon,
  TargetIcon,
  SearchIcon,
  BoltIcon,
  LightbulbIcon,
  UsersIcon,
  SettingsIcon,
  BellIcon,
  HelpIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  InfoIcon,
  CheckCircleIcon,
  CalendarIcon,
  DollarIcon,
  ActivityIcon,
} from './Icons';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">IB</div>
            <div className="logo-text">InsightBridge</div>
          </div>
        </div>

        <nav className="nav-menu">
          <div className="nav-section">
            <div className="nav-section-title">Main</div>
            <a href="#" className="nav-item active">
              <span className="nav-icon"><DashboardIcon size={20} /></span>
              <span>Dashboard</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon"><ChartIcon size={20} /></span>
              <span>Analytics</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon"><TargetIcon size={20} /></span>
              <span>Decisions</span>
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Insights</div>
            <a href="#" className="nav-item">
              <span className="nav-icon"><SearchIcon size={20} /></span>
              <span>Smart Metrics</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon"><BoltIcon size={20} /></span>
              <span>Anomalies</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon"><LightbulbIcon size={20} /></span>
              <span>Recommendations</span>
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Management</div>
            <a href="#" className="nav-item">
              <span className="nav-icon"><UsersIcon size={20} /></span>
              <span>Team</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon"><SettingsIcon size={20} /></span>
              <span>Settings</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <h1 className="page-title">Decision Intelligence Dashboard</h1>
          </div>

          <div className="top-bar-right">
            <div className="search-box">
              <span className="search-icon"><SearchIcon size={18} color="#94a3b8" /></span>
              <input
                type="text"
                className="search-input"
                placeholder="Search metrics, insights, decisions..."
              />
            </div>

            <button className="icon-button">
              <BellIcon size={20} color="#475569" />
              <span className="notification-badge">3</span>
            </button>

            <button className="icon-button">
              <HelpIcon size={20} color="#475569" />
            </button>

            <div className="user-profile">
              <div className="user-avatar">SM</div>
              <div className="user-info">
                <div className="user-name">Sarah Mitchell</div>
                <div className="user-role">Senior Manager</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          {/* KPI Cards Section */}
          <section className="kpi-grid fade-in">
            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon blue">
                  <DollarIcon size={24} />
                </div>
                <div className="kpi-trend positive">
                  <TrendingUpIcon size={14} />
                  <span>12.5%</span>
                </div>
              </div>
              <div className="kpi-label">Revenue Performance</div>
              <div className="kpi-value">$2.4M</div>
              <div className="kpi-footer">
                <CalendarIcon size={14} />
                <span>vs. last quarter</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon green">
                  <CheckCircleIcon size={24} />
                </div>
                <div className="kpi-trend positive">
                  <TrendingUpIcon size={14} />
                  <span>8.3%</span>
                </div>
              </div>
              <div className="kpi-label">Customer Satisfaction</div>
              <div className="kpi-value">94.2%</div>
              <div className="kpi-footer">
                <CalendarIcon size={14} />
                <span>30-day average</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon orange">
                  <ActivityIcon size={24} />
                </div>
                <div className="kpi-trend negative">
                  <TrendingDownIcon size={14} />
                  <span>3.1%</span>
                </div>
              </div>
              <div className="kpi-label">Team Productivity</div>
              <div className="kpi-value">87.5%</div>
              <div className="kpi-footer">
                <CalendarIcon size={14} />
                <span>This week</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon cyan">
                  <TargetIcon size={24} />
                </div>
                <div className="kpi-trend positive">
                  <TrendingUpIcon size={14} />
                  <span>15.7%</span>
                </div>
              </div>
              <div className="kpi-label">Decision Accuracy</div>
              <div className="kpi-value">91.8%</div>
              <div className="kpi-footer">
                <CalendarIcon size={14} />
                <span>Based on 247 decisions</span>
              </div>
            </div>
          </section>

          {/* Main Grid Layout */}
          <div className="grid-2 mt-lg">
            {/* Smart Metrics Overview */}
            <div className="card fade-in">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Smart Metrics Overview</h2>
                  <p className="card-subtitle">Performance trends with contextual analysis</p>
                </div>
                <button className="btn btn-ghost">View All</button>
              </div>
              <div className="chart-container">
                <TrendChart height={320} color="#2563eb" />
              </div>
            </div>

            {/* Anomaly Alerts */}
            <div className="card fade-in">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Anomaly Alerts</h2>
                  <p className="card-subtitle">AI-detected patterns requiring attention</p>
                </div>
                <button className="btn btn-ghost">Manage</button>
              </div>
              <div className="alert-list">
                <div className="alert-item warning">
                  <div className="alert-icon">
                    <AlertTriangleIcon size={20} />
                  </div>
                  <div className="alert-content">
                    <div className="alert-title">Unusual Spike in Customer Churn</div>
                    <div className="alert-description">
                      Churn rate increased by 18% in the enterprise segment over the past 2 weeks
                    </div>
                    <div className="alert-meta">Detected 2 hours ago • High Priority</div>
                  </div>
                </div>

                <div className="alert-item danger">
                  <div className="alert-icon">
                    <AlertCircleIcon size={20} />
                  </div>
                  <div className="alert-content">
                    <div className="alert-title">Budget Variance Alert</div>
                    <div className="alert-description">
                      Marketing spend is 23% over budget for Q1 with 3 weeks remaining
                    </div>
                    <div className="alert-meta">Detected 5 hours ago • Critical</div>
                  </div>
                </div>

                <div className="alert-item info">
                  <div className="alert-icon">
                    <InfoIcon size={20} />
                  </div>
                  <div className="alert-content">
                    <div className="alert-title">Positive Trend Identified</div>
                    <div className="alert-description">
                      Customer support response time improved by 34% after recent process changes
                    </div>
                    <div className="alert-meta">Detected 1 day ago • Informational</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Context Input Panel */}
          <div className="card mt-lg fade-in">
            <div className="card-header">
              <div>
                <h2 className="card-title">Context Explanation</h2>
                <p className="card-subtitle">Add human judgment and situational context to enhance AI recommendations</p>
              </div>
            </div>

            <div className="context-panel">
              <div className="context-input-group">
                <label className="context-label">What contextual factors should we consider?</label>
                <textarea
                  className="context-textarea"
                  placeholder="E.g., We're launching a new product next month, there's a seasonal trend in Q2, our main competitor just raised prices, we have budget constraints this quarter..."
                ></textarea>
              </div>

              <div className="context-input-group">
                <label className="context-label">Quick Context Tags</label>
                <div className="context-tags">
                  <span className="context-tag">🚀 Product Launch</span>
                  <span className="context-tag">📅 Seasonal Trend</span>
                  <span className="context-tag">💰 Budget Constraint</span>
                  <span className="context-tag">👥 Team Changes</span>
                  <span className="context-tag">🏢 Market Shift</span>
                  <span className="context-tag">⚡ Urgent Priority</span>
                  <span className="context-tag">🎯 Strategic Initiative</span>
                </div>
              </div>

              <div className="flex-between mt-lg">
                <button className="btn btn-secondary">Save Context</button>
                <button className="btn btn-primary">Generate Recommendation</button>
              </div>
            </div>
          </div>

          {/* AI Decision Recommendation */}
          <div className="decision-card mt-lg fade-in">
            <div className="card-header">
              <div>
                <h2 className="card-title">AI-Powered Decision Recommendation</h2>
                <p className="card-subtitle">Data-driven insights combined with your contextual input</p>
              </div>
            </div>

            <div className="confidence-score">
              <div className="confidence-label">Decision Confidence Score</div>
              <div className="confidence-value">
                <div className="confidence-number">87%</div>
                <div className="confidence-bar">
                  <div className="confidence-fill" style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>

            <div className="recommendation-content">
              <h3 className="recommendation-title">
                💡 Recommended Action: Reallocate Marketing Budget & Implement Customer Retention Program
              </h3>
              <p className="recommendation-text">
                Based on the detected churn spike in the enterprise segment and current budget variance, we recommend immediately shifting 15% of your marketing budget from acquisition to retention initiatives. The data shows that enterprise customers who receive proactive outreach within 48 hours of showing disengagement signals have a 67% higher retention rate.
              </p>
              <p className="recommendation-text">
                Given your upcoming product launch context, this retention focus will ensure you maintain a stable customer base while preparing for new customer acquisition post-launch. The seasonal Q2 trend historically shows 22% higher customer engagement, making this an optimal time for retention campaigns.
              </p>

              <div className="recommendation-factors">
                <div className="factor-item">
                  <div className="factor-icon">
                    <CheckCircleIcon size={16} />
                  </div>
                  <div className="factor-text">
                    <strong>Data Signal:</strong> 18% churn increase detected
                  </div>
                </div>
                <div className="factor-item">
                  <div className="factor-icon">
                    <CheckCircleIcon size={16} />
                  </div>
                  <div className="factor-text">
                    <strong>Historical Pattern:</strong> 67% retention improvement with early intervention
                  </div>
                </div>
                <div className="factor-item">
                  <div className="factor-icon">
                    <CheckCircleIcon size={16} />
                  </div>
                  <div className="factor-text">
                    <strong>Your Context:</strong> Product launch timing considered
                  </div>
                </div>
                <div className="factor-item">
                  <div className="factor-icon">
                    <CheckCircleIcon size={16} />
                  </div>
                  <div className="factor-text">
                    <strong>Budget Impact:</strong> Stays within Q1 constraints
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-between mt-lg">
              <div className="flex gap-md">
                <button className="btn btn-secondary">Request More Analysis</button>
                <button className="btn btn-secondary">View Alternatives</button>
              </div>
              <button className="btn btn-primary">Approve & Implement</button>
            </div>
          </div>

          {/* Footer Spacing */}
          <div style={{ height: '2rem' }}></div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
