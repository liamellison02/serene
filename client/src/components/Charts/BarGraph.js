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

  let love = 0, anger = 0, sadness = 0;
  ({ love, anger, sadness } = data["timeline_sentiment_data"]["intensity_totals"]);

  // Handle missing data
  if (!data) {
    return <p>Loading data...</p>;
  }

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };
  
  const chartData = {
    labels: ["Love", "Anger", "Sadness"],
    datasets: [
      {
        data: [
          love,
          anger,
          sadness,
        ],
        backgroundColor: [
          "rgba(255, 0, 0, 0.2)", // Red for Anger
          "rgba(0, 128, 0, 0.2)", // Green for Joy
          "rgba(128, 0, 128, 0.2)", // Purple for Sadness
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)", // Red for Anger
          "rgba(0, 128, 0, 1)", // Green for Joy
          "rgba(128, 0, 128, 1)", // Purple for Sadness
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-full h-full bg-slate-200 rounded-lg flex justify-center items-center p-4">
        <Bar data={chartData} options={options}/>
    </div>
  );
}

export default BarGraph;
