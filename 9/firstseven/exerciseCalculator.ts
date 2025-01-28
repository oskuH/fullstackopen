interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): number[] => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const hours: number[] = [];
  for (let i = 2, len = args.length; i < len; i++) {
    if (!isNaN(Number(args[i]))) {
      hours.push(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  return hours;
};

export const calculateExercises = (hours: number[], target: number): ExerciseResults => {
  const periodLength = hours.length;

  const trainingDays = hours.filter(num => num !== 0).length;

  const hoursSum = hours.reduce((acc, num) => acc + num, 0);
  const average = hoursSum / periodLength;

  let success;
  if (average >= target) {
    success = true;
  } else {
    success = false;
  }

  let rating;
  if (success) {
    rating = 3;
  } else if (average >= target / 2) {
    rating = 2;
  } else {
    rating = 1;
  }

  let ratingDescription:string = "Undefined.";
  if (rating === 3) {
    ratingDescription = 
    'You meet general physical activity guidelines. Keep it up! And remember: more does not hurt.';
  } else if (rating === 2) {
    ratingDescription = 
    'You are getting some health benefits from exercise but consider it worthwile to increase until you meet the target.';
  } else if (rating === 1) {
    ratingDescription =
    'You will get considerable health benefits by increasing exercising.';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

try {
  const hours = parseExerciseArguments(process.argv);
  const target = 1.5 / 7;
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}