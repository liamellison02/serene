import { Feed } from "../components"

function Home() {
	return (
		<div id="HomePage" className="w-full h-full pt-[60px] flex justify-around items-center">
			<Feed type="user" />
		</div>
	);
}

export default Home;