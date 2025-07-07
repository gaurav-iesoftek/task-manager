import express from 'express';
import cors from 'cors';
import taskRoute from './routes/taskRoute';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8081;

app.get('/', (req, res) => {
  console.log('Hello From the Server');
  res.status(200).json({ success: 'This is message for the success' });
});

app.use('/api', taskRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
});
