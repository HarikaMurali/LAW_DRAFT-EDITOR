const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate full draft
router.post('/', async (req, res) => {
  try {
    const { caseType, details, jurisdiction } = req.body;
    
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key is not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Enhanced input validation
    if (!caseType || typeof caseType !== 'string') {
      return res.status(400).json({ error: 'Valid case type is required' });
    }
    if (!details || typeof details !== 'string' || details.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide sufficient case details (minimum 10 characters)' });
    }

    // Use a different model that is available in your region
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const systemPrompt = `You are a professional legal-draft assistant. Your task is to generate a well-structured legal draft based on the provided details. Output a formatted legal draft with clear headings, numbered clauses, and a concise "legal basis" section with relevant citations where applicable.`;
    const userPrompt = `Generate a ${caseType} draft for jurisdiction: ${jurisdiction || 'default'}. Facts/details:\n${details}\n`;

    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Invalid response from Gemini');
    }

    res.json({ 
      draft: text,
      metadata: {
        model: "gemini-1.5-pro",
        caseType,
        jurisdiction: jurisdiction || 'default',
        timestamp: new Date().toISOString()
      }
    });

  } catch(err) {
    console.error("Gemini API error:", err);
    
    // Handle specific error types from Gemini API
    if (err.message.includes('429')) {
      return res.status(429).json({
        error: 'Service temporarily unavailable due to rate limiting or quota exceeded',
        details: 'Please check your Google Cloud account for billing and try again later.'
      });
    }

    res.status(500).json({
      error: 'Failed to generate draft',
      details: err.message
    });
  }
});

module.exports = router;