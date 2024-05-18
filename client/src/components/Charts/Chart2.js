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
        label: "Overall Emotion Intensity",
        data: [
          overall_data.overall_weighted_anger || 0,
          overall_data.overall_weighted_joy || 0,
          overall_data.overall_weighted_sadness || 0,
          overall_data.overall_weighted_fear || 0,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Curve effect
      },
    ],
  };

  return (
    <div className="w-[300px] h-[300px] m-10 bg--500">
      <h1 className="font-bold">Chart #2</h1>
      <div>
        <h2>Overall Emotion Intensity</h2>
        <Line data={chartData} />
      </div>
      <p>overall Tweets: {overall_data["num_overall_tweets"]}</p>
      <p>overall prominent emotion: {overall_data["overall_weighted_anger"]}</p>
      <p>overall weighted anger: {overall_data["overall_weighted_sadness"]}</p>
      <p>
        overall weighted sadness: {overall_data["overall_weighted_sadness"]}
      </p>
      <p>overall weighted joy: {overall_data["timeline_weighted_joy"]}</p>
    </div>
  );
}

export default Chart2;
