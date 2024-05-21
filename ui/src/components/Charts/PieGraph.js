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

function PieGraph() {
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
        <div className="w-full h-full bg-slate-200 rounded-lg shadow-md flex justify-center items-center p-6">
            <Pie data={chartData} />
        </div>
    );
}

export default PieGraph;
