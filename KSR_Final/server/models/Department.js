const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    efficiency: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    productivity: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    satisfaction: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    headcount: {
        type: Number,
        required: true
    },
    trend: {
        type: String,
        enum: ['up', 'down', 'stable'],
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Department', departmentSchema);
