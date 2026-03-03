const mongoose = require('mongoose');

const anomalySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['warning', 'danger', 'info'],
        required: true
    },
    severity: {
        type: String,
        enum: ['critical', 'high', 'medium', 'low'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    metric: {
        type: String,
        required: true
    },
    deviation: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['Critical', 'High', 'Medium', 'Low', 'Informational'],
        required: true
    },
    department: {
        type: String,
        required: true
    },
    actionRequired: {
        type: Boolean,
        default: false
    },
    contextAdded: {
        type: Boolean,
        default: false
    },
    context: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Anomaly', anomalySchema);
