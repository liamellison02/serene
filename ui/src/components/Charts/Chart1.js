import GetTweetData from "../GetTweetData";

function Chart1() {
  
  const timeline_data = GetTweetData()["timeline_analysis_data"];

  return (
    <div className="w-full h-full rounded-lg bg-amber-100 p-6 overflow-y-scroll">
      <h1 className="text-xl mb-4">Quick Timeline Info</h1>
      <p># Tweets: <b>{timeline_data["num_timeline_tweets"]}</b></p>
      <p>Overall Emotion: <b>{timeline_data["timeline_most_prominent_emotion"]}</b></p>
      <p>Anger Score: <b>{timeline_data["timeline_weighted_anger"]}</b></p>
      <p>Sadness Score: <b>{timeline_data["timeline_weighted_sadness"]}</b></p>
      <p>Joy Score: <b>{timeline_data["timeline_weighted_joy"]}</b></p>
    </div>
  );
}

export default Chart1;