function EmotionPreview() {

    // Joy color: #00FF00
    // Anger color: #FF4500
    // Sadness color: #4682B4

    const joy = [78, '#00FF00', 'Joyful'], anger = [43, '#FF4500', 'Angry'], sadness = [14, '#4682B4', 'Sad']

    const emotions = [joy, anger, sadness];
    const sortedEmotions = emotions.sort((a, b) => b[0] - a[0]);
    const highestValues = sortedEmotions.slice(0, 2);
    const [primary, secondary] = highestValues;

    const gradient = {
        background: `linear-gradient(70deg, ${primary[1]} 0%, ${secondary[1]} 140%)`
    };

    return (
        <div id="Emotions" className="h-[120px] md:h-full w-full md:w-[15%] flex-grow py-[12%] pl-8">
            <a href="/dashboard" className="w-full h-full flex flex-col items-center bg-slate-200 p-8 rounded-lg">
                <div id="circle" className="w-[50%] pb-[50%] rounded-full" style={gradient} />
                <p className="text-[24px] mt-4">Overall: <b>{primary[2]}</b></p>
                <p className="text-[24px]">Joy: <b>{joy[0]}</b></p>
                <p className="text-[24px]">Anger: <b>{anger[0]}</b></p>
                <p className="text-[24px]">Sadness: <b>{sadness[0]}</b></p>
            </a>
        </div>
    );
}

export default EmotionPreview;