/**
 * Mock Data for InsightBridge Decision Intelligence Platform
 * This file contains realistic data for all dashboard features
 */

// KPI Metrics Data
export const kpiMetrics = {
    revenue: {
        value: 2400000,
        trend: 12.5,
        label: 'Revenue Performance',
        period: 'vs. last quarter',
        unit: '$',
        target: 2200000,
        status: 'exceeding'
    },
    satisfaction: {
        value: 94.2,
        trend: 8.3,
        label: 'Customer Satisfaction',
        period: '30-day average',
        unit: '%',
        target: 90,
        status: 'exceeding'
    },
    productivity: {
        value: 87.5,
        trend: -3.1,
        label: 'Team Productivity',
        period: 'This week',
        unit: '%',
        target: 90,
        status: 'below'
    },
    accuracy: {
        value: 91.8,
        trend: 15.7,
        label: 'Decision Accuracy',
        period: 'Based on 247 decisions',
        unit: '%',
        target: 85,
        status: 'exceeding'
    }
};

// Performance Trends Data (6 months)
export const performanceTrends = [
    { month: 'Jan', revenue: 1850000, satisfaction: 89, productivity: 92, decisions: 45 },
    { month: 'Feb', revenue: 1920000, satisfaction: 91, productivity: 90, decisions: 52 },
    { month: 'Mar', revenue: 2050000, satisfaction: 88, productivity: 93, decisions: 48 },
    { month: 'Apr', revenue: 2180000, satisfaction: 92, productivity: 89, decisions: 61 },
    { month: 'May', revenue: 2250000, satisfaction: 93, productivity: 91, decisions: 58 },
    { month: 'Jun', revenue: 2400000, satisfaction: 94, productivity: 87, decisions: 63 }
];

// Department Comparison Data
export const departmentData = [
    {
        id: 1,
        name: 'Sales',
        efficiency: 92,
        productivity: 88,
        satisfaction: 95,
        budget: 450000,
        headcount: 24,
        trend: 'up'
    },
    {
        id: 2,
        name: 'Marketing',
        efficiency: 85,
        productivity: 91,
        satisfaction: 89,
        budget: 380000,
        headcount: 18,
        trend: 'up'
    },
    {
        id: 3,
        name: 'Engineering',
        efficiency: 94,
        productivity: 87,
        satisfaction: 92,
        budget: 720000,
        headcount: 42,
        trend: 'down'
    },
    {
        id: 4,
        name: 'Customer Support',
        efficiency: 88,
        productivity: 93,
        satisfaction: 96,
        budget: 290000,
        headcount: 28,
        trend: 'up'
    },
    {
        id: 5,
        name: 'Operations',
        efficiency: 90,
        productivity: 85,
        satisfaction: 87,
        budget: 410000,
        headcount: 22,
        trend: 'stable'
    }
];

// Anomaly Alerts Data
export const anomalyAlerts = [
    {
        id: 1,
        type: 'warning',
        severity: 'high',
        title: 'Unusual Spike in Customer Churn',
        description: 'Churn rate increased by 18% in the enterprise segment over the past 2 weeks. This deviation is 2.3 standard deviations above the normal range.',
        metric: 'Customer Retention',
        deviation: '+18%',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        priority: 'High',
        department: 'Sales',
        actionRequired: true,
        contextAdded: false
    },
    {
        id: 2,
        type: 'danger',
        severity: 'critical',
        title: 'Budget Variance Alert',
        description: 'Marketing spend is 23% over budget for Q1 with 3 weeks remaining. This represents a $87,400 overage.',
        metric: 'Budget Compliance',
        deviation: '+23%',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        priority: 'Critical',
        department: 'Marketing',
        actionRequired: true,
        contextAdded: true
    },
    {
        id: 3,
        type: 'info',
        severity: 'low',
        title: 'Positive Trend Identified',
        description: 'Customer support response time improved by 34% after recent process changes. This is 1.8 standard deviations better than baseline.',
        metric: 'Response Time',
        deviation: '-34%',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        priority: 'Informational',
        department: 'Customer Support',
        actionRequired: false,
        contextAdded: false
    },
    {
        id: 4,
        type: 'warning',
        severity: 'medium',
        title: 'Engineering Productivity Dip',
        description: 'Engineering team productivity decreased by 6% this week. Coincides with infrastructure migration project.',
        metric: 'Team Productivity',
        deviation: '-6%',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        priority: 'Medium',
        department: 'Engineering',
        actionRequired: true,
        contextAdded: true
    }
];

