import React from "react";
import GetTweetData from "../GetTweetData";
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
  const timeline_data = GetTweetData()["timeline_analysis_data"];

  // Handle missing data
  if (!timeline_data) {
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
    labels: ["Anger", "Joy", "Sadness"],
    datasets: [
      {
        data: [
          timeline_data["timeline_weighted_anger"],
          timeline_data["timeline_weighted_sadness"],
          timeline_data["timeline_weighted_joy"],
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
    <div className="w-full h-full bg-slate-200 rounded-lg flex justify-center items-center">
        <Bar data={chartData} options={options}/>
    </div>
  );
}

export default BarGraph;
