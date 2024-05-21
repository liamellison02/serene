import { Chart1, Chart2, BarGraph, CurveGraph, PieGraph } from "../components/Charts"

function Dashboard() {
    return (
        <div className="w-full h-full pt-[60px] flex justify-evenly items-center flex-wrap">
            <div className="w-[300px] h-[300px]"><CurveGraph/></div>
            <div className="w-[300px] h-[300px]"><Chart1/></div>
            <div className="w-[300px] h-[300px]"><BarGraph/></div>
            <div className="w-[300px] h-[300px]"><Chart2/></div>
            <div className="w-[300px] h-[300px]"><PieGraph/></div>
        </div>
    );
}

export default Dashboard