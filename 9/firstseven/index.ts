import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    const bmi = calculateBmi(Number(req.query.weight), Number(req.query.height));
    res.json({
      weight: Number(req.query.weight),
      height: Number(req.query.height),
      bmi: bmi
    });
  } else {
    res.json({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if ( !daily_exercises || !target ) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if ( !Array.isArray(daily_exercises) || !daily_exercises.every(num => typeof Number(num) === 'number') || isNaN(Number(target)) ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises as number[], Number(target));
  return res.json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});