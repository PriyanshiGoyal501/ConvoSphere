import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './configs/db.js';
import {inngest, functions} from './inngest/index.js'
import {serve} from 'inngest/express';
import { clerkMiddleware } from '@clerk/express';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import storyRouter from './routes/storyRoutes.js';

const app=express();

//console.log("MONGODB_URL:", process.env.MONGODB_URL);
await connectDB();

//add middleware 
app.use(express.json());
app.use(cors()); 
app.use(clerkMiddleware());

//creating routes
app.get('/',(req,res)=>res.send('Server is running'))
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/story', storyRouter)


//to star app adding port
const PORT=process.env.PORT || 4000;

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))










