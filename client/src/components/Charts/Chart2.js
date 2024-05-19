import GetTweetData from "../GetTweetData";
import { Line } from "react-chartjs-2";
import {
  Chart,
  registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
Chart.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart2() {
  const overall_data = GetTweetData()["overall_analysis_data"];

  console.log("Overall Data:", overall_data); // Debugging

  const chartData = {
    labels: ["Anger", "Joy", "Sadness", "Fear"],
    datasets: [
      {
        label: "Anger",
        data: [
          overall_data.overall_weighted_anger || 0,
          0, // placeholder for joy
          0, // placeholder for sadness
          0, // placeholder for fear
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Red
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Curve effect
      },
      {
        label: "Joy",
        data: [
          0, // placeholder for anger
          overall_data.overall_weighted_joy || 0,
          0, // placeholder for sadness
          0, // placeholder for fear
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Curve effect
      },
      {
        label: "Sadness",
        data: [
          0, // placeholder for anger
          0, // placeholder for joy
          overall_data.overall_weighted_sadness || 0,
          0, // placeholder for fear
        ],
        backgroundColor: "rgba(255, 206, 86, 0.2)", // Yellow
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Curve effect
      },
      {
        label: "Fear",
        data: [
          0, 
          0, 
          0, 
          overall_data.overall_weighted_fear || 0,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Green
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Curve effect
      },
    ],
  };

  return (
    <div className="w-[400px] h-[450px] m-10 bg-gray-200 p-6 rounded-lg shadow-md">
    <h1 className="text-xl font-bold mb-4">Chart #2</h1>
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Overall Emotion Intensity</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Line data={chartData} />
      </div>
    </div>
    <div className="text-sm text-gray-600">
      <p>Overall Tweets: {overall_data["num_overall_tweets"]}</p>
      <p>Overall Prominent Emotion: {overall_data["overall_most_prominent_emotion"]}</p>
      <p>Overall Weighted Anger: {overall_data["overall_weighted_anger"]}</p>
      <p>Overall Weighted Sadness: {overall_data["overall_weighted_sadness"]}</p>
      <p>Overall Weighted Joy: {overall_data["overall_weighted_joy"]}</p>
    </div>
  </div>
  );
}

export default Chart2;
