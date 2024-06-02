import Twitter from "../assets/Twitter.png";

function EmotionPreview({joyIntensity, angerIntensity, sadnessIntensity}) {

    // Joy color: #00FF00
    // Anger color: #FF4500
    // Sadness color: #4682B4

    const joy = [joyIntensity, '#00FF00', 'Joyful'], anger = [angerIntensity, '#FF4500', 'Angry'], sadness = [sadnessIntensity, '#4682B4', 'Sad']

    const emotions = [joy, anger, sadness];
    const sortedEmotions = emotions.sort((a, b) => b[0] - a[0]);
    const highestValues = sortedEmotions.slice(0, 2);
    const [primary, secondary] = highestValues;

    const gradient = {
        background: `linear-gradient(70deg, ${primary[1]} 0%, ${primary[1]} ${primary[0]}%, ${secondary[1]} ${primary[0]}%, ${secondary[1]} 140%)`
    };

    const bgGradient = {
        background: `linear-gradient(70deg, ${primary[1] + '33'} 0%, ${primary[1] + '33'} ${primary[0]}%, ${secondary[1] + '33'} ${primary[0]}%, ${secondary[1] + '33'} 140%)`
    }

    return (
        <div id="Emotions" className="h-full w-full flex flex-col justify-evenly items-center px-5" style={bgGradient}>
            <div className="w-full flex items-center justify-center ">
                <h1 className="text-[50px] font-playfair font-semibold leading-[1rem]">SERENE</h1>
                <div className="w-[50px] h-[50px] rounded-full bg-black ml-6 flex items-center justify-center">
                    <img src={Twitter} alt="twitter" className="w-[40px] h-[40px]"/>
                </div>
            </div>
            <div id="circle" className="w-[45%] pb-[45%] rounded-full" style={gradient} />
            <p className="text-center text-[34px] w-[85%]">Your timeline is mostly {primary[2].toLowerCase()}, with a bit of {secondary[2].toLowerCase()}.</p>
        </div>
    );
}

export default EmotionPreview;