require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error(err));

// basic route
app.get('/', (req,res) => res.send('Backend running'));

// mount routes (we'll create these files soon)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/drafts', require('./routes/drafts'));
app.use('/api/generate', require('./routes/generate'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server ${PORT}`));
