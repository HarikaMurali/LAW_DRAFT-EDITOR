const mongoose = require('mongoose');
const DraftSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    caseType: String,
    details: String,
    draftText: String,
    clauses: [{
        key: String,
        title: String,
        text: String
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Draft', DraftSchema);