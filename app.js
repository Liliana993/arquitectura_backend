import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import eventRouter from './src/routes/events.routes.js';
import sessionRouter from './src/routes/sessions.routes.js';
//import { config } from './src/config/config.js';
import { connectDB } from './src/config/database.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

connectDB();

app.use('/api/events', eventRouter);
app.use('/api/sessions', sessionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
