import 'dotenv/config';
import express from 'express';
import { connectDatabase } from './database/connection.js';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/movies', movieRoutes);

app.get('/', (_req, res) => {
  res.json({ success: true, message: '🎬 MovieTime API is running!' });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`🚀  MovieTime API listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌  Failed to start the server:', error);
    process.exit(1);
  }
};

start();

export default app;
