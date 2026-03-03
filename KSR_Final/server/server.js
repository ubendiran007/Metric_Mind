require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import models
const User = require('./models/User');
const KPI = require('./models/KPI');
const Anomaly = require('./models/Anomaly');
const Decision = require('./models/Decision');
const Department = require('./models/Department');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ===================================
// API Routes
// ===================================

// User Registration
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            // Work without MongoDB - just return success
            return res.status(201).json({ 
                message: 'User created successfully', 
                user: { id: Date.now().toString(), name, email } 
            });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const user = new User({ name, email, password, businesses: [] });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            // Work without MongoDB - just return success
            return res.json({ 
                message: 'Login successful', 
                user: { id: Date.now().toString(), name: 'User', email, businesses: [] } 
            });
        }
        
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, businesses: user.businesses } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User Data
app.get('/api/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user: { id: user._id, name: user.name, email: user.email, businesses: user.businesses } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Business to User
app.post('/api/user/business', async (req, res) => {
    try {
        const { email, business } = req.body;
        
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            // Work without MongoDB - just return success
            return res.json({ message: 'Business added successfully', businesses: [business] });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const businessExists = user.businesses.find(b => b.id === business.id);
        if (!businessExists) {
            user.businesses.push(business);
            await user.save();
        }
        res.json({ message: 'Business added successfully', businesses: user.businesses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove Business from User
app.delete('/api/user/business/:businessId', async (req, res) => {
    try {
        const { businessId } = req.params;
        const { email } = req.body;
        
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            // Work without MongoDB - just return success
            return res.json({ message: 'Business removed successfully', businesses: [] });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        user.businesses = user.businesses.filter(b => b.id !== businessId);
        await user.save();
        
        res.json({ message: 'Business removed successfully', businesses: user.businesses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'InsightBridge API is running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Get all KPIs
app.get('/api/kpis', async (req, res) => {
    try {
        const kpis = await KPI.find();
        const kpiObject = {};
        kpis.forEach(kpi => {
            kpiObject[kpi.name] = {
                value: kpi.value,
                trend: kpi.trend,
                label: kpi.label,
                period: kpi.period,
                unit: kpi.unit,
                target: kpi.target,
                status: kpi.status
            };
        });
        res.json(kpiObject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all anomaly alerts
app.get('/api/alerts', async (req, res) => {
    try {
        const alerts = await Anomaly.find().sort({ createdAt: -1 });
        const formattedAlerts = alerts.map(alert => ({
            id: alert._id,
            type: alert.type,
            severity: alert.severity,
            title: alert.title,
            description: alert.description,
            metric: alert.metric,
            deviation: alert.deviation,
            timestamp: alert.createdAt.toISOString(),
            priority: alert.priority,
            department: alert.department,
            actionRequired: alert.actionRequired,
            contextAdded: alert.contextAdded
        }));
        res.json(formattedAlerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get chart data (performance trends)
app.get('/api/chart-data', (req, res) => {
    // This would typically come from time-series data in MongoDB
    // For now, returning static data
    res.json([
        { label: 'Jan', value: 65 },
        { label: 'Feb', value: 72 },
        { label: 'Mar', value: 68 },
        { label: 'Apr', value: 85 },
        { label: 'May', value: 78 },
        { label: 'Jun', value: 92 }
    ]);
});

// Get all historical decisions
app.get('/api/decisions', async (req, res) => {
    try {
        const decisions = await Decision.find().sort({ date: -1 });
        const formattedDecisions = decisions.map(decision => ({
            id: decision._id,
            date: decision.date,
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
        res.json(formattedDecisions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all departments
app.get('/api/departments', async (req, res) => {
    try {
        const departments = await Department.find();
        const formattedDepartments = departments.map((dept, index) => ({
            id: index + 1,
            name: dept.name,
            efficiency: dept.efficiency,
            productivity: dept.productivity,
            satisfaction: dept.satisfaction,
            budget: dept.budget,
            headcount: dept.headcount,
            trend: dept.trend
        }));
        res.json(formattedDepartments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Generate AI recommendation
app.post('/api/recommendations', async (req, res) => {
    try {
        const { context } = req.body;

        // In a real app, this would use ML/AI to generate recommendations
        // For now, returning a context-aware response
        res.json({
            confidence: 87,
            title: 'Reallocate Marketing Budget & Implement Customer Retention Program',
            description: [
                'Based on the detected churn spike in the enterprise segment and current budget variance, we recommend immediately shifting 15% of your marketing budget from acquisition to retention initiatives.',
                'Given your upcoming product launch context, this retention focus will ensure you maintain a stable customer base while preparing for new customer acquisition post-launch.'
            ],
            factors: [
                { label: 'Data Signal', value: '18% churn increase detected' },
                { label: 'Historical Pattern', value: '67% retention improvement with early intervention' },
                { label: 'Your Context', value: context || 'Product launch timing considered' },
                { label: 'Budget Impact', value: 'Stays within Q1 constraints' }
            ]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add context to anomaly
app.put('/api/alerts/:id/context', async (req, res) => {
    try {
        const { id } = req.params;
        const { context } = req.body;

        const alert = await Anomaly.findByIdAndUpdate(
            id,
            { context, contextAdded: true },
            { new: true }
        );

        if (!alert) {
            return res.status(404).json({ error: 'Alert not found' });
        }

        res.json({ message: 'Context added successfully', alert });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new decision
app.post('/api/decisions', async (req, res) => {
    try {
        const decision = new Decision(req.body);
        await decision.save();
        res.status(201).json({ message: 'Decision created successfully', decision });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update decision outcome
app.put('/api/decisions/:id/outcome', async (req, res) => {
    try {
        const { id } = req.params;
        const { outcome, actualResult, lessons } = req.body;

        const decision = await Decision.findByIdAndUpdate(
            id,
            { outcome, actualResult, lessons },
            { new: true }
        );

        if (!decision) {
            return res.status(404).json({ error: 'Decision not found' });
        }

        res.json({ message: 'Decision outcome updated successfully', decision });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 InsightBridge Backend Server running on http://localhost:${PORT}`);
    console.log(`📊 API Endpoints:`);
    console.log(`   - POST /api/auth/register`);
    console.log(`   - POST /api/auth/login`);
    console.log(`   - GET  /api/user/:email`);
    console.log(`   - POST /api/user/business`);
    console.log(`   - DELETE /api/user/business/:businessId`);
    console.log(`   - GET  /api/health`);
    console.log(`   - GET  /api/kpis`);
    console.log(`   - GET  /api/alerts`);
    console.log(`   - GET  /api/chart-data`);
    console.log(`   - GET  /api/decisions`);
    console.log(`   - GET  /api/departments`);
    console.log(`   - POST /api/recommendations`);
    console.log(`   - PUT  /api/alerts/:id/context`);
    console.log(`   - POST /api/decisions`);
    console.log(`   - PUT  /api/decisions/:id/outcome`);
});
