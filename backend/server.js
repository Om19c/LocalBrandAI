import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateRoutes from './routes/generateRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({ origin:"*"}));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.json({ message: 'LocalBrandAI API is running', docs: '/health' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'LocalBrandAI Backend', timestamp: new Date().toISOString() });
});

app.use('/api/generate', generateRoutes);
app.use('/api/campaigns', campaignRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
  console.log(`🚀 LocalBrandAI backend running on http://localhost:${PORT}`);
});
