const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConnection.js');
const router = require('./routes/index.js');

const app = express();

app.use(cors({
    origin: 'http://localhost:5174', // Allow requests from this origin
    credentials: true // Allow cookies and authentication headers
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 9001; // Corrected the fallback condition

// Database Connection and Server Start
connectDB()
    .then(() => {
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1); // Optional: Stop the app if DB connection fails
    });

// Global Error Handling Middleware (Optional but useful)
app.use((err, req, res, next) => {
    console.error("💥 Internal Server Error:", err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
