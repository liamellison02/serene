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
    <div className="w-[300px] h-[300px] m-10 bg-white-500">
      <h1 className="font-bold">Chart #2</h1>
      <div>
        <h2>Overall Emotion Intensity</h2>
        <Bar data={chartData} />
      </div>

      <p>Num Tweets: {timeline_data["num_timeline_tweets"]}</p>
      <p>
        Most prominent emotion:{" "}
        {timeline_data["timeline_most_prominent_emotion"]}
      </p>
      <p>Timeline weighted anger: {timeline_data["timeline_weighted_anger"]}</p>
      <p>
        Timeline weighted sadness: {timeline_data["timeline_weighted_sadness"]}
      </p>
      <p>Timeline weighted joy: {timeline_data["timeline_weighted_joy"]}</p>
    </div>
  );
}

export default Chart1;
