import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Chart1, Chart2, BarGraph, CurveGraph, PieGraph } from "../components/Charts"

function Dashboard() {
    const { userId } = useParams();
    const [results, setResults] = useState(null);
    const [user, setUser] = useState(null);
    const [userTweets, setUserTweets] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Fetch the results from the backend
        const params = new URLSearchParams(location.search);
        userId = params.get('user_id');
        fetch(`/api/analye/?user_id=${userId}`)
          .then(response => response.json())
          .then(data => {
            setResults(data.analysis_results);
            setUserTweets(data.analysis_results["user_tweet_data"]);
            setTimeline(data.analysis_results["timeline_tweet_data"]);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, [userId]);

    return (
        <div className="w-full h-full pt-[60px] flex justify-evenly items-center flex-wrap">
            <div className="w-[300px] h-[300px]"><CurveGraph/></div>
            <div className="w-[300px] h-[300px]"><Chart1/></div>
            <div className="w-[300px] h-[300px]"><BarGraph/></div>
            <div className="w-[300px] h-[300px]"><Chart2/></div>
            <div className="w-[300px] h-[300px]"><PieGraph/></div>
        </div>
    );
}

export default Dashboard