import React, { useState } from 'react';

function Tweet({user, text}) {
    return (
        <div id="tweet" className="my-10">
            <p className="text-[#00297A] font-bold text-xl"><b>{user}</b></p>
            <p className="text-xl">{text}</p>
        </div>
    );
}

function Feed() {

    const [tweets, setTweets] = useState([
        {
            "mood": "sad",
            "score": "69420",
            "id":"343434",
            "date":"2020-02-28",
            "user": "@SummoningSalt",
            "text": "1 million views in 40 hours! Not bad for a 2 hour long video. Thanks so much everyone - super positive feedback on this one. More Tetris content in the future for sure.",
        },
        {
            "mood": "sad",
            "score": "69420",
            "id":"343434",
            "date":"2020-02-28",
            "user": "@YikeLOL",
            "text": "That really hurts",
        },
        {
            "mood": "sad",
            "score": "69420",
            "id":"343434",
            "date":"2020-02-28",
            "user": "@User3",
            "text": "Split 2 ADC SoloQ TierlistChamps with high AD scalings that don't need Attackspeed do really well right now - Cait Jhin Aphelios Draven BLACKFIRE TORCH is absolutely broken hence Karthus and Brand",
        }
    ]);

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