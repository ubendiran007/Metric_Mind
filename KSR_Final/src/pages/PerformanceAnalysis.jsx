import React, { useState } from 'react';
import TrendChart from '../components/TrendChart';

const PerformanceAnalysis = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const weekData = {
    revenue: [
      { label: 'Mon', value: 42000 },
      { label: 'Tue', value: 45000 },
      { label: 'Wed', value: 43000 },
      { label: 'Thu', value: 48000 },
      { label: 'Fri', value: 52000 },
      { label: 'Sat', value: 58000 },
      { label: 'Sun', value: 55000 }
    ],
    customers: [
      { label: 'Mon', value: 120 },
      { label: 'Tue', value: 135 },
      { label: 'Wed', value: 128 },
      { label: 'Thu', value: 142 },
      { label: 'Fri', value: 158 },
      { label: 'Sat', value: 175 },
      { label: 'Sun', value: 165 }
    ],
    satisfaction: [
      { label: 'Mon', value: 4.2 },
      { label: 'Tue', value: 4.3 },
      { label: 'Wed', value: 4.4 },
      { label: 'Thu', value: 4.5 },
      { label: 'Fri', value: 4.6 },
      { label: 'Sat', value: 4.7 },
      { label: 'Sun', value: 4.6 }
    ]
  };

  const monthData = {
    revenue: [
      { label: 'Jan', value: 180000 },
      { label: 'Feb', value: 195000 },
      { label: 'Mar', value: 210000 },
      { label: 'Apr', value: 225000 },
      { label: 'May', value: 240000 },
      { label: 'Jun', value: 255000 }
    ],
    customers: [
      { label: 'Jan', value: 850 },
      { label: 'Feb', value: 920 },
      { label: 'Mar', value: 980 },
      { label: 'Apr', value: 1050 },
      { label: 'May', value: 1120 },
      { label: 'Jun', value: 1200 }
    ],
    satisfaction: [
      { label: 'Jan', value: 4.2 },
      { label: 'Feb', value: 4.3 },
      { label: 'Mar', value: 4.4 },
      { label: 'Apr', value: 4.5 },
      { label: 'May', value: 4.6 },
      { label: 'Jun', value: 4.7 }
    ]
  };

  const metrics = [
    { id: 'revenue', label: 'Revenue', color: '#2563eb' },
    { id: 'customers', label: 'Customers', color: '#10b981' },
    { id: 'satisfaction', label: 'Satisfaction', color: '#f59e0b' }
  ];

  const currentData = timeRange === 'week' ? weekData[selectedMetric] : monthData[selectedMetric];
  const currentMetric = metrics.find(m => m.id === selectedMetric);

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', color: '#1e293b', marginBottom: '8px' }}>Trend Analysis</h1>
        <p style={{ fontSize: '16px', color: '#64748b' }}>Track your business performance over time</p>
      </div>

      {/* Time Range Toggle */}
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        padding: '24px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', color: '#1e293b', margin: 0 }}>Time Range</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setTimeRange('week')}
              style={{
                padding: '8px 20px',
                background: timeRange === 'week' ? '#2563eb' : 'white',
                color: timeRange === 'week' ? 'white' : '#64748b',
                border: `2px solid ${timeRange === 'week' ? '#2563eb' : '#e2e8f0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              style={{
                padding: '8px 20px',
                background: timeRange === 'month' ? '#2563eb' : 'white',
                color: timeRange === 'month' ? 'white' : '#64748b',
                border: `2px solid ${timeRange === 'month' ? '#2563eb' : '#e2e8f0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              Month
            </button>
          </div>
        </div>

        {/* Metric Selection */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              style={{
                padding: '10px 20px',
                background: selectedMetric === metric.id ? metric.color : 'white',
                color: selectedMetric === metric.id ? 'white' : metric.color,
                border: `2px solid ${metric.color}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>
          {currentMetric.label} Trend - {timeRange === 'week' ? 'This Week' : 'Last 6 Months'}
        </h3>
        <TrendChart data={currentData} color={currentMetric.color} />
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
