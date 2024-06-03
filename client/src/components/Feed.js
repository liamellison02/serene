import { format, formatDistanceToNow, isThisYear, isThisWeek } from 'date-fns';

function idToNameAndUsername(data, id) {
    let users = data["user_timeline"]["includes"]["users"]
    for (let i = 0; i < users.length; i++) {
        if (users[i]["id"] === id) {
            return { name: users[i]["name"], username: ("@" + users[i]["username"]) };
        }
    }
    return { name: "John", username: "@john" };
}

function formatTweetDate(dateString) {
    const date = new Date(dateString);
    
    if (isThisWeek(date)) {
        return format(date, 'EEEE'); // 'Monday', 'Tuesday', etc.
    } else if (isThisYear(date)) {
        return format(date, 'MMMM d'); // 'June 1'
    } else {
        return format(date, 'MMMM d, yyyy'); // 'June 1, 2024'
    }
}

function Tweet({name, username, text, date}) {
    return (
        <div id="tweet" className="my-12 text-[24px]">
            <p className="text-[#00297A] font-bold "><b>{name}</b> <span className="text-[18px] text-[#00297a75]">{username} • {date}</span> </p>
            <p className="text-[#001847]">{text}</p>
        </div>
    );
}

function Feed({data}) {
    if (!data) {
        return
    }

    let tweets = data["user_timeline"]["data"]

    // console.log("usr tweets:")
    // console.log(data["user_tweets"]["includes"])

    return (
        <div id="feed" className="w-full h-full">
            {tweets.map((tweet, index) => {
                const formattedDate = formatTweetDate(tweet.created_at);
                // Username is the one with the "@"
                const { name, username } = idToNameAndUsername(data, tweet.author_id);
                return (
                    <div key={index}>
                        <Tweet name={name} username={username} text={tweet.text} date={formattedDate}/>
                    </div>
                );
            })}
        </div>
    )
}

export default Feed;