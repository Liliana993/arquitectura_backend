import express from 'express';
import healthRouter from './router/healt.router.js';
import eventRouter from './router/event.router.js';
import sessionRouter from './router/session.router.js';

const app = express();
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/events', eventRouter);
app.use('/api/session', sessionRouter);


export default app;