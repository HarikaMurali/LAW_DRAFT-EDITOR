const express = require('express');
const router = express.Router();
const OpenAI = require('openai'); // Correct import

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// @route   POST /api/generate
// @desc    Generate a legal draft using AI
// @access  Public (for now; can be protected later)
router.post('/', async (req, res) => {
    try {
        const { caseType, details } = req.body;
        if (!caseType || !details) {
            return res.status(400).json({ msg: 'Case type and details are required' });
        }
        
        const systemPrompt = `You are a professional legal-draft assistant. Your task is to generate a well-structured legal draft based on the provided details. Output a formatted legal draft with clear headings, numbered clauses, and a concise "legal basis" section with relevant citations where applicable.`;
        
        const userPrompt = `Generate a legal draft for a ${caseType}. Here are the key details and facts:\n${details}\n`;

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo", // You can use "gpt-3.5-turbo" for a faster, cheaper alternative.
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.2, // Lower temperature for more consistent, factual responses.
            max_tokens: 2000 // Adjust as needed for longer drafts.
        });

        const draftText = response.choices[0].message.content;
        res.json({ draft: draftText });
    } catch (err) {
        console.error("OpenAI API Error:", err);
        res.status(500).json({ error: 'Failed to generate draft' });
    }
});

module.exports = router;