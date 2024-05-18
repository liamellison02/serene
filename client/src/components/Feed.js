import React, { useState } from 'react';
import { GetUserAndTimelineTweetData } from "./GetTweetData"

function Tweet({user, text}) {
    return (
        <div id="tweet" className="my-10">
            <p className="text-[#00297A] font-bold text-xl"><b>{user}</b></p>
            <p className="text-xl">{text}</p>
        </div>
    );
}

function Feed() {

    const user_tweets = GetUserAndTimelineTweetData()["user_tweet_data"];
    const timeline_tweets = GetUserAndTimelineTweetData()["timeline_tweet_data"];

    const tweets = [...user_tweets, ...timeline_tweets];

    return (
        <div id="feed" className="w-[85%] md:w-[600px] h-full">
            {tweets.map((tweet, index) => (
                <div key={index}>
                    <Tweet user={tweet.user} text={tweet.text}/>
                </div>
            ))}
        </div>
    )
}

export default Feed;