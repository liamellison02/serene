function Tweet({user, text, date}) {
    return (
        <div id="tweet" className="my-12">
            <p className="text-[#00297A] text-[24px]"><b>{user}</b> <span className="text-[18px] font-bold text-[#00297a75]">• {date}</span> </p>
            <p className="text-[28px]">{text}</p>
        </div>
    );
}

function Feed({tweets}) {
    const users = tweets.includes.users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
    }, {});
    return (
        <div id="feed" className="w-full h-full">
            {tweets.map((tweet, index) => {
                const user = users[tweet.author_id];
                return (
                    <div key={index}>
                        <Tweet user={user ? user.name : 'Unknown'} text={tweet.text} date={tweet.created_at}/>
                    </div>
                );
            })}
        </div>
    )
}

export default Feed;