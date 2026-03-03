import React from 'react';

/**
 * TrendChart Component
 * A placeholder for trend visualization that can be replaced with Chart.js, Recharts, or D3.js
 * Currently displays a stylized SVG representation
 */
const TrendChart = ({ data = [], height = 320, color = '#2563eb' }) => {
    // Sample data points for demonstration
    const sampleData = data.length > 0 ? data : [
        { label: 'Jan', value: 65 },
        { label: 'Feb', value: 72 },
        { label: 'Mar', value: 68 },
        { label: 'Apr', value: 85 },
        { label: 'May', value: 78 },
        { label: 'Jun', value: 92 },
    ];

    const maxValue = Math.max(...sampleData.map(d => d.value));
    const width = 100; // percentage
    const chartHeight = height - 60; // Reserve space for labels

    // Calculate SVG path points
    const points = sampleData.map((d, i) => {
        const x = (i / (sampleData.length - 1)) * 100;
        const y = ((maxValue - d.value) / maxValue) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{ width: '100%', height: `${height}px`, position: 'relative' }}>
            {/* Chart Area */}
            <svg
                width="100%"
                height={chartHeight}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ display: 'block' }}
            >
                {/* Grid Lines */}
                <line x1="0" y1="25" x2="100" y2="25" stroke="#e2e8f0" strokeWidth="0.2" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.2" />
                <line x1="0" y1="75" x2="100" y2="75" stroke="#e2e8f0" strokeWidth="0.2" />

                {/* Area Fill */}
                <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0.05" />
                    </linearGradient>
                </defs>
                <polygon
                    points={`0,100 ${points} 100,100`}
                    fill="url(#areaGradient)"
                />

                {/* Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Data Points */}
                {sampleData.map((d, i) => {
                    const x = (i / (sampleData.length - 1)) * 100;
                    const y = ((maxValue - d.value) / maxValue) * 100;
                    return (
                        <g key={i}>
                            <circle
                                cx={x}
                                cy={y}
                                r="1"
                                fill="white"
                                stroke={color}
                                strokeWidth="0.3"
                            />
                        </g>
                    );
                })}
            </svg>

            {/* X-Axis Labels */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                }}
            >
                {sampleData.map((d, i) => (
                    <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                        {d.label}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div
                style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginTop: '1rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '2px',
                            background: color,
                        }}
                    />
                    <span>Revenue</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '2px',
                            background: '#10b981',
                        }}
                    />
                    <span>Customer Acquisition</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '2px',
                            background: '#06b6d4',
                        }}
                    />
                    <span>Retention Rate</span>
                </div>
            </div>
        </div>
    );
};

export default TrendChart;