// Historical Decisions Data
export const historicalDecisions = [
    {
        id: 1,
        date: '2024-01-15',
        title: 'Increase Marketing Budget for Q1',
        category: 'Budget Allocation',
        confidence: 87,
        context: 'New product launch planned, competitor analysis showed market opportunity',
        dataSignals: ['Revenue trend positive', 'Customer acquisition cost declining', 'Market share growing'],
        intuition: 'Strong market momentum, timing is right for aggressive push',
        decision: 'Approved 25% budget increase',
        outcome: 'success',
        actualResult: 'Revenue increased 32%, ROI exceeded projections by 18%',
        lessons: 'Early market entry with strong marketing support drives outsized returns'
    },
    {
        id: 2,
        date: '2024-02-03',
        title: 'Delay Infrastructure Migration',
        category: 'Technical Decision',
        confidence: 72,
        context: 'Team capacity constrained, major client onboarding in progress',
        dataSignals: ['Team utilization at 94%', 'Client onboarding critical path', 'Migration complexity high'],
        intuition: 'Risk of service disruption too high during critical period',
        decision: 'Postponed by 6 weeks',
        outcome: 'success',
        actualResult: 'Client onboarding completed smoothly, migration executed with zero downtime',
        lessons: 'Timing matters - technical decisions must account for business context'
    },
    {
        id: 3,
        date: '2024-03-10',
        title: 'Expand Customer Support Team',
        category: 'Hiring',
        confidence: 91,
        context: 'Response times increasing, customer satisfaction scores declining',
        dataSignals: ['Ticket volume up 45%', 'Response time SLA breaches increasing', 'CSAT down 8 points'],
        intuition: 'Quality of support directly impacts retention, need to act fast',
        decision: 'Approved 6 new hires',
        outcome: 'success',
        actualResult: 'Response times improved 34%, CSAT recovered to 96%, retention improved',
        lessons: 'Investing in customer experience pays dividends in retention'
    },
    {
        id: 4,
        date: '2024-04-22',
        title: 'Launch Premium Tier Pricing',
        category: 'Product Strategy',
        confidence: 68,
        context: 'Enterprise customers requesting advanced features, willing to pay premium',
        dataSignals: ['15 enterprise prospects in pipeline', 'Feature requests clustered', 'Competitor pricing higher'],
        intuition: 'Market ready for premium offering, but execution risk exists',
        decision: 'Approved premium tier launch',
        outcome: 'partial',
        actualResult: '8 conversions (53% of target), pricing needed adjustment after 2 months',
        lessons: 'Good strategic direction, but initial pricing too aggressive. Iterate quickly.'
    },
    {
        id: 5,
        date: '2024-05-18',
        title: 'Reject Partnership with TechCorp',
        category: 'Strategic Partnership',
        confidence: 79,
        context: 'Partnership terms unfavorable, cultural misalignment concerns',
        dataSignals: ['Revenue share terms below market', 'Integration costs high', 'Timeline aggressive'],
        intuition: 'Red flags in negotiation process, gut says this won\'t work long-term',
        decision: 'Declined partnership',
        outcome: 'success',
        actualResult: 'TechCorp had major leadership changes 3 months later, partnership would have failed',
        lessons: 'Trust intuition when data and gut align on risk factors'
    },
    {
        id: 6,
        date: '2024-06-05',
        title: 'Implement 4-Day Work Week Pilot',
        category: 'HR Policy',
        confidence: 64,
        context: 'Productivity concerns, but employee satisfaction low, retention issues',
        dataSignals: ['Turnover up 12%', 'Employee survey scores declining', 'Productivity stable'],
        intuition: 'Bold move needed to retain talent, productivity may actually improve',
        decision: 'Approved 3-month pilot for Engineering',
        outcome: 'success',
        actualResult: 'Productivity increased 7%, employee satisfaction up 23 points, zero attrition',
        lessons: 'Sometimes counterintuitive decisions work - trust data + employee feedback'
    }
];

