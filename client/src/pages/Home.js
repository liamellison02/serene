import { Feed } from "../components"
import { Chart1, BarGraph } from "../components/Charts"

function Home() {
	return (
		<div id="HomePage" className="w-full h-full pt-[60px] flex justify-around items-center">
			<div className="w-[20%] hidden lg:block">
				<div className="mb-8"><BarGraph/></div>
				<Chart1 />
			</div>
			<Feed type="timeline" />
			<Feed type="user" />
		</div>
	);
}

export default Home;