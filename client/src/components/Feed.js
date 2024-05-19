import GetTweetData from "./GetTweetData"

function Tweet({user, text, date}) {
    return (
        <div id="tweet" className="my-10">
            <p className="text-[#00297A] font-bold text-sm"><b>{user}</b> <span className="text-xs font-bold text-[#00297a75]">• {date}</span> </p>
            <p className="text-lg">{text}</p>
        </div>
    );
}

function Feed() {

    const user_tweets = GetTweetData()["user_tweet_data"];
    const timeline_tweets = GetTweetData()["timeline_tweet_data"];

    const tweets = [...user_tweets, ...timeline_tweets];

    return (
        <div id="feed" className="w-[85%] md:w-[600px] h-full overflow-y-scroll overflow-x-hidden">
            {tweets.map((tweet, index) => (
                <div key={index}>
                    <Tweet user={tweet.user} text={tweet.text} date={tweet.date}/>
                </div>
            ))}
        </div>
    )
}

export default Feed;