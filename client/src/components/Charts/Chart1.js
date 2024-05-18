import GetTweetData from "../GetTweetData";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
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
