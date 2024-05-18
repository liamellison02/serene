import GetTweetData from "../GetTweetData"

function Chart1() {

    const timeline_data = GetTweetData()["timeline_analysis_data"];

    return (
        <div className="w-[300px] h-[300px] m-10 bg-red-500">
            <h1 className="font-bold">Chart #2</h1>
            <p>Num Tweets: {timeline_data["num_timeline_tweets"]}</p>
            <p>Most prominent emotion: {timeline_data["timeline_most_prominent_emotion"]}</p>
            <p>Timeline weighted anger: {timeline_data["timeline_weighted_anger"]}</p>
            <p>Timeline weighted sadness: {timeline_data["timeline_weighted_sadness"]}</p>
            <p>Timeline weighted joy: {timeline_data["timeline_weighted_joy"]}</p>
        </div>
    );
}

export default Chart1;