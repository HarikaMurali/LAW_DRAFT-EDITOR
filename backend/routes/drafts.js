const express = require('express');
const router = express.Router();
const Draft = require('../models/Draft');
const auth = require('../middleware/auth'); // Import the middleware

// @route   GET /api/drafts/debug
// @desc    Debug endpoint to check all drafts (for testing purposes)
// @access  Public (temporary for debugging)
router.get('/debug', async (req, res) => {
    try {
        const totalDrafts = await Draft.countDocuments();
        const allDrafts = await Draft.find().sort({ createdAt: -1 }).limit(10);
        
        res.json({
            debug: true,
            totalDrafts,
            recentDrafts: allDrafts.map(draft => ({
                id: draft._id,
                title: draft.title,
                caseType: draft.caseType,
                userId: draft.userId,
                createdAt: draft.createdAt,
                hasText: !!draft.draftText,
                textLength: draft.draftText ? draft.draftText.length : 0
            }))
        });
    } catch (error) {
        res.json({ 
            debug: true,
            error: 'Database connection error',
            details: error.message,
            totalDrafts: 0,
            recentDrafts: []
        });
    }
});

// @route   POST /api/drafts
// @desc    Save a new draft
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { title, caseType, details, draftText } = req.body;
        const newDraft = new Draft({
            userId: req.user.userId,
            title,
            caseType,
            details,
            draftText
        });
        const draft = await newDraft.save();
        res.status(201).json(draft);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

// @route   GET /api/drafts
// @desc    Get all drafts for a specific user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const drafts = await Draft.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(drafts);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

// @route   GET /api/drafts/:id
// @desc    Get a single draft by its ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const draft = await Draft.findById(req.params.id);
        if (!draft || draft.userId.toString() !== req.user.userId) {
            return res.status(404).json({ msg: 'Draft not found' });
        }
        res.json(draft);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

module.exports = router;