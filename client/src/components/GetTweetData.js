// IN FUTURE WE WILL NEED TO HANDLE NOT HAVING DATA YET

// If "has_user_data" is false then only "timeline_tweet_data" and "timeline_analysis_data" will be non-null
function GetTweetData() {
    return (
        {
            "has_user_data": false,
            // Non user tweets
            "timeline_tweet_data": [
                {
                    "mood": "joy",
                    "intensity": 0.8,
                    "user": "@TechGuru",
                    "text": "Excited about the new tech trends! 🚀 #innovation #tech",
                    "date": "2024-05-19" /* YYYY-MM-DD */
                },
                {
                    "mood": "anger",
                    "intensity": 0.4,
                    "user": "@HealthEnthusiast",
                    "text": "Just finished a fantastic workout session! Feeling energized and ready to tackle the day. Remember, staying active is key to a healthy lifestyle. 💪 #fitness #healthyliving",
                    "date": "2024-05-19", /* YYYY-MM-DD */
                },
                {
                    "mood": "sadness",
                    "intensity": 0.2,
                    "user": "@TravelWithMe",
                    "text": "Exploring the beautiful city of Kyoto today. The blend of traditional culture and modern life here is absolutely stunning. From the serene temples to the bustling markets, every corner has a story to tell. Can't wait to share more about my adventures! 📸✈️ #travel #Kyoto #adventure",
                    "date": "2024-05-19" /* YYYY-MM-DD */
                },
                {
                    "mood": "sadness",
                    "intensity": 0.2,
                    "user": "@EcoWarrior",
                    "text": "Small actions make big impacts. #GoGreen 🌍",
                    "date": "2024-05-19" /* YYYY-MM-DD */
                },
                {
                    "mood": "sadness",
                    "intensity": 0.2,
                    "user": "@BookLover",
                    "text": "Just finished reading an incredible novel that kept me on the edge of my seat from start to finish. Highly recommend it to all book enthusiasts out there! 📚 #BookRecommendations #ReadingCommunity",
                    "date": "2024-05-19" /* YYYY-MM-DD */
                },
                {
                    "mood": "sadness",
                    "intensity": 0.2,
                    "user": "@FoodieAdventures",
                    "text": "Had the most amazing culinary experience at a hidden gem in the city today. The chef's special dish was a symphony of flavors, each bite better than the last. If you're a food lover like me, this place is a must-visit. Stay tuned for my detailed review and photos! 🍽️ #Foodie #CulinaryDelights #RestaurantReview",
                    "date": "2024-05-19" /* YYYY-MM-DD */
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
                // {
                //     "mood": "joy",
                //     "intensity": 0.3,
                //     "user": "@CurrentUser",
                //     "text": "Love this weather! 🌞 #SummerVibes",
                //     "date": "2024-12-30" /* YYYY-MM-DD */
                // },
                // {
                //     "mood": "anger",
                //     "intensity": 0.4,
                //     "user": "@CurrentUser",
                //     "text": "Just finished reading an amazing book on personal growth. Highly recommend \"Atomic Habits\" by James Clear! 📚 #BookRecommendations #SelfImprovement",
                //     "date": "2024-12-30" /* YYYY-MM-DD */
                // },
                // {
                //     "mood": "sadness",
                //     "intensity": 0.2,
                //     "user": "@CurrentUser",
                //     "text": "Today marks the end of an era. After 20 years in the corporate world, I've decided to follow my passion for cooking and open my own restaurant! It's both exhilarating and terrifying, but I couldn't be more excited for this new journey. Stay tuned for more updates! 👩‍🍳🍽️ #NewBeginnings #FollowYourPassion #EntrepreneurLife",
                //     "date": "2024-12-30" /* YYYY-MM-DD */
                // }
            ],

            "user_and_analysis_data": {
                // "num_user_tweets": 10,
                // "user_weighted_anger": 22.5, //  The sum of (anger-intensity * confidence) for all user's angry tweets
                // "user_weighted_sadness": 63.5, // The sum of (sadness-intensity * confidence) for all user's sad tweets
                // "user_weighted_joy": 55.8, // The sum of (joy-intensity * confidence) for all joyful user's tweets

                // "user_most_prominent_emotion": "sadness", // user's emotion with highest weighted score

                /* 
                For future: If emotion scores are above threshold then they are also included in most prominent emotions
                ie. if 99 score on anger and 98 on sadness still tell user they are sad and angry
                */
            },
            "overall_analysis_data": {
                // "num_overall_tweets": 100,
                // "overall_weighted_anger": 63.5, //  The sum of (anger-intensity * confidence) for all  angry tweets
                // "overall_weighted_sadness": 42.5, // The sum of (sadness-intensity * confidence) for all sad tweets
                // "overall_weighted_joy": 42.5, // The sum of (joy-intensity * confidence) for all joyful tweets


                // "overall_most_prominent_emotion": "anger" // user & timeline's emotion with highest weighted score
            }
        }
    );
}

export default GetTweetData;