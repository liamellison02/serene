import GetTweetData from "../GetTweetData";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Chart1() {
  const data = GetTweetData();
  const hasUserData = data.has_user_data;
  const timelineData = data.timeline_analysis_data;
  const userData = data.user_and_analysis_data;

  console.log(timelineData, "timeline data");

  // Handle missing data
  if (!timelineData) {
    return <p>Loading data...</p>;
  }

  const chartData = {
    labels: ["Anger", "Joy", "Sadness"],
    datasets: [
      {
        label: "Emotion Intensity",
        data: [
          timelineData.timeline_weighted_anger,
          timelineData.timeline_weighted_joy,
          timelineData.timeline_weighted_sadness,
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
    <div className="w-[400px] h-[450px] m-10 bg-gray-200 p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Chart #1</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Overall Emotion Intensity
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Pie data={chartData} />
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <p>
          <span className="font-bold">Num Tweets:</span>{" "}
          {timelineData.num_timeline_tweets}
        </p>
        <p>
          <span className="font-bold">Most prominent emotion:</span>{" "}
          {timelineData.timeline_most_prominent_emotion}
        </p>
        <p>
          <span className="font-bold">Timeline weighted anger:</span>{" "}
          {timelineData.timeline_weighted_anger}
        </p>
        <p>
          <span className="font-bold">Timeline weighted sadness:</span>{" "}
          {timelineData.timeline_weighted_sadness}
        </p>
        <p>
          <span className="font-bold">Timeline weighted joy:</span>{" "}
          {timelineData.timeline_weighted_joy}
        </p>
      </div>
      {hasUserData && userData && (
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-bold">User Tweets:</span>{" "}
            {userData.num_user_tweets}
          </p>
          <p>
            <span className="font-bold">User prominent emotion:</span>{" "}
            {userData.user_most_prominent_emotion}
          </p>
          <p>
            <span className="font-bold">User weighted anger:</span>{" "}
            {userData.user_weighted_anger}
          </p>
          <p>
            <span className="font-bold">User weighted sadness:</span>{" "}
            {userData.user_weighted_sadness}
          </p>
          <p>
            <span className="font-bold">User weighted joy:</span>{" "}
            {userData.user_weighted_joy}
          </p>
        </div>
      )}
    </div>
  );
}

export default Chart1;
