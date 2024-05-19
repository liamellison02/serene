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
    const timeline_data = GetTweetData()["timeline_analysis_data"];

    const chartData = {
        labels: ["Anger", "Joy", "Sadness"],
        datasets: [
            {
                label: "Anger",
                data: [
                    timeline_data["timeline_weighted_anger"] || 0,
                    0, // placeholder for joy
                    0, // placeholder for sadness
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
                    timeline_data["timeline_weighted_joy"] || 0,
                    0, // placeholder for sadness
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
                    timeline_data["timeline_weighted_sadness"] || 0,
                ],
                backgroundColor: "rgba(255, 206, 86, 0.2)", // Yellow
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 2,
                fill: true,
                tension: 0.4, // Curve effect
            },
        ],
    };

    return (
        <div className="w-full h-full bg-slate-200 rounded-lg shadow-md flex justify-center items-center">
            <Line data={chartData}/>
        </div>
    );
}

export default CurveGraph;
