import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './configs/db.js';
import {inngest, functions} from './inngest/index.js'

const app=express();

//console.log("MONGODB_URL:", process.env.MONGODB_URL);
await connectDB();

//add middleware
app.use(express.json());
app.use(cors()); 

//creating routes
app.get('/',(req,res)=>res.send('Server is running'))
app.use('/api/inngest', serve({ client: inngest, functions }))

//to star app adding port
const PORT=process.env.PORT || 4000;

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))