import GetTweetData from "../GetTweetData";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

function Chart2() {
  const data = GetTweetData();
  const overall_data = data["overall_analysis_data"];
  const has_user_data = data["has_user_data"];

  console.log("Overall Data:", overall_data); // Debugging

  // Use default values if has_user_data is false
  const weighted_anger = has_user_data
    ? overall_data.overall_weighted_anger
    : 0;
  const weighted_joy = has_user_data ? overall_data.overall_weighted_joy : 0;
  const weighted_sadness = has_user_data
    ? overall_data.overall_weighted_sadness
    : 0;
  const weighted_fear = has_user_data ? overall_data.overall_weighted_fear : 0;

  const chartData = {
    labels: ["Anger", "Joy", "Sadness"],
    datasets: [
      {
        label: "Anger",
        data: [weighted_anger, 0, 0, 0],
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Red
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Curve effect
      },
      {
        label: "Joy",
        data: [0, weighted_joy, 0, 0],
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Curve effect
      },
      {
        label: "Sadness",
        data: [0, 0, weighted_sadness, 0],
        backgroundColor: "rgba(255, 206, 86, 0.2)", // Yellow
        borderColor: "rgba(255, 206, 86, 1)",
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
        <h2 className="text-lg font-semibold mb-2">
          Overall Emotion Intensity
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Line data={chartData} />
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <p>Overall Tweets: {overall_data["num_overall_tweets"]}</p>
        <p>
          Overall Prominent Emotion:{" "}
          {overall_data["overall_most_prominent_emotion"]}
        </p>
        <p>Overall Weighted Anger: {overall_data["overall_weighted_anger"]}</p>
        <p>
          Overall Weighted Sadness: {overall_data["overall_weighted_sadness"]}
        </p>
        <p>Overall Weighted Joy: {overall_data["overall_weighted_joy"]}</p>
      </div>
    </div>
  );
}

export default Chart2;
