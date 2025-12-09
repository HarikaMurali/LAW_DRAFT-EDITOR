require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Import routes
const authRouter = require('./routes/auth');
const draftsRouter = require('./routes/drafts');
const generateRouter = require('./routes/generate');

// Use routes with explicit paths
app.use('/api/auth', authRouter);
app.use('/api/drafts', draftsRouter);
app.use('/api/generate', generateRouter);

// Additional AI features
app.post('/api/proofread', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    // Mock proofreading service (can be replaced with actual AI API)
    const result = `Proofreading Analysis:
    
✓ Grammar Check: No major grammatical errors found.
✓ Legal Terminology: Appropriate legal language used.
✓ Structure: Document follows standard legal format.
    
Suggestions:
• Consider adding more specific citations where applicable
• Ensure all party names are consistently formatted
• Review dates and jurisdictional references for accuracy
    
Overall: The draft appears well-structured and professionally written.`;
    
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Proofreading service error', details: error.message });
  }
});

app.post('/api/suggest-clauses', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    // Mock clause suggestion service
    const suggestions = `Suggested Additional Clauses:

1. FORCE MAJEURE CLAUSE
   "Neither party shall be liable for any failure to perform due to circumstances beyond reasonable control..."

2. DISPUTE RESOLUTION
   "Any disputes arising from this agreement shall be resolved through arbitration in accordance with applicable laws..."

3. CONFIDENTIALITY CLAUSE
   "Both parties agree to maintain confidentiality of all sensitive information disclosed during..."

4. INDEMNIFICATION
   "Each party agrees to indemnify and hold harmless the other party from any claims, damages, or liabilities..."

5. SEVERABILITY
   "If any provision of this agreement is found invalid, the remaining provisions shall continue in full force..."`;
    
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: 'Clause suggestion service error', details: error.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT}`));
