const mongoose = require('mongoose');

const decisionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    confidence: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    context: {
        type: String,
        required: true
    },
    dataSignals: [{
        type: String
    }],
    intuition: {
        type: String,
        required: true
    },
    decision: {
        type: String,
        required: true
    },
    outcome: {
        type: String,
        enum: ['success', 'partial', 'failure', 'pending'],
        default: 'pending'
    },
    actualResult: {
        type: String,
        default: ''
    },
    lessons: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Decision', decisionSchema);
