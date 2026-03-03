const mongoose = require('mongoose');

const kpiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['revenue', 'satisfaction', 'productivity', 'accuracy']
    },
    value: {
        type: Number,
        required: true
    },
    trend: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['exceeding', 'meeting', 'below'],
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('KPI', kpiSchema);
