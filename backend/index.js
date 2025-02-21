import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import aiRoutes from './routes/ai.routes.js'

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URL)
.then(console.log("Connected to db."))
.catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});