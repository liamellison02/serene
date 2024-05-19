import GetTweetData from "../GetTweetData";

function Chart2() {
	const overall_data = GetTweetData()["overall_analysis_data"];

	return (
		<div className="w-full h-full rounded-lg bg-blue-200 p-6 overflow-y-scroll">
			<h1 className="text-xl mb-4">Quick User Info</h1>
			<p># Tweets: <b>{overall_data["num_overall_tweets"]}</b></p>
			<p>Overall emotion: <b>{overall_data["overall_most_prominent_emotion"]}</b></p>
			<p>Anger Score: <b>{overall_data["overall_weighted_anger"]}</b></p>
			<p>Sadness Score: <b>{overall_data["overall_weighted_sadness"]}</b></p>
			<p>Joy Score: <b>{overall_data["overall_weighted_joy"]}</b></p>
		</div>
	);
}

export default Chart2;
