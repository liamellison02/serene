import { Feed, EmotionPreview } from "../components"

function Home() {
	return (
		<div id="HomePage" className="w-full h-full flex flex-col md:flex-row justify-between items-center">
			<div className="w-[55%] h-full px-[60px] mx-auto flex justify-center items-center">
				<h1 className="text-[48px] font-lora">Hello, <a href='/authorize/twitter' className="underline text-pink-700">login with twitter</a> to get started :)</h1>
			</div>
			<div className="w-[35%] h-full"/>
			<div className="w-[35%] h-full fixed right-0 top-0">
				<EmotionPreview data={null} />
			</div>
		</div>
	);
}

export default Home;