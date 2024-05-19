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

function Chart1() {
  const timeline_data = GetTweetData()["timeline_analysis_data"];
  console.log(timeline_data);

  // Handle missing data
  if (!timeline_data) {
    return <p>Loading data...</p>;
  }
  const chartData = {
    labels: ["Anger", "Joy", "Sadness", "Fear"],
    datasets: [
      {
        label: "Emotion Intensity",
        data: [
          timeline_data.anger,
          timeline_data.joy,
          timeline_data.sadness,
          timeline_data.Fear,
        ],
        backgroundColor: [
          "rgba(255, 0, 0, 0.2)", // Red for Anger
          "rgba(0, 128, 0, 0.2)", // Green for Joy
          "rgba(128, 0, 128, 0.2)", // Purple for Sadness
          "rgba(255, 165, 0, 0.2)", // Orange for Fear
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)", // Red for Anger
          "rgba(0, 128, 0, 1)", // Green for Joy
          "rgba(128, 0, 128, 1)", // Purple for Sadness
          "rgba(255, 165, 0, 1)", // Orange for Fear
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-[400px] h-[450px] m-10 bg-gray-200 p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Chart #1</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Overall Emotion Intensity
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={chartData} />
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <p>
          <span className="font-bold">Num Tweets:</span>{" "}
          {timeline_data["num_timeline_tweets"]}
        </p>
        <p>
          <span className="font-bold">Most prominent emotion:</span>{" "}
          {timeline_data["timeline_most_prominent_emotion"]}
        </p>
        <p>
          <span className="font-bold">Timeline weighted anger:</span>{" "}
          {timeline_data["timeline_weighted_anger"]}
        </p>
        <p>
          <span className="font-bold">Timeline weighted sadness:</span>{" "}
          {timeline_data["timeline_weighted_sadness"]}
        </p>
        <p>
          <span className="font-bold">Timeline weighted joy:</span>{" "}
          {timeline_data["timeline_weighted_joy"]}
        </p>
      </div>
    </div>
  );
}

export default Chart1;
