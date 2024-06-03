import { Feed, EmotionPreview, Header } from "../components"

function Home() {
	return (
		
		<div id="HomePage" className="w-full h-full flex flex-col md:flex-row justify-between items-center">
			<Header />
			{/* <div className="pl-[60px] w-[45%] h-full">
				<Feed type="user" />
			</div>
			<div className="w-[35%] h-full fixed right-0 top-0">
				<EmotionPreview />
			</div> */}
			Hello lol
		</div>
	);
}

export default Home;