// eslint-disable-next-line @typescript-eslint/no-unused-expressions
require.main === module;

interface WeightAndHeight {
  weight: number;
  height: number;
}

const parseBmiArguments = (args: string[]): WeightAndHeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[3]),
      height: Number(args[2])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (weight: number, height: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal range';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi >= 30) {
    return 'Obese';
  }
  return 'Something went wrong when calculating BMI.';
};

try {
  const { weight, height } = parseBmiArguments(process.argv);
  console.log(calculateBmi(weight, height));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}