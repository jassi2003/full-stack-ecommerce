const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConnection.js');
const router = require('./routes/index.js');

const app = express();

// ✅ Improved CORS Configuration
app.use(cors({
    origin: 'https://full-stack-ecommerce-frontend-1ynq.onrender.com', // Allow deployed frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow all methods
    allowedHeaders: ['Content-Type', 'Authorization','token'],    // Allow necessary headers
    credentials: true // Allow cookies and authentication headers
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

// ✅ Correct Port Priority
const PORT = process.env.PORT || 9000; 

// ✅ Database Connection and Error Handling
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("✅ Connected to DB");
            console.log(`🚀 Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection error:", err);
        process.exit(1); // Stop server if DB connection fails
    });

// ✅ Global Error Handler (Catch Unhandled Errors)
app.use((err, req, res, next) => {
    console.error("💥 Unhandled Error:", err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});
