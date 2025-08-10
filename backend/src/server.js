 import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import notesRoutes from './routes/notes-routes.js';
import connectDB from './config/notes-db.js';
import ratelimiterMiddleware from './middleware/rate limiter.js';
import cors from 'cors';


dotenv.config();
const app = express();
app.use(cors(
  {
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
));
app.use(express.json());
app.use(ratelimiterMiddleware);


app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); 
});
const PORT = process.env.PORT || 5001;

connectDB();

app.use('/api/notes', notesRoutes )

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});