const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Draft = require('../models/Draft');
const auth = require('../middleware/auth');

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate full draft
router.post('/', async (req, res) => {
  try {
    const { caseType, details, jurisdiction } = req.body;
    
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key is not configured');
      return res.status(500).json({ error: 'Server configuration error: Gemini API key not found' });
    }

    // Enhanced input validation
    if (!caseType || typeof caseType !== 'string') {
      return res.status(400).json({ error: 'Valid case type is required' });
    }
    if (!details || typeof details !== 'string' || details.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide sufficient case details (minimum 10 characters)' });
    }

    console.log(`Generating draft for case type: ${caseType}, jurisdiction: ${jurisdiction || 'default'}`);

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

    console.log('Draft generated successfully, length:', text.length);

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

    if (err.message.includes('fetch failed') || err.message.includes('API key')) {
      return res.status(500).json({
        error: 'API configuration error',
        details: 'Please verify that the Gemini API key is properly configured and has access to the required model.'
      });
    }

    res.status(500).json({
      error: 'Failed to generate draft',
      details: err.message
    });
  }
});

// Generate and save draft (requires authentication)
router.post('/save', auth, async (req, res) => {
  try {
    const { caseType, details, jurisdiction, title } = req.body;
    
    console.log(`User ${req.user.userId} generating and saving draft for case type: ${caseType}`);
    
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key is not configured');
      return res.status(500).json({ error: 'Server configuration error: Gemini API key not found' });
    }

    // Enhanced input validation
    if (!caseType || typeof caseType !== 'string') {
      return res.status(400).json({ error: 'Valid case type is required' });
    }
    if (!details || typeof details !== 'string' || details.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide sufficient case details (minimum 10 characters)' });
    }
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({ error: 'Please provide a title for the draft (minimum 3 characters)' });
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

    // Save the generated draft to database
    const newDraft = new Draft({
      userId: req.user.userId,
      title: title.trim(),
      caseType,
      details,
      draftText: text
    });

    const savedDraft = await newDraft.save();
    console.log('Draft saved successfully with ID:', savedDraft._id);

    res.status(201).json({
      success: true,
      draft: savedDraft,
      metadata: {
        model: "gemini-1.5-pro",
        caseType,
        jurisdiction: jurisdiction || 'default',
        timestamp: new Date().toISOString(),
        saved: true
      }
    });

  } catch(err) {
    console.error("Generate and save error:", err);
    
    // Handle specific error types from Gemini API
    if (err.message.includes('429')) {
      return res.status(429).json({
        error: 'Service temporarily unavailable due to rate limiting or quota exceeded',
        details: 'Please check your Google Cloud account for billing and try again later.'
      });
    }

    if (err.message.includes('fetch failed') || err.message.includes('API key')) {
      return res.status(500).json({
        error: 'API configuration error',
        details: 'Please verify that the Gemini API key is properly configured and has access to the required model.'
      });
    }

    // Handle database errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Database validation error',
        details: err.message
      });
    }

    res.status(500).json({
      error: 'Failed to generate and save draft',
      details: err.message
    });
  }
});

// Mock draft generation for testing (when Gemini API is not available)
router.post('/mock', async (req, res) => {
  try {
    const { caseType, details, jurisdiction } = req.body;
    
    // Enhanced input validation
    if (!caseType || typeof caseType !== 'string') {
      return res.status(400).json({ error: 'Valid case type is required' });
    }
    if (!details || typeof details !== 'string' || details.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide sufficient case details (minimum 10 characters)' });
    }

    console.log(`Generating MOCK draft for case type: ${caseType}, jurisdiction: ${jurisdiction || 'default'}`);

    // Generate a mock legal draft
    const mockDraft = `
LEGAL DRAFT - ${caseType.toUpperCase()}

JURISDICTION: ${jurisdiction || 'Default'}
DATE: ${new Date().toLocaleDateString()}

1. PARTIES
   The parties to this ${caseType} are defined based on the following details:
   ${details}

2. TERMS AND CONDITIONS
   This ${caseType} shall be governed by the following terms:
   - All parties agree to comply with applicable laws
   - Disputes shall be resolved through appropriate legal channels
   - This document serves as a binding agreement

3. LEGAL BASIS
   This ${caseType} is drafted in accordance with:
   - General contract law principles
   - Applicable local statutes
   - Best practices for ${caseType} agreements

4. CONCLUSION
   This draft serves as a foundation for legal review and finalization.

Note: This is a mock draft generated for testing purposes. Please consult with a qualified attorney for actual legal documents.
    `.trim();

    console.log('Mock draft generated successfully, length:', mockDraft.length);

    res.json({ 
      draft: mockDraft,
      metadata: {
        model: "mock-generator",
        caseType,
        jurisdiction: jurisdiction || 'default',
        timestamp: new Date().toISOString(),
        mock: true
      }
    });

  } catch(err) {
    console.error("Mock generation error:", err);
    res.status(500).json({
      error: 'Failed to generate mock draft',
      details: err.message
    });
  }
});

// Mock draft generation and save (requires authentication)
router.post('/mock-save', auth, async (req, res) => {
  try {
    const { caseType, details, jurisdiction, title } = req.body;
    
    console.log(`User ${req.user.userId} generating and saving MOCK draft for case type: ${caseType}`);
    
    // Enhanced input validation
    if (!caseType || typeof caseType !== 'string') {
      return res.status(400).json({ error: 'Valid case type is required' });
    }
    if (!details || typeof details !== 'string' || details.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide sufficient case details (minimum 10 characters)' });
    }
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({ error: 'Please provide a title for the draft (minimum 3 characters)' });
    }

    // Generate a mock legal draft
    const mockDraft = `
LEGAL DRAFT - ${caseType.toUpperCase()}

TITLE: ${title}
JURISDICTION: ${jurisdiction || 'Default'}
DATE: ${new Date().toLocaleDateString()}

1. PARTIES
   The parties to this ${caseType} are defined based on the following details:
   ${details}

2. TERMS AND CONDITIONS
   This ${caseType} shall be governed by the following terms:
   - All parties agree to comply with applicable laws
   - Disputes shall be resolved through appropriate legal channels
   - This document serves as a binding agreement

3. LEGAL BASIS
   This ${caseType} is drafted in accordance with:
   - General contract law principles
   - Applicable local statutes
   - Best practices for ${caseType} agreements

4. CONCLUSION
   This draft serves as a foundation for legal review and finalization.

Note: This is a mock draft generated for testing purposes. Please consult with a qualified attorney for actual legal documents.
    `.trim();

    // Save the generated draft to database
    const newDraft = new Draft({
      userId: req.user.userId,
      title: title.trim(),
      caseType,
      details,
      draftText: mockDraft
    });

    const savedDraft = await newDraft.save();
    console.log('Mock draft saved successfully with ID:', savedDraft._id);

    res.status(201).json({
      success: true,
      draft: savedDraft,
      metadata: {
        model: "mock-generator",
        caseType,
        jurisdiction: jurisdiction || 'default',
        timestamp: new Date().toISOString(),
        saved: true,
        mock: true
      }
    });

  } catch(err) {
    console.error("Mock generate and save error:", err);
    
    // Handle database errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Database validation error',
        details: err.message
      });
    }

    res.status(500).json({
      error: 'Failed to generate and save mock draft',
      details: err.message
    });
  }
});

module.exports = router;