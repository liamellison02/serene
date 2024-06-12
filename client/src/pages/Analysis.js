import EmotionPreview from "../components/EmotionPreview";


function Analysis() {

	return (
		<div id="HomePage" className="w-full h-full flex flex-col md:flex-row justify-between items-center">
			<div className="w-[55%] h-full px-[60px] mx-auto">
				 {/* <Analysis /> */}
			</div>
			<div className="w-[35%] h-full"/>
			<div className="w-[35%] h-full fixed right-0 top-0 bg-[#FFFFFF]">
				<EmotionPreview />
			</div>
		</div>
	);
}

export default Analysis
