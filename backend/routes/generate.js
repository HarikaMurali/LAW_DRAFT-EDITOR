const express = require('express');
const router = express.Router();
const Draft = require('../models/Draft');
const auth = require('../middleware/auth');

// Mock draft generator (fallback when API is unavailable)
const generateMockDraft = (caseType, details, jurisdiction) => {
  const date = new Date().toLocaleDateString();
  
  return `LEGAL DRAFT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TITLE: ${caseType.toUpperCase()} LEGAL DRAFT
DATE: ${date}
JURISDICTION: ${jurisdiction || 'Default'}

I. PARTIES INVOLVED
   Primary Party: Mentioned in the case details
   Secondary Party: All relevant parties as per the facts presented
   
II. FACTUAL BACKGROUND
   The parties are involved in a legal matter as described below:
   
   ${details}
   
   The above facts constitute the basis of this legal action.

III. LEGAL ISSUES
   The following legal issues arise from the factual background:
   
   1. Whether the facts constitute a valid legal cause of action
   2. Whether the applicable laws have been violated
   3. What remedies are available to the aggrieved party
   4. The quantum of damages, if any

IV. LEGAL PROVISIONS & CITATIONS
   The following laws and provisions are applicable to this case:
   
   For ${jurisdiction || 'the applicable jurisdiction'}:
   - Relevant Statutes and Acts
   - Common Law Principles
   - Established Precedents
   - Applicable Regulations
   
   The court shall apply these provisions in interpreting the rights 
   and obligations of the parties.

V. PRAYERS/RELIEF SOUGHT
   The petitioner/plaintiff respectfully prays before this Hon'ble Court for:
   
   1. To declare the rights and obligations of the parties
   2. To enforce the contractual/legal obligations
   3. To award compensation for damages suffered
   4. To grant such other relief as deemed just and proper
   5. To award costs of this proceeding

VI. CONCLUSION
   Based on the facts presented, applicable law, and legal precedents,
   the relief sought is justified and in the interest of justice.
   
   This draft has been prepared to assist in understanding the legal
   position and to serve as a basis for further legal proceedings.
   
   It is submitted for consideration of the Hon'ble Court.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTE: This is a generated draft for reference purposes. It should be 
reviewed and customized by a qualified legal professional before filing 
with any court or legal authority.

Generated on: ${date}
Draft Type: ${caseType}`;
};

// Generate full draft
router.post('/', async (req, res) => {
  try {
    const { caseType, details, jurisdiction } = req.body;

    // Enhanced input validation
    if (!caseType || typeof caseType !== 'string') {
      return res.status(400).json({ error: 'Valid case type is required' });
    }
    if (!details || typeof details !== 'string' || details.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide sufficient case details (minimum 10 characters)' });
    }

    console.log(`Generating draft for case type: ${caseType}, jurisdiction: ${jurisdiction || 'default'}`);

    // Use mock draft generator as fallback
    const draftText = generateMockDraft(caseType, details, jurisdiction);

    console.log('Draft generated successfully, length:', draftText.length);

    res.json({
      draft: draftText,
      metadata: {
        model: "mock-generator",
        caseType,
        jurisdiction: jurisdiction || 'default',
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error("Draft generation error:", err);
    res.status(500).json({
      error: 'Failed to generate draft',
      details: err.message
    });
  }
});

// Mock endpoint for testing
router.post('/mock', async (req, res) => {
  try {
    const { caseType, details, jurisdiction } = req.body;

    if (!caseType || !details) {
      return res.status(400).json({ error: 'Case type and details are required' });
    }

    const draftText = generateMockDraft(caseType, details, jurisdiction);

    res.json({
      draft: draftText,
      metadata: {
        model: "mock-generator",
        caseType,
        jurisdiction: jurisdiction || 'default',
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error("Mock draft generation error:", err);
    res.status(500).json({
      error: 'Failed to generate draft',
      details: err.message
    });
  }
});

module.exports = router;