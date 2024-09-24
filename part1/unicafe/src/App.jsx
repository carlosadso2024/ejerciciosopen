import { useState, useCallback, useMemo } from "react";


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;


const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);


const Statistics = ({ good, neutral, bad }) => {
  const stats = useMemo(() => {
    const total = good + neutral + bad;
    const average = (good - bad) / total || 0;
    const positivePercentage = (good / total) * 100 || 0;

    return {
      total,
      average: average.toFixed(2),
      positivePercentage: positivePercentage.toFixed(2),
    };
  }, [good, neutral, bad]);

  if (stats.total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={stats.total} />
        <StatisticLine text="average" value={stats.average} />
        <StatisticLine text="positive" value={`${stats.positivePercentage}%`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = useCallback((type) => {
    setFeedback((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  }, []);

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={() => handleFeedback("good")} text="good" />
      <Button onClick={() => handleFeedback("neutral")} text="neutral" />
      <Button onClick={() => handleFeedback("bad")} text="bad" />

      <h1>statistics</h1>
      <Statistics {...feedback} />
    </div>
  );
};

export default App;
