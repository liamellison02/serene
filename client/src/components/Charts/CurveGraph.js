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

function CurveGraph() {
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
                data: [0, 0, 0, overall_data.overall_weighted_fear || 0],
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Green
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: true,
                tension: 0.4, // Curve effect
            },
        ],
    };

    return (
        <div className="w-full h-full bg-slate-200 rounded-lg shadow-md flex justify-center items-center">
            <Line data={chartData} />
        </div>
    );
}

export default CurveGraph;
