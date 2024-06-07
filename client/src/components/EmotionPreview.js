import Twitter from "../assets/Twitter.png";
import { mix } from 'polished'

function EmotionPreview({data}) {

    // Love color: #fe43ef
    // Anger color: #FF4500
    // Sadness color: #4682B4

    const love_info = {
        "adjective": "happy",
        "noun":"happiness",
        "hex": "#FE43EF",
        "value": undefined,
    }

    const anger_info = {
        "adjective": "angry",
        "noun": "anger",
        "hex": "#FF4500",
        "value": undefined,
    }

    const sadness_info = {
        "adjective": "sad",
        "noun": "sadness",
        "hex": "#4682B4",
        "value": undefined
    }

    let primary = {
        "adjective": undefined,
        "noun": undefined,
        "hex": "#D7D7D7",
        "value": undefined,
    }
    let secondary = {
        "adjective": undefined,
        "noun": undefined,
        "hex": "#5E5E5E",
        "value": undefined,
    }
        
    if (data) {
        let love = 0, anger = 0, sadness = 0;
        ({ love, anger, sadness } = data["timeline_sentiment_data"]["intensity_totals"]);
        if (!love) { love = 0 }
        if (!anger) { anger = 0 }
        if (!sadness) {sadness = 0}
        love_info.value = love
        anger_info.value = anger
        sadness_info.value = sadness

        const emotions = [love_info, anger_info, sadness_info];
        const sortedEmotions = emotions.sort((a, b) => b.value - a.value);
        [primary, secondary] = sortedEmotions.slice(0, 2);
    }

    const gradient = {
        background: `linear-gradient(70deg, ${primary.hex} 0%, ${secondary.hex} 140%)`
    };

    const bgGradient = {
        background: `linear-gradient(70deg, ${primary.hex + '33'} 0%, ${secondary.hex + '33'} 140%)`
    }

    const textColor = {
        color: mix(0.6, 'black', primary.hex),
    }

    const twitterBg = {
        background: mix(0.8, 'black', primary.hex),
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
                <p className="text-center text-[34px] w-[85%] font-lora">Your timeline is mostly {primary.adjective}, with a bit of {secondary.noun}.</p>
            ) : (
                <p className="text-center text-[34px] w-[85%] font-lora">Loading tweets...</p>
            )}
        </div>
    );
}

export default EmotionPreview;
