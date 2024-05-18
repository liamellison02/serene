import React, { useState } from 'react';

function Tweet({name, content}) {
    return (
        <div id="tweet" className="my-10">
            <p className="text-[#00297A] font-bold text-xl"><b>{name}</b></p>
            <p className="text-xl">{content}</p>
        </div>
    );
}

function Feed() {

    const [tweets, setTweets] = useState([
        {
            name: "@SummoningSalt",
            content: "1 million views in 40 hours! Not bad for a 2 hour long video. Thanks so much everyone - super positive feedback on this one. More Tetris content in the future for sure.",
        },
        {
            name: "@YikeLOL",
            content: "That really hurts",
        },
        {
            name: "User3",
            content: "Split 2 ADC SoloQ TierlistChamps with high AD scalings that don't need Attackspeed do really well right now - Cait Jhin Aphelios Draven BLACKFIRE TORCH is absolutely broken hence Karthus and Brand",
        }
    ]);

    return (
        <div id="feed" className="w-[85%] md:w-[600px] h-full">
            {tweets.map((tweet, index) => (
                <div key={index}>
                    <Tweet name={tweet.name} content={tweet.content}/>
                </div>
            ))}
        </div>
    )
}

export default Feed;