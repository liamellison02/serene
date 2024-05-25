import GetTweetData from "./GetTweetData"

function Tweet({user, text, date}) {
    return (
        <div id="tweet" className="my-10">
            <p className="text-[#00297A] font-bold text-sm"><b>{user}</b> <span className="text-xs font-bold text-[#00297a75]">• {date}</span> </p>
            <p className="text-lg">{text}</p>
        </div>
    );
}

function Feed({type}) {

    let tweets = [...GetTweetData()["user_tweet_data"], ...GetTweetData()["timeline_tweet_data"]];

    return (
        <div id="feed" className="w-[85%] md:w-[66%] h-full overflow-y-scroll overflow-x-hidden">
            {tweets.map((tweet, index) => (
                <div key={index}>
                    <Tweet user={tweet.user} text={tweet.text} date={tweet.date}/>
                </div>
            ))}
        </div>
    )
}

export default Feed;