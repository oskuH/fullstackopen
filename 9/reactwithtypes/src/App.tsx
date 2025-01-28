const App = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartDescription {
    requirements: string [];
    kind: "special"
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  type CoursePart = CoursePartBasic | CoursePartSpecial | CoursePartBackground | CoursePartGroup;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>
  }

  const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
      case "basic":
        return <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div>{part.description}</div>
        </p>
      case "background":
        return <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div>{part.description}</div>
          <div>{part.backgroundMaterial}</div>
        </p>
      case "group":
        return <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div>project exercises {part.groupProjectCount}</div>
        </p>
      case "special":
        return <p>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div>{part.description}</div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </p>
      default:
        return assertNever(part)
    }
  }

  const Content = ({ courseParts }: { courseParts: CoursePart [] }) => {
    return <div>
      {courseParts.map(coursePart => <Part part={coursePart} />)}
    </div>
  }

  const Total = ({ totalExercises }: { totalExercises: number }) => {
    return <div>Number of exercises {totalExercises}</div>
  }

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;