// Decision Recommendations Data
export const decisionRecommendations = [
    {
        id: 1,
        title: 'Reallocate Marketing Budget to Retention Initiatives',
        confidence: 87,
        category: 'Budget Optimization',
        urgency: 'high',
        description: [
            'Based on the detected churn spike in the enterprise segment and current budget variance, we recommend immediately shifting 15% of your marketing budget from acquisition to retention initiatives.',
            'The data shows that enterprise customers who receive proactive outreach within 48 hours of showing disengagement signals have a 67% higher retention rate.',
            'Given your upcoming product launch context, this retention focus will ensure you maintain a stable customer base while preparing for new customer acquisition post-launch.'
        ],
        dataFactors: [
            { label: 'Data Signal', value: '18% churn increase detected', weight: 0.35 },
            { label: 'Historical Pattern', value: '67% retention improvement with early intervention', weight: 0.30 },
            { label: 'Budget Impact', value: 'Stays within Q1 constraints', weight: 0.20 },
            { label: 'ROI Projection', value: '3.2x return on retention spend', weight: 0.15 }
        ],
        contextFactors: [
            'Product launch timing in 4 weeks',
            'Seasonal Q2 trend shows 22% higher engagement',
            'Competitor pricing changes creating market uncertainty'
        ],
        estimatedImpact: {
            revenue: '+$180K over next quarter',
            retention: '+12% enterprise segment',
            timeline: '2-4 weeks to see results'
        },
        risks: [
            'Short-term reduction in new customer acquisition',
            'Requires quick team pivot and training'
        ],
        alternatives: [
            'Hire additional customer success managers (higher cost, slower)',
            'Implement automated retention campaigns (lower touch, moderate effectiveness)'
        ]
    },
    {
        id: 2,
        title: 'Accelerate Engineering Hiring Despite Productivity Dip',
        confidence: 73,
        category: 'Team Scaling',
        urgency: 'medium',
        description: [
            'While engineering productivity shows a 6% decline, contextual analysis reveals this is due to infrastructure migration, not team performance issues.',
            'Product roadmap analysis shows 3 major features committed for Q3 requiring 40% more engineering capacity.',
            'Recommend proceeding with planned hiring of 4 senior engineers, starting interviews immediately.'
        ],
        dataFactors: [
            { label: 'Capacity Gap', value: '40% shortfall for Q3 commitments', weight: 0.40 },
            { label: 'Productivity Context', value: 'Temporary dip due to migration', weight: 0.25 },
            { label: 'Time to Hire', value: '8-12 weeks average', weight: 0.20 },
            { label: 'Revenue Impact', value: 'Feature delays risk $320K revenue', weight: 0.15 }
        ],
        contextFactors: [
            'Infrastructure migration completes in 2 weeks',
            'Strong product pipeline with customer commitments',
            'Competitive talent market requires fast action'
        ],
        estimatedImpact: {
            capacity: '+40% engineering output by Q3',
            revenue: 'Protects $320K committed revenue',
            timeline: '10 weeks to full productivity'
        },
        risks: [
            'Hiring costs during productivity dip may raise concerns',
            'Onboarding overhead could temporarily reduce productivity further'
        ],
        alternatives: [
            'Contract engineers for short-term capacity (faster, higher cost)',
            'Delay feature commitments (lower cost, revenue risk)'
        ]
    }
];

// Context Input Examples
export const contextExamples = [
    {
        id: 1,
        scenario: 'Budget Overage',
        context: 'Marketing budget is over because we accelerated our product launch campaign by 3 weeks to beat a competitor to market. The early launch resulted in 2,400 additional sign-ups worth an estimated $180K in annual revenue.',
        tags: ['Product Launch', 'Competitive Response', 'Revenue Impact']
    },
    {
        id: 2,
        scenario: 'Productivity Decline',
        context: 'Engineering productivity dipped this week due to our planned infrastructure migration to AWS. This is a temporary, expected decrease. We\'ll see productivity return to normal next week and improve by 15% once migration is complete.',
        tags: ['Infrastructure', 'Planned Change', 'Temporary Impact']
    },
    {
        id: 3,
        scenario: 'Customer Churn',
        context: 'The churn spike is concentrated in customers who signed up during our aggressive Q4 promotion. These were lower-quality leads with different expectations. We\'ve since refined our targeting criteria.',
        tags: ['Customer Quality', 'Promotion Impact', 'Process Improvement']
    }
];

// Quick Context Tags
export const contextTags = [
    '🚀 Product Launch',
    '📅 Seasonal Trend',
    '💰 Budget Constraint',
    '👥 Team Changes',
    '🏢 Market Shift',
    '⚡ Urgent Priority',
    '🎯 Strategic Initiative',
    '🔧 Technical Debt',
    '📊 Data Quality Issue',
    '🤝 Partnership',
    '🏆 Competitive Response',
    '📈 Growth Opportunity'
];

export default {
    kpiMetrics,
    performanceTrends,
    departmentData,
    anomalyAlerts,
    historicalDecisions,
    decisionRecommendations,
    contextExamples,
    contextTags
};
