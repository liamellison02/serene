import { useSelector } from 'react-redux'
import BarGraphUser from './Charts/BarGraphUser'
import BarGraphTimeline from './Charts/BarGraphTimeline'

function Stats() {

    const TweetData = useSelector(state => state.tweetData)

    const timeline_analysis = TweetData.data.timeline_sentiment_data.intensity_totals
    const user_tweet_analysis = TweetData.data.user_sentiment_data.intensity_totals
    const timeline_emotion = TweetData.data.timeline_sentiment_data.overall_sentiment
    const user_tweet_emotion = TweetData.data.user_sentiment_data.overall_sentiment

    console.log(TweetData.data.timeline_sentiment_data)
    console.log(TweetData.data.user_sentiment_data)

    return (
        <div className="w-full h-full flex flex-col items-center justify-center" >
            <div className="w-full flex justify-evenly">
                <div className="bg-slate-200 rounded-2xl m-2 p-6">
                    Overall timeline emotion: <span className="text-xl font-bold">{timeline_emotion}</span>
                </div>
                <div className="bg-slate-200 rounded-2xl m-2 p-6">
                    Overall tweet emotion: <span className="text-xl font-bold">{user_tweet_emotion}</span>
                </div>
            </div>
            <div className="w-full flex justify-evenly">
                <div className="bg-slate-200 rounded-xl m-4 p-10">
                    <h3>Timeline analysis:</h3>
                    {Object.entries(timeline_analysis).map(([key, value]) => (
                        <p key={key}>{key}: {value.toFixed(1)}</p>
                    ))}
                </div>
                <div className="bg-slate-200 rounded-xl m-4 p-10">
                    <h3>User tweet analysis:</h3>
                    {Object.entries(user_tweet_analysis).map(([key, value]) => (
                        <p key={key}>{key}: {value.toFixed(1)}</p>
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-evenly">
                    <BarGraphUser />
                    <BarGraphTimeline />
                </div>
        </div>
    )
}

export default Stats