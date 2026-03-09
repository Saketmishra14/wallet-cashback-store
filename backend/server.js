const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const PORT = process.env.PORT || 5000;

// Validate required environment variables for production
if (!MONGODB_URI) {
  if (NODE_ENV === 'production') {
    console.error('❌ MONGODB_URI is required in production environment');
    process.exit(1);
  } else {
    console.warn('⚠️  MONGODB_URI is not set. Create a .env file in backend folder.');
    console.warn('   Copy from .env.example and add your MongoDB connection string.');
  }
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration for production
const corsOptions = {
  origin: NODE_ENV === 'production' ? FRONTEND_URL : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// MongoDB Connection with retry logic
let isDBConnected = false;

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.warn('⚠️  Skipping MongoDB connection - MONGODB_URI not set');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
    });
    isDBConnected = true;
    console.log("✅ MongoDB Connected successfully");
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // Retry after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Only try to connect if URI is provided
if (MONGODB_URI) {
  connectDB();
}

// Handle connection events
mongoose.connection.on('connected', () => {
  isDBConnected = true;
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  isDBConnected = false;
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  isDBConnected = false;
  console.warn('⚠️  Mongoose disconnected from MongoDB');
});

// Models
let Product;
try {
  Product = require("./models/Product");
} catch (err) {
  console.error('❌ Error loading Product model:', err.message);
}



app.get("/products", async (req, res) => {
  try {
    if (!Product) {
      return res.status(503).json({ 
        error: 'Product model not available',
        message: 'Server is initializing. Please try again in a moment.'
      });
    }

    if (!isDBConnected) {
      return res.status(503).json({ 
        error: 'Database not connected',
        message: 'Attempting to connect to MongoDB. Please try again in a moment.'
      });
    }

    const products = await Product.find();
    res.json(products);

  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ 
      error: 'Error fetching products',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  return res.status(200).json({ 
    message: 'Backend is running', 
    status: 'OK',
    database: isDBConnected ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
  console.log(`${'='.repeat(60)}`);
  
  if (!MONGODB_URI) {
    console.log('\n⚠️  MongoDB Connection Required:');
    console.log('   1. Copy "backend/.env.example" to "backend/.env"');
    console.log('   2. Update MONGODB_URI with your MongoDB connection string');
    console.log('   3. Restart the server: npm run dev\n');
  } else {
    console.log(`\n✅ MongoDB URI configured`);
    console.log(`   Database Status: ${isDBConnected ? '✅ Connected' : '⏳ Connecting...'}\n`);
  }

  console.log(`📍 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🌍 Environment: ${NODE_ENV}\n`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Shutting down gracefully...');
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB:', err);
  }
  process.exit(0);
});
