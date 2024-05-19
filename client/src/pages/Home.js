import { Feed } from "../components"
import { Chart1, BarGraph } from "../components/Charts"

function Home() {
	return (
		<div id="HomePage" className="w-full h-full pt-[60px] flex justify-around items-center">
			<div className="w-[20%] h-[40%] hidden lg:block"><BarGraph /></div>
			<Feed />
			<div className="w-[20%] h-[40%] hidden lg:block"><Chart1 /></div>
		</div>
	);
}

export default Home;