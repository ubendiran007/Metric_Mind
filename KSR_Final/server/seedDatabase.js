require('dotenv').config();
const mongoose = require('mongoose');
const KPI = require('./models/KPI');
const Anomaly = require('./models/Anomaly');
const Decision = require('./models/Decision');
const Department = require('./models/Department');

// Import mock data
const {
    kpiMetrics,
    anomalyAlerts,
    historicalDecisions,
    departmentData
} = require('../src/data/mockData');

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await KPI.deleteMany({});
        await Anomaly.deleteMany({});
        await Decision.deleteMany({});
        await Department.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Seed KPIs
        const kpiData = Object.entries(kpiMetrics).map(([name, data]) => ({
            name,
            ...data
        }));
        await KPI.insertMany(kpiData);
        console.log(`✅ Seeded ${kpiData.length} KPIs`);

        // Seed Anomalies
        const anomalyData = anomalyAlerts.map(alert => ({
            type: alert.type,
            severity: alert.severity,
            title: alert.title,
            description: alert.description,
            metric: alert.metric,
            deviation: alert.deviation,
            priority: alert.priority,
            department: alert.department,
            actionRequired: alert.actionRequired,
            contextAdded: alert.contextAdded,
            createdAt: new Date(alert.timestamp)
        }));
        await Anomaly.insertMany(anomalyData);
        console.log(`✅ Seeded ${anomalyData.length} anomalies`);

        // Seed Historical Decisions
        const decisionData = historicalDecisions.map(decision => ({
            date: new Date(decision.date),
            title: decision.title,
            category: decision.category,
            confidence: decision.confidence,
            context: decision.context,
            dataSignals: decision.dataSignals,
            intuition: decision.intuition,
            decision: decision.decision,
            outcome: decision.outcome,
            actualResult: decision.actualResult,
            lessons: decision.lessons
        }));
        await Decision.insertMany(decisionData);
        console.log(`✅ Seeded ${decisionData.length} decisions`);

        // Seed Departments
        await Department.insertMany(departmentData);
        console.log(`✅ Seeded ${departmentData.length} departments`);

        console.log('\n🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
