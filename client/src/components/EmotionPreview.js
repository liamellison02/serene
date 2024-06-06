import Twitter from "../assets/Twitter.png";
import { mix } from 'polished'

function EmotionPreview({data}) {
    
    let anger, love, sadness;

    if (data) {
        ({ anger, love, sadness } = data["timeline_sentiment_data"]["intensity_totals"]);
    } else {
        anger = 0; love = 0; sadness = 0;
    }

    // Love color: #fe43ef
    // Anger color: #FF4500
    // Sadness color: #4682B4

    let love_arr = [love, '#fe43ef', 'loving'], anger_arr = [anger, '#FF4500', 'anger'], sadness_arr = [sadness, '#4682B4', 'Sad']

    const emotions = [love_arr, anger_arr, sadness_arr];
    const sortedEmotions = emotions.sort((a, b) => b[0] - a[0]);
    const highestValues = sortedEmotions.slice(0, 2);
    const [primary, secondary] = highestValues;

    const gradient = {
        background: `linear-gradient(70deg, ${primary[1]} 0%, ${secondary[1]} 140%)`
    };

    const bgGradient = {
        background: `linear-gradient(70deg, ${primary[1] + '33'} 0%, ${secondary[1] + '33'} 140%)`
    }

    const textColor = {
        color: mix(0.6, 'black', primary[1]),
    }

    const twitterBg = {
        background: mix(0.8, 'black', primary[1]),
    }

    return (
        <div id="Emotions" className="h-full w-full flex flex-col justify-evenly items-center px-5" style={{...bgGradient, ...textColor}}>
            <div className="w-full flex items-center justify-center ">
                <h1 className="text-[64px] font-playfair font-semibold leading-[1rem]">SERENE</h1>
                <a href="/authorize/twitter" className="w-[64px] h-[64px] rounded-full ml-6 flex items-center justify-center" style={twitterBg}>
                    <img src={Twitter} alt="twitter" className="w-[52px] h-[52px]"/>
                </a>
            </div>
            <div id="circle" className="w-[45%] pb-[45%] rounded-full" style={gradient} />
            {/* CHANGE THIS LATER, IT WORKS BECAUSE HOME PASSES NULL */}
            {data ? (
                <p className="text-center text-[34px] w-[85%] font-lora">Your timeline is mostly {primary[2]}, with a bit of {secondary[2]}.</p>
            ) : (
                <p className="text-center text-[34px] w-[85%] font-lora">I can't see any tweets :o</p>
            )}
        </div>
    );
}

export default EmotionPreview;
