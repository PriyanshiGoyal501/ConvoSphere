import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';

// app.use(clerkMiddleware());

import connectDB from './configs/db.js';

import { inngest, functions }
from './inngest/index.js';

import { serve }
from 'inngest/express';
// import { clerkMiddleware }
// from '@clerk/express';

import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import storyRouter from './routes/storyRoutes.js';
import messageRouter from './routes/messageRoutes.js';

//Express application instance
const app = express();

try {

  await connectDB();

  //middlewares
  app.use(express.json());

  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

  app.use(clerkMiddleware());

  //logger middleware
  app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });

  //routes
  app.get('/', (req, res) =>
    res.send('Server is running')
  );

  app.use(
    '/api/inngest',
    serve({
      client: inngest,
      functions
    })
  );

  app.use('/api/user', userRouter);
  app.use('/api/post', postRouter);
  app.use('/api/story', storyRouter);
  app.use('/api/message', messageRouter);

  //port
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () =>
    console.log(
      `Server is running on port ${PORT}`
    )
  );

} catch (error) {

  console.log(error);
}