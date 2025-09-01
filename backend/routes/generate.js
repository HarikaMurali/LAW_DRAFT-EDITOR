const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API with safety settings
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
};

// POST /api/generate
router.post('/', async (req, res) => {
  try {
    const { caseType, details, jurisdiction } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    if (!caseType || !details) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig,
    });

    const prompt = `Create a legal draft for a ${caseType} case in ${jurisdiction || 'general'} jurisdiction.
    
Details: ${details}

Please format the response as follows:
1. Case Summary
2. Legal Framework
3. Key Points
4. Draft Content
5. Recommendations`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Empty response from AI');
    }

    res.json({ 
      draft: text,
      status: 'success'
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      error: 'Failed to generate draft',
      details: error.message,
      status: 'error'
    });
  }
});

module.exports = router;