import express from 'express';
import diagnosisRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
const app = express();
app.use(express.json());
import { Request } from 'express';
import cors from 'cors';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors<Request>());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});