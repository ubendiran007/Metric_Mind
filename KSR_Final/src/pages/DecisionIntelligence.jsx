import React, { useState } from 'react';
import TrendChart from '../components/TrendChart';

const DecisionIntelligence = () => {
  const [trackedProblems, setTrackedProblems] = useState(() => {
    // Get current job type from URL or localStorage
    const currentPath = window.location.pathname;
    const jobTypeMatch = currentPath.match(/\/dashboard\/(.+)/);
    const currentJobType = jobTypeMatch ? jobTypeMatch[1] : 'general';
    
    const saved = localStorage.getItem(`decisionProblems_${currentJobType}`);
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        metric: 'Customer Satisfaction',
        numericValue: 3.8,
        target: 4.5,
        managerThought: 'Wait times are too long during lunch hours. Staff seems overwhelmed.',
        aiSuggestion: 'MAJOR ISSUE - Track daily. Based on low satisfaction (3.8/4.5) and context about wait times, recommend hiring 2 part-time staff for peak hours.',
        performanceScore: 65,
        severity: 'high',
        trackingMode: 'daily',
        trackingSince: '2 weeks',
        shouldTrack: true,
        entries: [
          { period: 'Mon', date: '2024-01-15', value: 3.9, context: 'Added 1 extra staff, slight improvement' },
          { period: 'Tue', date: '2024-01-16', value: 3.8, context: 'Back to normal, still slow' },
          { period: 'Wed', date: '2024-01-17', value: 3.8, context: 'Same issues persist' }
        ]
      }
    ];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(trackedProblems[0]);
  const [newEntry, setNewEntry] = useState({ date: new Date().toISOString().split('T')[0], value: '', context: '' });
  const [newProblem, setNewProblem] = useState({
    metric: '',
    numericValue: '',
    target: '',
    managerThought: ''
  });

  const generateAISuggestion = (metric, value, target, thought, severity) => {
    const gap = Math.abs(value - target);
    const gapPercent = ((gap / target) * 100).toFixed(0);
    const trackMode = severity === 'high' ? 'MAJOR ISSUE - Track daily' : 'MINOR ISSUE - Track weekly';
    
    return `${trackMode}. ${metric} at ${value} (target: ${target}, ${gapPercent}% gap). Context: "${thought.substring(0, 60)}...". ${severity === 'high' ? 'Needs immediate action.' : 'Monitor and adjust as needed.'}`;
  };

  const calculatePerformanceScore = (value, target) => {
    const ratio = (value / target) * 100;
    return Math.min(100, Math.max(0, ratio));
  };

  const handleAddProblem = () => {
    if (newProblem.metric && newProblem.numericValue && newProblem.target && newProblem.managerThought) {
      const value = parseFloat(newProblem.numericValue);
      const target = parseFloat(newProblem.target);
      const performanceScore = calculatePerformanceScore(value, target);
      const severity = performanceScore < 70 ? 'high' : performanceScore < 85 ? 'medium' : 'low';
      const trackingMode = severity === 'high' ? 'daily' : 'weekly';
      const aiSuggestion = generateAISuggestion(newProblem.metric, value, target, newProblem.managerThought, severity);
      
      const problem = {
        id: Date.now(),
        metric: newProblem.metric,
        numericValue: value,
        target: target,
        managerThought: newProblem.managerThought,
        aiSuggestion: aiSuggestion,
        performanceScore: performanceScore,
        severity: severity,
        trackingMode: trackingMode,
        trackingSince: 'Just now',
        shouldTrack: !newProblem.managerThought.toLowerCase().includes('temporary'),
        entries: []
      };
      
      const updated = [...trackedProblems, problem];
      setTrackedProblems(updated);
      
      // Save to job-specific storage
      const currentPath = window.location.pathname;
      const jobTypeMatch = currentPath.match(/\/dashboard\/(.+)/);
      const currentJobType = jobTypeMatch ? jobTypeMatch[1] : 'general';
      localStorage.setItem(`decisionProblems_${currentJobType}`, JSON.stringify(updated));
      
      setSelectedProblem(problem);
      setShowAddModal(false);
      setNewProblem({ metric: '', numericValue: '', target: '', managerThought: '' });
    }
  };

  const handleAddEntry = () => {
    if (newEntry.date && newEntry.value && newEntry.context) {
      const updated = trackedProblems.map(p => {
        if (p.id === selectedProblem.id) {
          const entryDate = new Date(newEntry.date);
          const period = p.trackingMode === 'daily' 
            ? entryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : `W${Math.ceil(entryDate.getDate() / 7)}`;
          const newEntries = [...p.entries, { period, date: newEntry.date, value: parseFloat(newEntry.value), context: newEntry.context }]
            .sort((a, b) => new Date(a.date) - new Date(b.date));
          
          // Recalculate performance score and severity based on new value
          const newValue = parseFloat(newEntry.value);
          const newPerformanceScore = calculatePerformanceScore(newValue, p.target);
          const newSeverity = newPerformanceScore < 70 ? 'high' : newPerformanceScore < 85 ? 'medium' : 'low';
          const newTrackingMode = newSeverity === 'high' ? 'daily' : 'weekly';
          const newAISuggestion = generateAISuggestion(p.metric, newValue, p.target, p.managerThought, newSeverity);
          
          return {
            ...p,
            entries: newEntries,
            numericValue: newValue,
            performanceScore: newPerformanceScore,
            severity: newSeverity,
            trackingMode: newTrackingMode,
            aiSuggestion: newAISuggestion
          };
        }
        return p;
      });
      setTrackedProblems(updated);
      
      // Save to job-specific storage
      const currentPath = window.location.pathname;
      const jobTypeMatch = currentPath.match(/\/dashboard\/(.+)/);
      const currentJobType = jobTypeMatch ? jobTypeMatch[1] : 'general';
      localStorage.setItem(`decisionProblems_${currentJobType}`, JSON.stringify(updated));
      
      setSelectedProblem(updated.find(p => p.id === selectedProblem.id));
      setShowEntryModal(false);
      setNewEntry({ date: new Date().toISOString().split('T')[0], value: '', context: '' });
    }
  };

  const handleRemoveProblem = (id) => {
    const updated = trackedProblems.filter(p => p.id !== id);
    setTrackedProblems(updated);
    if (selectedProblem.id === id && updated.length > 0) {
      setSelectedProblem(updated[0]);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#64748b';
    }
  };

  const chartData = selectedProblem.entries.map(e => ({ label: e.period, value: e.value }));

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '32px', color: '#1e293b', marginBottom: '8px' }}>Decision Intelligence</h1>
          <p style={{ fontSize: '16px', color: '#64748b' }}>Combine metrics with context - AI decides daily or weekly tracking</p>
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
          + Add Problem
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px' }}>
        {/* Left: Problem List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {trackedProblems.map((problem) => (
            <div
              key={problem.id}
              onClick={() => setSelectedProblem(problem)}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                border: selectedProblem.id === problem.id ? `3px solid ${getSeverityColor(problem.severity)}` : '2px solid #e2e8f0',
                cursor: 'pointer',
                boxShadow: selectedProblem.id === problem.id ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                    {problem.metric}
                  </div>
                  <div style={{ fontSize: '11px', color: 'white', background: problem.trackingMode === 'daily' ? '#ef4444' : '#f59e0b', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '6px' }}>
                    {problem.trackingMode === 'daily' ? '📅 Daily Tracking' : '📊 Weekly Tracking'}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveProblem(problem.id);
                  }}
                  style={{
                    padding: '4px 8px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
              
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Performance Score</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${problem.performanceScore}%`,
                      height: '100%',
                      background: getSeverityColor(problem.severity),
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: getSeverityColor(problem.severity) }}>
                    {problem.performanceScore}%
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {problem.entries.length} entries • {problem.trackingSince}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Problem Details */}
        {selectedProblem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Metrics Overview */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '24px', color: '#1e293b', margin: 0 }}>{selectedProblem.metric}</h2>
                <button
                  onClick={() => {
                    const lastEntry = selectedProblem.entries[selectedProblem.entries.length - 1];
                    const nextDate = lastEntry 
                      ? new Date(new Date(lastEntry.date).getTime() + 86400000).toISOString().split('T')[0]
                      : new Date().toISOString().split('T')[0];
                    setNewEntry({ date: nextDate, value: '', context: '' });
                    setShowEntryModal(true);
                  }}
                  style={{
                    padding: '8px 16px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  + Add {selectedProblem.trackingMode === 'daily' ? 'Daily' : 'Weekly'} Entry
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Current</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444' }}>{selectedProblem.numericValue}</div>
                </div>
                <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Target</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#10b981' }}>{selectedProblem.target}</div>
                </div>
                <div style={{ padding: '16px', background: '#eff6ff', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Score</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#2563eb' }}>{selectedProblem.performanceScore}%</div>
                </div>
              </div>

              <div style={{ padding: '16px', background: '#fef9c3', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#854d0e', marginBottom: '8px' }}>
                  💭 Your Initial Thought:
                </div>
                <div style={{ fontSize: '14px', color: '#713f12', lineHeight: '1.6' }}>
                  "{selectedProblem.managerThought}"
                </div>
              </div>

              <div style={{ padding: '16px', background: '#eff6ff', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
                  🤖 AI Decision:
                </div>
                <div style={{ fontSize: '14px', color: '#1e3a8a', lineHeight: '1.6' }}>
                  {selectedProblem.aiSuggestion}
                </div>
              </div>
            </div>

            {/* Entries Timeline */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '16px' }}>
                {selectedProblem.trackingMode === 'daily' ? 'Daily' : 'Weekly'} Entries
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                {selectedProblem.entries.map((entry, idx) => (
                  <div key={idx} style={{
                    padding: '16px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${getSeverityColor(selectedProblem.severity)}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{entry.period}</span>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: getSeverityColor(selectedProblem.severity) }}>{entry.value}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                      {entry.context}
                    </div>
                  </div>
                ))}
                {selectedProblem.entries.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    No entries yet. Click "Add Entry" to start tracking.
                  </div>
                )}
              </div>
            </div>

            {/* Trend Chart */}
            {chartData.length > 0 && (
              <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>Trend</h3>
                <TrendChart data={chartData} color={getSeverityColor(selectedProblem.severity)} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Problem Modal */}
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
            maxWidth: '600px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#1e293b' }}>Add Problem</h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              AI will decide: Major issue = Daily tracking, Minor issue = Weekly tracking
            </p>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                Metric Name
              </label>
              <input
                type="text"
                value={newProblem.metric}
                onChange={(e) => setNewProblem({ ...newProblem, metric: e.target.value })}
                placeholder="e.g., Customer Satisfaction"
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
                  value={newProblem.numericValue}
                  onChange={(e) => setNewProblem({ ...newProblem, numericValue: e.target.value })}
                  placeholder="e.g., 3.8"
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
                  value={newProblem.target}
                  onChange={(e) => setNewProblem({ ...newProblem, target: e.target.value })}
                  placeholder="e.g., 4.5"
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
                Your Thought / Context
              </label>
              <textarea
                value={newProblem.managerThought}
                onChange={(e) => setNewProblem({ ...newProblem, managerThought: e.target.value })}
                placeholder="Explain what's happening..."
                rows="4"
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
                  setNewProblem({ metric: '', numericValue: '', target: '', managerThought: '' });
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
                onClick={handleAddProblem}
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
                Let AI Decide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Entry Modal */}
      {showEntryModal && (
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
            <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#1e293b' }}>
              Add {selectedProblem.trackingMode === 'daily' ? 'Daily' : 'Weekly'} Entry
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              Track progress for: {selectedProblem.metric}
            </p>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                Date
              </label>
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
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
                Value
              </label>
              <input
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
                placeholder="Enter current value"
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

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                Context / What happened?
              </label>
              <textarea
                value={newEntry.context}
                onChange={(e) => setNewEntry({ ...newEntry, context: e.target.value })}
                placeholder="Describe what changed or what you observed..."
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
                  setShowEntryModal(false);
                  setNewEntry({ date: new Date().toISOString().split('T')[0], value: '', context: '' });
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
                onClick={handleAddEntry}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#10b981',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionIntelligence;
