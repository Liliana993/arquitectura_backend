import express from 'express';
import 'dotenv/config';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import eventRouter from './src/routes/events.routes.js';
import sessionRouter from './src/routes/sessions.routes.js';
import { connectDB } from './src/config/database.js';
import './src/config/passport.config.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

const PORT = process.env.PORT || 3000;

connectDB();

app.use('/api/events', eventRouter);
app.use('/api/sessions', sessionRouter);

app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    status: "error",
    message: err.message || "Error interno del servidor"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
