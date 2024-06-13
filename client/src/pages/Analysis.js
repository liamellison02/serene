import EmotionPreview from "../components/EmotionPreview";
import { Stats } from "../components"


function Analysis() {

	return (
		<div id="HomePage" className="w-full h-full flex flex-col md:flex-row justify-between items-center">
			<div className="w-[65%] h-full px-[60px] mx-auto">
				 <Stats />
			</div>
			<div className="w-[35%] h-full"/>
			<a href="/dashboard" className="w-[35%] h-full fixed right-0 top-0 bg-[#FFFFFF]">
				<EmotionPreview />
			</a>
		</div>
	);
}

export default Analysis
