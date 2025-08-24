require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev')); 
app.use(rateLimit({ windowMs: 1*60*1000, max: 50 })); // 50 requests per minute

app.use('/tasks', taskRoutes);

app.use((err, req, res, next) => res.status(500).json({ error: err.message }));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 3000, () => console.log('Server running'));
});
