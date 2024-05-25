import { Feed, EmotionPreview } from "../components"

function Home() {
	return (
		<div id="HomePage" className="w-full h-full pt-[60px] px-[10px] md:px-[60px] flex flex-col md:flex-row justify-between items-center">
			<Feed type="user" />
			<EmotionPreview/>
		</div>
	);
}

export default Home;