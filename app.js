import express from 'express';
import 'dotenv/config';
import eventRouter from './src/routes/event.routes.js'
//import { config } from './src/config/config.js';
import { connectDB } from './src/config/database.js';

const app = express();
app.use(express.json());

connectDB();

app.use('/api/events', eventRouter);

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
