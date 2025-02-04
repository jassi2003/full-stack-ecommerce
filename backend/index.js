    const express=require('express');
    const cors=require('cors');
    require('dotenv').config()
    const cookieParser=require('cookie-parser')
    const connectDB=require('./config/dbConnection.js')
    const router=require('./routes/index.js')


    const app=express()
    app.use(cors({
        // origin: 'http://localhost:5173', // Allow requests from this origin
        origin: 'https://full-stack-ecommerce-frontend-1ynq.onrender.com', // Allow requests from this origin

        credentials: true // Allow cookies and authentication headers
      }));
    app.use(express.json())
    app.use(cookieParser())
    
    app.use("/api",router)

    const PORT=9000 || process.env.PORT

    connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connected to db")
        console.log(`server is listening to port ${PORT}`)
    })
})
