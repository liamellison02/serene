import GetTweetData from "../GetTweetData"

function Chart2() {
    const overall_data = GetTweetData()["overall_analysis_data"];

    return (
        <div className="w-[300px] h-[300px] m-10 bg-green-500">
            <h1 className="font-bold">Chart #1</h1>
            <p>overall Tweets: {overall_data["num_overall_tweets"]}</p>
            <p>overall prominent emotion: {overall_data["overall_weighted_anger"]}</p>
            <p>overall weighted anger: {overall_data["overall_weighted_sadness"]}</p>
            <p>overall weighted sadness: {overall_data["overall_weighted_sadness"]}</p>
            <p>overall weighted joy: {overall_data["timeline_weighted_joy"]}</p>
        </div>
    );
}

export default Chart2