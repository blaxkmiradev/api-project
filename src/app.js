const express = require('express');
const apiRoutes = require('./routes/api.routes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Register API routes
app.use('/api', apiRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
