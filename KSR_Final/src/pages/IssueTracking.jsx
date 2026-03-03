import React, { useState } from 'react';
import TrendChart from '../components/TrendChart';

const IssueTracking = () => {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: 'Low Customer Satisfaction',
      metric: 'Customer Rating',
      currentValue: 3.8,
      targetValue: 4.5,
      context: 'Long wait times during peak hours',
      status: 'critical',
      trend: 'declining',
      dayData: [
        { label: 'Mon', value: 4.2 },
        { label: 'Tue', value: 4.0 },
        { label: 'Wed', value: 3.9 },
        { label: 'Thu', value: 3.8 },
        { label: 'Fri', value: 3.8 },
        { label: 'Sat', value: 3.7 },
        { label: 'Sun', value: 3.8 }
      ],
      weekData: [
        { label: 'W1', value: 4.3 },
        { label: 'W2', value: 4.1 },
        { label: 'W3', value: 3.9 },
        { label: 'W4', value: 3.8 }
      ]
    },
    {
      id: 2,
      title: 'High Material Cost',
      metric: 'Cost per Unit',
      currentValue: 450,
      targetValue: 380,
      context: 'Supplier price increase due to raw material shortage',
      status: 'warning',
      trend: 'increasing',
      dayData: [
        { label: 'Mon', value: 420 },
        { label: 'Tue', value: 430 },
        { label: 'Wed', value: 440 },
        { label: 'Thu', value: 445 },
        { label: 'Fri', value: 450 },
        { label: 'Sat', value: 450 },
        { label: 'Sun', value: 450 }
      ],
      weekData: [
        { label: 'W1', value: 400 },
        { label: 'W2', value: 420 },
        { label: 'W3', value: 435 },
        { label: 'W4', value: 450 }
      ]
    },
    {
      id: 3,
      title: 'Delivery Delays',
      metric: 'Avg Delivery Time',
      currentValue: 35,
      targetValue: 25,
      context: 'Traffic congestion and vehicle shortage',
      status: 'warning',
      trend: 'stable',
      dayData: [
        { label: 'Mon', value: 32 },
        { label: 'Tue', value: 34 },
        { label: 'Wed', value: 35 },
        { label: 'Thu', value: 36 },
        { label: 'Fri', value: 35 },
        { label: 'Sat', value: 34 },
        { label: 'Sun', value: 35 }
      ],
      weekData: [
        { label: 'W1', value: 30 },
        { label: 'W2', value: 32 },
        { label: 'W3', value: 34 },
        { label: 'W4', value: 35 }
      ]
    }
  ]);

  const [selectedIssue, setSelectedIssue] = useState(issues[0]);
  const [timeView, setTimeView] = useState('day');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: '',
    metric: '',
    currentValue: '',
    targetValue: '',
    context: ''
  });

  const handleRemoveIssue = (issueId) => {
    const updatedIssues = issues.filter(i => i.id !== issueId);
    setIssues(updatedIssues);
    if (selectedIssue.id === issueId && updatedIssues.length > 0) {
      setSelectedIssue(updatedIssues[0]);
    }
  };

  const handleAddIssue = () => {
    if (newIssue.title && newIssue.metric && newIssue.currentValue && newIssue.targetValue) {
      const issue = {
        id: Date.now(),
        ...newIssue,
        currentValue: parseFloat(newIssue.currentValue),
        targetValue: parseFloat(newIssue.targetValue),
        status: 'warning',
        trend: 'stable',
        dayData: Array(7).fill(0).map((_, i) => ({
          label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          value: parseFloat(newIssue.currentValue)
        })),
        weekData: Array(4).fill(0).map((_, i) => ({
          label: `W${i + 1}`,
          value: parseFloat(newIssue.currentValue)
        }))
      };
      setIssues([...issues, issue]);
      setSelectedIssue(issue);
      setShowAddModal(false);
      setNewIssue({ title: '', metric: '', currentValue: '', targetValue: '', context: '' });
    }
  };

  const calculateGap = (current, target) => {
    const gap = Math.abs(current - target);
    const percentage = ((gap / target) * 100).toFixed(1);
    return { gap: gap.toFixed(1), percentage };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'normal': return '#10b981';
      default: return '#64748b';
    }
  };

  const currentData = timeView === 'day' ? selectedIssue.dayData : selectedIssue.weekData;
  const gap = calculateGap(selectedIssue.currentValue, selectedIssue.targetValue);

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '32px', color: '#1e293b', marginBottom: '8px' }}>Issue Tracking</h1>
          <p style={{ fontSize: '16px', color: '#64748b' }}>Monitor and resolve business problems</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '12px 24px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          + Add Issue
        </button>
      </div>

      {/* Issue List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Left: Issue Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {issues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                border: selectedIssue.id === issue.id ? `3px solid ${getStatusColor(issue.status)}` : '2px solid #e2e8f0',
                cursor: 'pointer',
                boxShadow: selectedIssue.id === issue.id ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.3s',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                    {issue.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    {issue.metric}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveIssue(issue.id);
                  }}
                  style={{
                    padding: '4px 8px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                <div>
                  <span style={{ color: '#64748b' }}>Current: </span>
                  <span style={{ fontWeight: '600', color: getStatusColor(issue.status) }}>{issue.currentValue}</span>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>Target: </span>
                  <span style={{ fontWeight: '600', color: '#10b981' }}>{issue.targetValue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Issue Details */}
        {selectedIssue && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Issue Header */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '12px' }}>{selectedIssue.title}</h2>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', lineHeight: '1.6' }}>
                <strong>Context:</strong> {selectedIssue.context}
              </div>
              
              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Current Value</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444' }}>{selectedIssue.currentValue}</div>
                </div>
                <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Target Value</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{selectedIssue.targetValue}</div>
                </div>
                <div style={{ padding: '16px', background: '#fef9c3', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Gap</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>{gap.gap} ({gap.percentage}%)</div>
                </div>
              </div>
            </div>

            {/* Trend Chart */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', color: '#1e293b', margin: 0 }}>Trend Analysis</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setTimeView('day')}
                    style={{
                      padding: '6px 16px',
                      background: timeView === 'day' ? '#2563eb' : 'white',
                      color: timeView === 'day' ? 'white' : '#64748b',
                      border: `2px solid ${timeView === 'day' ? '#2563eb' : '#e2e8f0'}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setTimeView('week')}
                    style={{
                      padding: '6px 16px',
                      background: timeView === 'week' ? '#2563eb' : 'white',
                      color: timeView === 'week' ? 'white' : '#64748b',
                      border: `2px solid ${timeView === 'week' ? '#2563eb' : '#e2e8f0'}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    Week
                  </button>
                </div>
              </div>
              <TrendChart data={currentData} color={getStatusColor(selectedIssue.status)} />
            </div>
          </div>
        )}
      </div>

      {/* Add Issue Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#1e293b' }}>Add New Issue</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                Issue Title
              </label>
              <input
                type="text"
                value={newIssue.title}
                onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                placeholder="e.g., Low Sales Performance"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                Metric Name
              </label>
              <input
                type="text"
                value={newIssue.metric}
                onChange={(e) => setNewIssue({ ...newIssue, metric: e.target.value })}
                placeholder="e.g., Daily Revenue"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                  Current Value
                </label>
                <input
                  type="number"
                  value={newIssue.currentValue}
                  onChange={(e) => setNewIssue({ ...newIssue, currentValue: e.target.value })}
                  placeholder="e.g., 35000"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                  Target Value
                </label>
                <input
                  type="number"
                  value={newIssue.targetValue}
                  onChange={(e) => setNewIssue({ ...newIssue, targetValue: e.target.value })}
                  placeholder="e.g., 50000"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                Context (Why is this happening?)
              </label>
              <textarea
                value={newIssue.context}
                onChange={(e) => setNewIssue({ ...newIssue, context: e.target.value })}
                placeholder="Explain the reason behind this issue..."
                rows="3"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewIssue({ title: '', metric: '', currentValue: '', targetValue: '', context: '' });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddIssue}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#2563eb',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Add Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueTracking;
