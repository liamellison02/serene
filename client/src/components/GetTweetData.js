// IN FUTURE WE WILL NEED TO HANDLE NOT HAVING DATA YET

// If "has_user_data" is false then only "timeline_tweet_data" and "timeline_analysis_data" will be non-null
function GetTweetData() {
    return (
        {
            "has_user_data": true,
            // Non user tweets
            "timeline_tweet_data": [
                {
                    "mood": "joy",
                    "intensity": 0.3,
                    "user": "@SummoningSalt",
                    "text": "1 million views in 40 hours! Not bad for a 2 hour long video. Thanks so much everyone - super positive feedback on this one. More Tetris content in the future for sure.",
                    "date": "2024-12-30" /* YYYY-MM-DD */
                },
                {
                    "mood": "anger",
                    "intensity": 0.4,
                    "user": "@YikeLOL",
                    "text": "That really hurts",
                    "date": "2024-12-30" /* YYYY-MM-DD */
                },
                {
                    "mood": "sadness",
                    "intensity": 0.2,
                    "user": "User3",
                    "text": "Split 2 ADC SoloQ TierlistChamps with high AD scalings that don't need Attackspeed do really well right now - Cait Jhin Aphelios Draven BLACKFIRE TORCH is absolutely broken hence Karthus and Brand",
                    "date": "2024-12-30" /* YYYY-MM-DD */
                },
                {
                    "mood": "joy",
                    "intensity": 0.8,
                    "user": "@HappyCamper",
                    "text": "Just got promoted! Feeling on top of the world!",
                    "date": "2024-05-19"
                },
                {
                    "mood": "fear",
                    "intensity": 0.5,
                    "user": "@ScaredyCat",
                    "text": "I'm not sure if I can handle this exam tomorrow.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "anger",
                    "intensity": 0.7,
                    "user": "@Frustrated123",
                    "text": "Why do people keep canceling plans at the last minute?",
                    "date": "2024-05-19"
                },
                {
                    "mood": "sadness",
                    "intensity": 0.6,
                    "user": "@BlueMonday",
                    "text": "I miss the good old days when everything was simple.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "joy",
                    "intensity": 0.9,
                    "user": "@Excited4Life",
                    "text": "Can't wait for the weekend trip with friends!",
                    "date": "2024-05-19"
                },
                {
                    "mood": "anger",
                    "intensity": 0.4,
                    "user": "@AngryBird",
                    "text": "Traffic is the worst! Stuck for hours.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "fear",
                    "intensity": 0.3,
                    "user": "@NervousNellie",
                    "text": "What if my presentation doesn't go well?",
                    "date": "2024-05-19"
                },
                {
                    "mood": "joy",
                    "intensity": 0.7,
                    "user": "@JoyfulJane",
                    "text": "Got a surprise gift from a friend today!",
                    "date": "2024-05-19"
                },
                {
                    "mood": "sadness",
                    "intensity": 0.5,
                    "user": "@LonelyHeart",
                    "text": "Feeling lonely tonight.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "anger",
                    "intensity": 0.6,
                    "user": "@MadMax",
                    "text": "Why do people lie? It's so frustrating.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "joy",
                    "intensity": 0.9,
                    "user": "@HappyFeet",
                    "text": "Dancing the night away!",
                    "date": "2024-05-19"
                },
                {
                    "mood": "fear",
                    "intensity": 0.7,
                    "user": "@AnxiousAmy",
                    "text": "Worried about the future and what it holds.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "sadness",
                    "intensity": 0.8,
                    "user": "@TearfulTom",
                    "text": "Lost a dear friend today.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "joy",
                    "intensity": 0.6,
                    "user": "@SmilingSam",
                    "text": "Had a wonderful day at the park.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "anger",
                    "intensity": 0.5,
                    "user": "@RagingBull",
                    "text": "Can't believe I was overcharged at the store.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "fear",
                    "intensity": 0.4,
                    "user": "@WorriedWill",
                    "text": "I hope my family stays safe during this storm.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "joy",
                    "intensity": 0.8,
                    "user": "@BlissfulBeth",
                    "text": "Just finished a great book!",
                    "date": "2024-05-19"
                },
                {
                    "mood": "sadness",
                    "intensity": 0.6,
                    "user": "@MelancholyMia",
                    "text": "Feeling nostalgic and missing old friends.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "anger",
                    "intensity": 0.4,
                    "user": "@IrateIvan",
                    "text": "The internet is down again. So frustrating!",
                    "date": "2024-05-19"
                },
                {
                    "mood": "fear",
                    "intensity": 0.5,
                    "user": "@PanickedPete",
                    "text": "I have a big interview tomorrow. So nervous!",
                    "date": "2024-05-19"
                },
                {
                    "mood": "joy",
                    "intensity": 0.9,
                    "user": "@EuphoricEve",
                    "text": "Best day ever with my loved ones!",
                    "date": "2024-05-19"
                },
                {
                    "mood": "sadness",
                    "intensity": 0.7,
                    "user": "@GloomyGus",
                    "text": "Feeling down and out.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "anger",
                    "intensity": 0.6,
                    "user": "@FumingFred",
                    "text": "Why are people so inconsiderate?",
                    "date": "2024-05-19"
                },
                {
                    "mood": "fear",
                    "intensity": 0.3,
                    "user": "@TimidTina",
                    "text": "Scared of what tomorrow might bring.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "joy",
                    "intensity": 0.8,
                    "user": "@DelightedDan",
                    "text": "Got tickets to my favorite band!",
                    "date": "2024-05-19"
                },
                {
                    "mood": "sadness",
                    "intensity": 0.5,
                    "user": "@WeepyWillow",
                    "text": "Missing someone special today.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "anger",
                    "intensity": 0.7,
                    "user": "@AnnoyedAnn",
                    "text": "Why can't people clean up after themselves?",
                    "date": "2024-05-19"
                },
                {
                    "mood": "fear",
                    "intensity": 0.6,
                    "user": "@AfraidAl",
                    "text": "Worried about my health.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "joy",
                    "intensity": 0.9,
                    "user": "@EcstaticElla",
                    "text": "Graduation day! So excited!",
                    "date": "2024-05-19"
                },
                {
                    "mood": "sadness",
                    "intensity": 0.6,
                    "user": "@DowncastDave",
                    "text": "It's hard to let go of the past.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "anger",
                    "intensity": 0.5,
                    "user": "@FuriousFay",
                    "text": "Why is customer service so unhelpful?",
                    "date": "2024-05-19"
                },
                {
                    "mood": "fear",
                    "intensity": 0.4,
                    "user": "@TerrifiedTerry",
                    "text": "I'm not ready for this big change.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "joy",
                    "intensity": 0.7,
                    "user": "@CheerfulChris",
                    "text": "Had an amazing dinner with friends.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "sadness",
                    "intensity": 0.5,
                    "user": "@SorrowfulSue",
                    "text": "Today is just one of those days.",
                    "date": "2024-05-19"
                },
                {
                    "mood": "anger",
                    "intensity": 0.6,
                    "user": "@RantingRalph",
                    "text": "Can't stand the noise in my neighborhood.",
                    "date": "2024-05-19"
                },
            ],
            "timeline_analysis_data": {
                "num_timeline_tweets": 200,

                "timeline_weighted_anger": 43.5, //  The sum of (anger-intensity * confidence) for all timeline's angry tweets
                "timeline_weighted_sadness": 42.5, // The sum of (sadness-intensity * confidence) for all timeline's sad tweets
                "timeline_weighted_joy": 86.2, // The sum of (joy-intensity * confidence) for all joyful timeline's tweets

                "timeline_most_prominent_emotion": "joy", // timeline's emotion with highest weighted score
            },

            "user_tweet_data": [
                {
                    "mood": "joy",
                    "intensity": 0.3,
                    "user": "@CurrentUser",
                    "text": "Love this weather! 🌞 #SummerVibes",
                    "date": "2024-12-30" /* YYYY-MM-DD */
                },
                {
                    "mood": "anger",
                    "intensity": 0.4,
                    "user": "@CurrentUser",
                    "text": "Just finished reading an amazing book on personal growth. Highly recommend \"Atomic Habits\" by James Clear! 📚 #BookRecommendations #SelfImprovement",
                    "date": "2024-12-30" /* YYYY-MM-DD */
                },
                {
                    "mood": "sadness",
                    "intensity": 0.2,
                    "user": "@CurrentUser",
                    "text": "Today marks the end of an era. After 20 years in the corporate world, I've decided to follow my passion for cooking and open my own restaurant! It's both exhilarating and terrifying, but I couldn't be more excited for this new journey. Stay tuned for more updates! 👩‍🍳🍽️ #NewBeginnings #FollowYourPassion #EntrepreneurLife",
                    "date": "2024-12-30" /* YYYY-MM-DD */
                }
            ],

            "user_and_analysis_data": {
                "num_user_tweets": 10,
                "user_weighted_anger": 22.5, //  The sum of (anger-intensity * confidence) for all user's angry tweets
                "user_weighted_sadness": 63.5, // The sum of (sadness-intensity * confidence) for all user's sad tweets
                "user_weighted_joy": 55.8, // The sum of (joy-intensity * confidence) for all joyful user's tweets

                "user_most_prominent_emotion": "sadness", // user's emotion with highest weighted score

                /* 
                For future: If emotion scores are above threshold then they are also included in most prominent emotions
                ie. if 99 score on anger and 98 on sadness still tell user they are sad and angry
                */
            },
            "overall_analysis_data": {
                "num_overall_tweets": 100,
                "overall_weighted_anger": 63.5, //  The sum of (anger-intensity * confidence) for all  angry tweets
                "overall_weighted_sadness": 42.5, // The sum of (sadness-intensity * confidence) for all sad tweets
                "overall_weighted_joy": 42.5, // The sum of (joy-intensity * confidence) for all joyful tweets


                "overall_most_prominent_emotion": "anger" // user & timeline's emotion with highest weighted score
            }
        }
    );
}

export default GetTweetData;