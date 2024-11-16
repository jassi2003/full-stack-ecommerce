    const express=require('express');
    const cors=require('cors');
    require('dotenv').config()
    const connectDB=require('./config/dbConnection.js')
    const router=require('./routes/index.js')


    const app=express()
    app.use(cors({
        origin: 'http://localhost:5173', // Allow requests from this origin
        credentials: true // Allow cookies and authentication headers
      }));
    app.use(express.json())
    
    app.use("/api",router)

    const PORT=8000 || process.env.PORT

    connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connected to db")
        console.log(`server is listening to port ${PORT}`)
    })
})