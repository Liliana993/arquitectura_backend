import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:00000/mydatabase',
  jwtSecret: process.env.JWT_SECRET || 'my_secret',
  nodeEnv: process.env.NODE_ENV || 'development',
};
