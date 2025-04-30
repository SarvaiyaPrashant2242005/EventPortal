require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConfig');
const packageRoutes = require('./routes/packageRoutes');
const companyRoutes = require('./routes/companyRoutes');

const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/packages', packageRoutes);
app.use('/api/companies', companyRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Event Data Collection Portal API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});