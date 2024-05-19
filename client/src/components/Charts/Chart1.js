import React from "react";
import GetTweetData from "../GetTweetData";

function Chart1() {
  
  const timeline_data = GetTweetData()["timeline_analysis_data"];

  return (
<<<<<<< HEAD
    <div className="w-[400px] h-[650px] m-10 bg-gray-200 p-6 rounded-lg shadow-md ">
      <h1 className="text-xl font-bold mb-4">Chart #1</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Overall Emotion Intensity
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
          <Pie data={chartData} />
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <p>
          <span className="font-bold">Num Tweets:</span>{" "}
          {timelineData.num_timeline_tweets}
        </p>
        <p>
          <span className="font-bold">Most prominent emotion:</span>{" "}
          {timelineData.timeline_most_prominent_emotion}
        </p>
        <p>
          <span className="font-bold">Timeline weighted anger:</span>{" "}
          {timelineData.timeline_weighted_anger}
        </p>
        <p>
          <span className="font-bold">Timeline weighted sadness:</span>{" "}
          {timelineData.timeline_weighted_sadness}
        </p>
        <p>
          <span className="font-bold">Timeline weighted joy:</span>{" "}
          {timelineData.timeline_weighted_joy}
        </p>
      </div>
      {hasUserData && userData && (
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-bold">User Tweets:</span>{" "}
            {userData.num_user_tweets}
          </p>
          <p>
            <span className="font-bold">User prominent emotion:</span>{" "}
            {userData.user_most_prominent_emotion}
          </p>
          <p>
            <span className="font-bold">User weighted anger:</span>{" "}
            {userData.user_weighted_anger}
          </p>
          <p>
            <span className="font-bold">User weighted sadness:</span>{" "}
            {userData.user_weighted_sadness}
          </p>
          <p>
            <span className="font-bold">User weighted joy:</span>{" "}
            {userData.user_weighted_joy}
          </p>
        </div>
      )}
=======
    <div className="w-full h-full rounded-lg bg-red-200 p-6 overflow-y-scroll">
      <h1 className="text-xl mb-4">Quick Timeline Info</h1>
      <p># Tweets: <b>{timeline_data["num_timeline_tweets"]}</b></p>
      <p>Overall Emotion: <b>{timeline_data["timeline_most_prominent_emotion"]}</b></p>
      <p>Anger Score: <b>{timeline_data["timeline_weighted_anger"]}</b></p>
      <p>Sadness Score: <b>{timeline_data["timeline_weighted_sadness"]}</b></p>
      <p>Joy Score: <b>{timeline_data["timeline_weighted_joy"]}</b></p>
>>>>>>> d23ede6c6a8ae6b6bd9caf02c2879d8c272b1c33
    </div>
  );
}

export default Chart1;