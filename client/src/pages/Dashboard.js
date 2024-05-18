import { Chart1, Chart2, } from "../components/Charts"

function Dashboard() {
    return (
        <div className="flex justify-center items-center">
            <Chart1/>
            <Chart2/>
        </div>
    );
}

export default Dashboard