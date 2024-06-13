import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarGraph() {
  const tweetData = useSelector(state => state.tweetData)
  const data = tweetData.data
  const emotionTotals = data.timeline_sentiment_data.intensity_totals
  const labels = []
  const totals = []
  const colors = []
  const emotionPairs = Object.entries(emotionTotals);
  emotionPairs.forEach(([key, value]) => {
    // Do something with each key-value pair
    labels.push(key)
    totals.push(value)
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  });

  // Handle missing data
  if (!data) {
    return <p>Loading data...</p>;
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: totals,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[45%] h-full bg-slate-200 rounded-lg flex justify-center items-center p-4">
        <Bar data={chartData} options={options}/>
    </div>
  );
}

export default BarGraph;
