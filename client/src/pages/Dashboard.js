import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import EmotionPreview from "../components/EmotionPreview";
import Feed from "../components/Feed";
// import { Chart1, Chart2, BarGraph, CurveGraph, PieGraph } from "../components/Charts";

function Dashboard() {
    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [userTweets, setUserTweets] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const [timelineResults, setTimelineResults] = useState(null);
    const [userResults, setUserResults] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Fetch the results from the backend
        let params = new URLSearchParams(location.search);
        userId = params.get('user_id');
        fetch(`http://127.0.0.1:5000/api/analyze?user_id=${userId}`)
          .then(response => response.json())
          .then(data => {
            setUserTweets(data.user_tweet_data);
            setUserResults(data.user_sentiment_data);
            setTimeline(data.user_timeline);
            setTimelineResults(data.timeline_sentiment_data);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);
    

    return (
      <div id="HomePage" className="w-full h-full flex flex-col md:flex-row justify-between items-center">
        <div className="pl-[60px] w-[45%] h-full">
          {timeline && timeline.data ? <Feed tweets={timeline.data} /> : <p>Loading...</p>}
        </div>
        <div className="w-[35%] h-full fixed right-0 top-0">
          { timelineResults && timelineResults.intensity_results ?
            <EmotionPreview 
            joyIntensity={timelineResults.intensity_results.joy} 
            angerIntensity={timelineResults.intensity_results.anger} 
            sadnessIntensity={timelineResults.intensity_results.sadness} 
            /> : <p>Loading...</p>
          }
        </div>
      </div>
    );
}

export default Dashboard