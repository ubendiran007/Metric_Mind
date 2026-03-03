import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrendChart from '../components/TrendChart';

const JobDashboard = ({ searchQuery = '' }) => {
  const { jobType } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [userBusinesses, setUserBusinesses] = useState([]);

  const dashboardConfigs = {
    textile: {
      title: 'Textile Business Dashboard',
      icon: '🧵',
      color: '#2563eb',
      kpis: [
        { label: 'Production Output', value: '12,500 units', trend: '+8.5%', status: 'up', unit: 'Units' },
        { label: 'Material Cost', value: '₹450/unit', trend: '-₹25', status: 'up', unit: 'INR' },
        { label: 'Order Fulfillment', value: '94%', trend: '+3%', status: 'up', unit: '%' },
        { label: 'Quality Defects', value: '2.1%', trend: '-0.5%', status: 'up', unit: '%' }
      ],
      chartData: [
        { month: 'Jan', value: 10500 },
        { month: 'Feb', value: 11000 },
        { month: 'Mar', value: 11200 },
        { month: 'Apr', value: 11800 },
        { month: 'May', value: 12200 },
        { month: 'Jun', value: 12500 }
      ],
      chartLabel: 'Production Output (Units)'
    },
    hospital: {
      title: 'Hospital Dashboard',
      icon: '🏥',
      color: '#10b981',
      kpis: [
        { label: 'Patient Satisfaction', value: '4.6/5', trend: '+0.3', status: 'up', unit: 'Rating' },
        { label: 'Bed Occupancy', value: '82%', trend: '+5%', status: 'up', unit: '%' },
        { label: 'Treatment Success', value: '96%', trend: '+2%', status: 'up', unit: '%' },
        { label: 'Avg Wait Time', value: '18 min', trend: '-5 min', status: 'up', unit: 'Minutes' }
      ],
      chartData: [
        { month: 'Jan', value: 72 },
        { month: 'Feb', value: 75 },
        { month: 'Mar', value: 78 },
        { month: 'Apr', value: 79 },
        { month: 'May', value: 80 },
        { month: 'Jun', value: 82 }
      ],
      chartLabel: 'Bed Occupancy %'
    },
    restaurant: {
      title: 'Restaurant Dashboard',
      icon: '🍽️',
      color: '#f59e0b',
      kpis: [
        { label: 'Daily Revenue', value: '₹45,000', trend: '+12%', status: 'up', unit: 'INR' },
        { label: 'Table Turnover', value: '3.2/day', trend: '+0.4', status: 'up', unit: 'Times' },
        { label: 'Food Cost %', value: '32%', trend: '-2%', status: 'up', unit: '%' },
        { label: 'Customer Rating', value: '4.4/5', trend: '+0.2', status: 'up', unit: 'Rating' }
      ],
      chartData: [
        { month: 'Jan', value: 38000 },
        { month: 'Feb', value: 40000 },
        { month: 'Mar', value: 41000 },
        { month: 'Apr', value: 42500 },
        { month: 'May', value: 43500 },
        { month: 'Jun', value: 45000 }
      ],
      chartLabel: 'Daily Revenue (₹)'
    },
    retail: {
      title: 'Retail Store Dashboard',
      icon: '🏪',
      color: '#8b5cf6',
      kpis: [
        { label: 'Sales per Sq.Ft', value: '₹1,250', trend: '+8%', status: 'up', unit: 'INR' },
        { label: 'Inventory Turnover', value: '6.2x', trend: '+0.5x', status: 'up', unit: 'Times' },
        { label: 'Foot Traffic', value: '850/day', trend: '+15%', status: 'up', unit: 'Visitors' },
        { label: 'Conversion Rate', value: '28%', trend: '+3%', status: 'up', unit: '%' }
      ],
      chartData: [
        { month: 'Jan', value: 1050 },
        { month: 'Feb', value: 1100 },
        { month: 'Mar', value: 1150 },
        { month: 'Apr', value: 1180 },
        { month: 'May', value: 1220 },
        { month: 'Jun', value: 1250 }
      ],
      chartLabel: 'Sales per Sq.Ft (₹)'
    },
    manufacturing: {
      title: 'Manufacturing Dashboard',
      icon: '🏭',
      color: '#ec4899',
      kpis: [
        { label: 'Production Efficiency', value: '88%', trend: '+4%', status: 'up', unit: '%' },
        { label: 'Machine Downtime', value: '3.2 hrs', trend: '-1.5 hrs', status: 'up', unit: 'Hours' },
        { label: 'Defect Rate', value: '1.8%', trend: '-0.4%', status: 'up', unit: '%' },
        { label: 'Output per Hour', value: '245 units', trend: '+18', status: 'up', unit: 'Units' }
      ],
      chartData: [
        { month: 'Jan', value: 82 },
        { month: 'Feb', value: 84 },
        { month: 'Mar', value: 85 },
        { month: 'Apr', value: 86 },
        { month: 'May', value: 87 },
        { month: 'Jun', value: 88 }
      ],
      chartLabel: 'Production Efficiency %'
    },
    hotel: {
      title: 'Hotel Dashboard',
      icon: '🏨',
      color: '#06b6d4',
      kpis: [
        { label: 'Occupancy Rate', value: '76%', trend: '+8%', status: 'up', unit: '%' },
        { label: 'RevPAR', value: '₹3,200', trend: '+₹350', status: 'up', unit: 'INR' },
        { label: 'Guest Satisfaction', value: '4.5/5', trend: '+0.2', status: 'up', unit: 'Rating' },
        { label: 'Booking Rate', value: '68%', trend: '+5%', status: 'up', unit: '%' }
      ],
      chartData: [
        { month: 'Jan', value: 65 },
        { month: 'Feb', value: 68 },
        { month: 'Mar', value: 70 },
        { month: 'Apr', value: 72 },
        { month: 'May', value: 74 },
        { month: 'Jun', value: 76 }
      ],
      chartLabel: 'Occupancy Rate %'
    }
  };

  useEffect(() => {
    // Ensure user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', 'Demo User');
    }
    
    let businesses = JSON.parse(localStorage.getItem('userBusinesses') || '[]');
    
    // If no businesses exist, create default ones
    if (businesses.length === 0) {
      businesses = [
        {
          id: 'textile',
          title: 'Textile Business',
          icon: '🧵',
          color: '#2563eb',
          metrics: ['Production Output', 'Material Cost', 'Order Fulfillment', 'Quality Defects']
        },
        {
          id: 'hospital',
          title: 'Hospital',
          icon: '🏥',
          color: '#10b981',
          metrics: ['Patient Satisfaction', 'Bed Occupancy', 'Treatment Success', 'Wait Time']
        }
      ];
      localStorage.setItem('userBusinesses', JSON.stringify(businesses));
    }
    
    setUserBusinesses(businesses);
    
    const config = dashboardConfigs[jobType];
    const currentBusiness = businesses.find(b => b.id === jobType) || config;
    
    if (!currentBusiness) {
      navigate('/job-selection');
      return;
    }

    // Load problems specific to this job type
    let problems = JSON.parse(localStorage.getItem(`decisionProblems_${jobType}`) || '[]');
    
    // Add sample problems ONLY for preset jobs and ONLY if no problems exist for this specific job
    const presetJobIds = ['textile', 'hospital', 'restaurant', 'retail', 'manufacturing', 'hotel'];
    if (presetJobIds.includes(jobType) && problems.length === 0) {
      const sampleProblems = {
        textile: [
          {
            id: 1001,
            metric: 'Production Output',
            numericValue: 11800,
            target: 12500,
            managerThought: 'Machine downtime increased due to maintenance issues. Need to optimize scheduling.',
            aiSuggestion: 'MINOR ISSUE - Track weekly. Production at 94% of target. Context shows maintenance issues. Schedule preventive maintenance.',
            performanceScore: 94,
            severity: 'medium',
            trackingMode: 'weekly',
            trackingSince: '2 weeks',
            shouldTrack: true,
            entries: [
              { period: 'W1', date: '2024-01-08', value: 11500, context: 'Normal production week' },
              { period: 'W2', date: '2024-01-15', value: 11800, context: 'Slight improvement after maintenance' }
            ]
          },
          {
            id: 1002,
            metric: 'Quality Defects',
            numericValue: 3.2,
            target: 2.0,
            managerThought: 'New batch of raw materials seems to have quality issues. Supplier changed their process.',
            aiSuggestion: 'MAJOR ISSUE - Track daily. Defect rate 60% above target. Context shows supplier issues. Contact supplier immediately.',
            performanceScore: 62,
            severity: 'high',
            trackingMode: 'daily',
            trackingSince: '1 week',
            shouldTrack: true,
            entries: [
              { period: 'Jan 15', date: '2024-01-15', value: 3.5, context: 'High defects noticed' },
              { period: 'Jan 16', date: '2024-01-16', value: 3.2, context: 'Slightly better after quality check' },
              { period: 'Jan 17', date: '2024-01-17', value: 3.1, context: 'Contacted supplier about issues' }
            ]
          }
        ],
        hospital: [
          {
            id: 2001,
            metric: 'Patient Satisfaction',
            numericValue: 4.2,
            target: 4.6,
            managerThought: 'Wait times in emergency department are longer than usual. Staff shortage during night shifts.',
            aiSuggestion: 'MINOR ISSUE - Track weekly. Satisfaction at 91% of target. Context shows staffing issues. Consider hiring part-time staff.',
            performanceScore: 91,
            severity: 'medium',
            trackingMode: 'weekly',
            trackingSince: '3 weeks',
            shouldTrack: true,
            entries: [
              { period: 'W1', date: '2024-01-01', value: 4.1, context: 'Holiday season, short staffed' },
              { period: 'W2', date: '2024-01-08', value: 4.2, context: 'Added one temp nurse' },
              { period: 'W3', date: '2024-01-15', value: 4.2, context: 'Stable but still below target' }
            ]
          }
        ],
        restaurant: [
          {
            id: 3001,
            metric: 'Daily Revenue',
            numericValue: 42000,
            target: 45000,
            managerThought: 'Winter season affecting foot traffic. Also, new competitor opened nearby last month.',
            aiSuggestion: 'MINOR ISSUE - Track weekly. Revenue at 93% of target. Context shows seasonal and competition factors. Consider promotions.',
            performanceScore: 93,
            severity: 'medium',
            trackingMode: 'weekly',
            trackingSince: '4 weeks',
            shouldTrack: true,
            entries: [
              { period: 'W1', date: '2024-01-01', value: 40000, context: 'Post-holiday slump' },
              { period: 'W2', date: '2024-01-08', value: 41000, context: 'Started winter promotion' },
              { period: 'W3', date: '2024-01-15', value: 42000, context: 'Promotion helping slightly' }
            ]
          }
        ],
        retail: [
          {
            id: 4001,
            metric: 'Sales per Sq.Ft',
            numericValue: 1180,
            target: 1250,
            managerThought: 'Holiday season ended, foot traffic decreased. Need to focus on conversion rate.',
            aiSuggestion: 'MINOR ISSUE - Track weekly. Sales at 94% of target. Context shows seasonal decline. Focus on marketing.',
            performanceScore: 94,
            severity: 'medium',
            trackingMode: 'weekly',
            trackingSince: '2 weeks',
            shouldTrack: true,
            entries: [
              { period: 'W1', date: '2024-01-08', value: 1200, context: 'Post-holiday decline' },
              { period: 'W2', date: '2024-01-15', value: 1180, context: 'Started new promotions' }
            ]
          }
        ],
        manufacturing: [
          {
            id: 5001,
            metric: 'Production Efficiency',
            numericValue: 85,
            target: 88,
            managerThought: 'New equipment installation caused temporary efficiency drop. Training needed.',
            aiSuggestion: 'MINOR ISSUE - Track weekly. Efficiency at 97% of target. Context shows equipment transition. Provide training.',
            performanceScore: 97,
            severity: 'low',
            trackingMode: 'weekly',
            trackingSince: '1 week',
            shouldTrack: true,
            entries: [
              { period: 'W1', date: '2024-01-15', value: 85, context: 'New equipment installed, staff learning' }
            ]
          }
        ],
        hotel: [
          {
            id: 6001,
            metric: 'Occupancy Rate',
            numericValue: 72,
            target: 76,
            managerThought: 'Winter season affecting bookings. Also, renovation in one wing reducing available rooms.',
            aiSuggestion: 'MINOR ISSUE - Track weekly. Occupancy at 95% of target. Context shows seasonal and renovation factors. Temporary issue.',
            performanceScore: 95,
            severity: 'low',
            trackingMode: 'weekly',
            trackingSince: '3 weeks',
            shouldTrack: true,
            entries: [
              { period: 'W1', date: '2024-01-01', value: 70, context: 'Renovation started' },
              { period: 'W2', date: '2024-01-08', value: 71, context: 'Winter season impact' },
              { period: 'W3', date: '2024-01-15', value: 72, context: 'Slight improvement' }
            ]
          }
        ]
      };
      
      if (sampleProblems[jobType]) {
        problems = sampleProblems[jobType];
        localStorage.setItem(`decisionProblems_${jobType}`, JSON.stringify(problems));
      }
    }
    
    // Calculate KPIs from actual user data
    const calculateKPIs = () => {
      const businessMetrics = currentBusiness.metrics || (config ? config.kpis.map(k => k.label) : []);
      
      return businessMetrics.slice(0, 4).map((metricLabel, idx) => {
        // Find matching problem in Decision Intelligence
        const problem = problems.find(p => p.metric.toLowerCase() === metricLabel.toLowerCase());
        
        if (problem && problem.entries.length > 0) {
          // Calculate from actual entries
          const latestEntry = problem.entries[problem.entries.length - 1];
          const previousEntry = problem.entries[problem.entries.length - 2];
          
          const currentValue = latestEntry.value;
          const targetValue = problem.target;
          const trend = previousEntry 
            ? ((currentValue - previousEntry.value) / previousEntry.value * 100).toFixed(1) + '%'
            : 'N/A';
          
          return {
            label: metricLabel,
            value: currentValue.toString(),
            trend: trend,
            status: currentValue >= targetValue ? 'up' : 'down'
          };
        }
        
        // Use default data for preset businesses
        if (config && config.kpis[idx]) {
          return config.kpis[idx];
        }
        
        // No data for custom businesses
        return {
          label: metricLabel,
          value: 'No data',
          trend: 'Add entries',
          status: 'neutral'
        };
      });
    };
    
    // Calculate chart data from entries
    const calculateChartData = () => {
      const allEntries = [];
      problems.forEach(problem => {
        if (problem.entries && problem.entries.length > 0) {
          problem.entries.forEach(entry => {
            allEntries.push({
              date: new Date(entry.date),
              value: entry.value,
              metric: problem.metric
            });
          });
        }
      });
      
      if (allEntries.length === 0) {
        // Use default chart data for preset businesses
        if (config && config.chartData) {
          return config.chartData;
        }
        return [{ month: 'No data', value: 0 }];
      }
      
      // Group by month and average
      const monthlyData = {};
      allEntries.forEach(entry => {
        const monthKey = entry.date.toLocaleDateString('en-US', { month: 'short' });
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { sum: 0, count: 0 };
        }
        monthlyData[monthKey].sum += entry.value;
        monthlyData[monthKey].count += 1;
      });
      
      return Object.entries(monthlyData).map(([month, data]) => ({
        month,
        value: parseFloat((data.sum / data.count).toFixed(1))
      }));
    };
    
    setJobData({
      title: currentBusiness.title ? `${currentBusiness.title} Dashboard` : (config ? config.title : 'Dashboard'),
      icon: currentBusiness.icon || (config ? config.icon : '📊'),
      color: currentBusiness.color || (config ? config.color : '#2563eb'),
      kpis: calculateKPIs(),
      chartData: calculateChartData(),
      chartLabel: config ? config.chartLabel : 'Performance Trend'
    });
  }, [jobType, navigate]);

  if (!jobData) {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px' }}>
      {/* Header with Business Switcher */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '48px' }}>{jobData.icon}</span>
            <div>
              <h1 style={{ fontSize: '32px', color: '#1e293b', margin: 0 }}>{jobData.title}</h1>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                const report = `${jobData.title}\n\nKPIs:\n${jobData.kpis.map(k => `${k.label}: ${k.value} (${k.trend})`).join('\n')}\n\nGenerated: ${new Date().toLocaleString()}`;
                const blob = new Blob([report], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${jobData.title.replace(/\s+/g, '_')}_Report.txt`;
                a.click();
              }}
              style={{
                padding: '10px 20px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📥 Download Report
            </button>
            <button
              onClick={() => {
                const shareText = `${jobData.title}\n\n${jobData.kpis.map(k => `${k.label}: ${k.value} (${k.trend})`).join('\n')}`;
                if (navigator.share) {
                  navigator.share({ title: jobData.title, text: shareText });
                } else {
                  navigator.clipboard.writeText(shareText);
                  alert('Report copied to clipboard!');
                }
              }}
              style={{
                padding: '10px 20px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📤 Share Report
            </button>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 4px 0' }}>Welcome back,</p>
              <p style={{ fontSize: '18px', color: '#1e293b', fontWeight: '600', margin: 0 }}>
                {localStorage.getItem('userName') || 'User'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Business Switcher */}
        {userBusinesses.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Your Businesses:</span>
            {userBusinesses.map((business) => (
              <button
                key={business.id}
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Switching to business:', business.id);
                  navigate(`/dashboard/${business.id}`);
                }}
                style={{
                  padding: '8px 16px',
                  background: business.id === jobType ? business.color : 'white',
                  color: business.id === jobType ? 'white' : business.color,
                  border: `2px solid ${business.color}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s'
                }}
              >
                {business.icon} {business.title}
              </button>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('Add Business clicked');
                navigate('/job-selection');
              }}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: '2px dashed #cbd5e1',
                color: '#64748b',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              + Add Business
            </button>
          </div>
        )}
      </div>

      {/* Anomaly Alerts Section - Only show if anomalies exist */}
      {jobData.anomalies && jobData.anomalies.length > 0 && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: '30px'
        }}>
          <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>
            Anomaly Alerts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {jobData.anomalies.map((anomaly, idx) => (
              <div key={idx} style={{
                padding: '16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#dc2626', marginBottom: '4px' }}>
                    {anomaly.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    {anomaly.description}
                  </div>
                </div>
                <div style={{
                  padding: '4px 12px',
                  background: '#dc2626',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {anomaly.severity}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {jobData.kpis.filter(kpi => 
          kpi.label.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 || jobData.kpis.every(k => k.value === 'No data') ? (
          <div style={{
            gridColumn: '1 / -1',
            background: 'white',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ fontSize: '20px', color: '#1e293b', marginBottom: '12px' }}>No Metrics Data Yet</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
              Start tracking your business metrics in Decision Intelligence. Add problems with current values and targets, then AI will help you make data-driven decisions.
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('Going to Decision Intelligence');
                navigate('/history');
              }}
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
              Go to Decision Intelligence
            </button>
          </div>
        ) : (
          jobData.kpis.filter(kpi => 
            kpi.label.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((kpi, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: `4px solid ${jobData.color}`
            }}>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                {kpi.label}
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                {kpi.value}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                color: '#10b981',
                marginBottom: '12px'
              }}>
                <span>↑</span>
                <span>{kpi.trend}</span>
              </div>
              {(kpi.goal || kpi.capacity || kpi.benchmark || kpi.budget || kpi.industry || kpi.optimal || kpi.plan || kpi.standard || kpi.forecast || kpi.quota || kpi.expected || kpi.projection || kpi.ideal || kpi.excellence || kpi.promise || kpi.expectation) && (
                <div style={{
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px'
                }}>
                  <div>
                    <span style={{ color: '#64748b' }}>
                      {kpi.goal ? 'Goal: ' : kpi.capacity ? 'Capacity: ' : kpi.benchmark ? 'Benchmark: ' : kpi.budget ? 'Budget: ' : kpi.industry ? 'Industry: ' : kpi.optimal ? 'Optimal: ' : kpi.plan ? 'Plan: ' : kpi.standard ? 'Standard: ' : kpi.forecast ? 'Forecast: ' : kpi.quota ? 'Quota: ' : kpi.expected ? 'Expected: ' : kpi.projection ? 'Projection: ' : kpi.ideal ? 'Ideal: ' : kpi.excellence ? 'Excellence: ' : kpi.promise ? 'Promise: ' : 'Expectation: '}
                    </span>
                    <span style={{ color: '#1e293b', fontWeight: '600' }}>
                      {kpi.goal || kpi.capacity || kpi.benchmark || kpi.budget || kpi.industry || kpi.optimal || kpi.plan || kpi.standard || kpi.forecast || kpi.quota || kpi.expected || kpi.projection || kpi.ideal || kpi.excellence || kpi.promise || kpi.expectation}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>
                      {kpi.progress ? 'Progress: ' : kpi.utilization ? 'Utilization: ' : kpi.rating ? 'Rating: ' : kpi.variance ? 'Variance: ' : kpi.performance ? 'Performance: ' : kpi.efficiency ? 'Efficiency: ' : kpi.occupancy ? 'Occupancy: ' : kpi.attainment ? 'Attainment: ' : kpi.booking ? 'Booking: ' : kpi.completion ? 'Completion: ' : kpi.loyalty ? 'Loyalty: ' : kpi.achievement ? 'Achievement: ' : kpi.fulfillment ? 'Fulfillment: ' : kpi.ratio ? 'Ratio: ' : kpi.service ? 'Service: ' : kpi.accuracy ? 'Accuracy: ' : kpi.sales ? 'Sales: ' : kpi.volume ? 'Volume: ' : kpi.score ? 'Score: ' : kpi.quality ? 'Quality: ' : kpi.workload ? 'Workload: ' : kpi.speed ? 'Speed: ' : kpi.delivery ? 'Delivery: ' : 'Penetration: '}
                    </span>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>
                      {kpi.progress || kpi.utilization || kpi.rating || kpi.variance || kpi.performance || kpi.efficiency || kpi.occupancy || kpi.attainment || kpi.booking || kpi.completion || kpi.loyalty || kpi.achievement || kpi.fulfillment || kpi.ratio || kpi.service || kpi.accuracy || kpi.sales || kpi.volume || kpi.score || kpi.quality || kpi.workload || kpi.speed || kpi.delivery || kpi.penetration}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Chart */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>
          {jobData.chartLabel} - Last 6 Months
        </h3>
        <TrendChart data={jobData.chartData} color={jobData.color} />
      </div>
    </div>
  );
};

export default JobDashboard;
