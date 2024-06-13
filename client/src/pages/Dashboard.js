import { useLocation } from 'react-router-dom';
import EmotionPreview from "../components/EmotionPreview";
import Feed from "../components/Feed";
import { useGetDataQuery } from "../redux/tweetDataAPI"

function Dashboard() {
	const location = useLocation();
	const params = new URLSearchParams(location.search)
	let user_id = params.get("user_id")
	useGetDataQuery(user_id)

	return (
		<div id="HomePage" className="w-full h-full flex flex-col md:flex-row justify-between items-center">
			<div className="w-[55%] h-full px-[60px] mx-auto">
				 <Feed />
			</div>
			<div className="w-[35%] h-full"/>
			<a href="/analysis" className="w-[35%] h-full fixed right-0 top-0 bg-[#FFFFFF]">
				<EmotionPreview />
			</a>
		</div>
	);
}

export default Dashboard
