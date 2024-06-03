import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GetTweetData from "../components/GetTweetData"
import EmotionPreview from "../components/EmotionPreview";
import Feed from "../components/Feed";

function Dashboard() {
	const location = useLocation();
	const [full_analysis, setFullAnalysis] = useState(null);

	useEffect(() => {
		(async () => {
			let params = new URLSearchParams(location.search);
			let user_id = params.get("user_id");
			setFullAnalysis(await GetTweetData(user_id));
		})();
	}, []);


	return (
		<div id="HomePage" className="w-full h-full flex flex-col md:flex-row justify-between items-center">
			<div className="w-[55%] h-full px-[60px] mx-auto">
				<Feed data={full_analysis} />
			</div>
			<div className="w-[35%] h-full"/>
			<div className="w-[35%] h-full fixed right-0 top-0">
				<EmotionPreview data={full_analysis} />
			</div>
		</div>
	);
}

export default Dashboard