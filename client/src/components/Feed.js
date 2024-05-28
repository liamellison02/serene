import GetTweetData from "./GetTweetData"

function Tweet({user, text, date}) {
    return (
        <div id="tweet" className="my-12">
            <p className="text-[#00297A] text-[24px]"><b>{user}</b> <span className="text-[18px] font-bold text-[#00297a75]">• {date}</span> </p>
            <p className="text-[28px]">{text}</p>
        </div>
    );
}

function Feed({type}) {

    let tweets = [...GetTweetData()["user_tweet_data"], ...GetTweetData()["timeline_tweet_data"]];

    return (
        <div id="feed" className="w-full h-full">
            {tweets.map((tweet, index) => (
                <div key={index}>
                    <Tweet user={tweet.user} text={tweet.text} date={tweet.date}/>
                </div>
            ))}
        </div>
    )
}

export default Feed;