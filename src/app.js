import express from 'express';
import eventRouter from './routes/event.routes.js'
import { config } from './config/config.js';
import { connectDB } from './config/database.js';

const app = express();
app.use(express.json());

connectDB();

app.use('/api/events', eventRouter);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
