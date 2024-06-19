import { mix } from 'polished'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

function EmotionPreview() {

    const tweetData = useSelector(state => state.tweetData)
    let data = tweetData.data

    // Love color: #fe43ef
    // Anger color: #FF4500
    // Sadness color: #4682B4

    const positive_info = {
        "adjective": "positive",
        "noun":"positivity",
        "hex": "#FE43EF",
        "value": undefined,
    }

    const neutral_info = {
        "adjective": "neutral",
        "noun": "neutrality",
        "hex": "#a0ebab",
        "value": undefined,
    }

    const negative_info = {
        "adjective": "negtaive",
        "noun": "negativity",
        "hex": "#4682B4",
        "value": undefined
    }

    const na_info = {
        "adjective": "miscellaneous",
        "noun": "miscellaneous tweets"
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
    
    let Positive = 0, Neutral = 0, Negative = 0, NA = 0;
    ({ Positive, Neutral, Negative, NA } = data["timeline_sentiment_data"]["intensity_totals"]);
    if (Positive || Neutral || Negative || NA) {
        positive_info.value = Positive
        neutral_info.value = Neutral
        negative_info.value = Negative
        na_info.value = NA

        const emotions = [positive_info, neutral_info, negative_info, na_info];
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

    const [message, setMessage] = useState("Loading tweets...")

    useEffect(() => {
        if (data && (Positive || Neutral || Negative || NA)) {
            setMessage(`Your timeline is mostly ${primary.adjective}, with a bit of ${secondary.noun}`)
        } else {
            setMessage("The backend returned data but we were not able to process it 🤒")
        }
    }, [data, Positive, Neutral, Negative, NA, primary.adjective, secondary.noun])

    return (
        <div id="Emotions" className="h-full w-full flex flex-col justify-evenly items-center px-5" style={{...bgGradient, ...textColor}}>
            <div className="w-full flex items-center justify-center ">
                <h1 className="text-[64px] font-semibold leading-[1rem]">SERENE</h1>
            </div>
            <div id="circle" className="w-[45%] pb-[45%] rounded-full font-sans" style={gradient} />
            <p className="text-center text-[34px] w-[85%]">{message}</p>
        </div>
    );
}

export default EmotionPreview;
