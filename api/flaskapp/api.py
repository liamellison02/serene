import os
from flask import Blueprint, request, jsonify, current_app

from .db import get_worker
db = get_worker(os.environ['DB_URI'])

api_bp = Blueprint('api', __name__)

@api_bp.route('/analyze', methods=['GET'])
def analyze():
    """
    Grabs the tweets of the user_id param & runs sentiment analysis on them.
    Returning a JSON response with the keys:
     - user_sentiment_data
     - timeline_sentiment_data
     - user_tweets
     - user_timeline

     Sample return object:
     {
        "timeline_sentiment_data": {
            "intensity_totals": {"positive": 0.25, "negative": 0.1, "netural": 0.65 },
            "overall_sentiment": "neutral"
        },
        "user_sentiment_data": {
            "intensity_totals": { "positive": 0.25, "negative": 0.1, "netural": 0.65 },
            "overall_sentiment": "love"
        },
        "user_timeline": {
            "data": [
                {   "author_id": "321648310", "created_at": "2024-06-13T20:38:58.000Z", "edit_history_tweet_ids": [ "1801353592932028538" ], "id": "1801353592932028538", 
                    "intensity": 0.4656293483376503,
                    "sentiment": "sadness",
                    "text": "LMBOOOOOOOOOOOOOOOOOOOO “how is it you guys are actually worse at your jobs?”"
                },
                {   "author_id": "1324458539214020609", "created_at": "2024-06-13T20:36:08.000Z", "edit_history_tweet_ids": [ "1801352878726254930" ], "id": "1801352878726254930", 
                    "intensity": 0.0,
                    "sentiment": "sadness",
                    "text": ".@Bonesllb grabs himself the ACE and brings @FLUFFYAIMERS their 6th round in a row!\n\n#ChallengersNA\nhttps://t.co/ZKy7L4BXP5 https://t.co/YFgTH81QLC"
                },
            ],
            "includes": {
                "users": [
                    { "id": "321648310", "name": "Nekias (Nuh-KY-us) Duncan", "username": "NekiasNBA" },
                    { "id": "1324458539214020609", "name": "VALORANT Esports NA", "username": "valesports_na" },
                ]
            },
            "meta": { "newest_id": "1801353592932028538", "next_token": "7140dibdnow9c7btw4azv9p9dh2d38h1qbn2xua3adut1", "oldest_id": "1801346340485468535", "result_count": 20 }
        },
        "user_tweets": {
            "data": [
                { "author_id": "1283316378871762947", "created_at": "2024-06-10T00:36:17.000Z", "edit_history_tweet_ids": [ "1799963765112279468" ], "id": "1799963765112279468",
                    "intensity": 0.0,
                    "sentiment": "joy",
                    "text": "@willis_glen @eledlouis I just don’t even understand how this is a conversation that’s being had right now"
                },
                { "author_id": "1283316378871762947", "created_at": "2024-06-08T14:28:02.000Z", "edit_history_tweet_ids": [ "1799448302129176578" ], "id": "1799448302129176578",
                    "intensity": 0.0,
                    "sentiment": "love",
                    "text": "@BraveHawk404 @JonesinATL This and the fact that Ant actually reps ATL and the state of GA whereas JB does not. Not even to mention the fact that Ant went to UGA and JB went all the way to Cali for college"
                },
            ],
            "includes": {
                "users": [ {"id": "1283316378871762947", "name": "the real kyle korver", "username": "kylekorversalt" } ]
            },
            "meta": { "newest_id": "1799963765112279468", "next_token": "7140dibdnow9c7btw483gsyoax64zj8q39jhowrqqerzo","oldest_id": "1784608383900770474", "result_count": 10 }
        }
     }
    """

    user_id = request.args.get('user_id')
    data = db.user_tweet_data.find_one({"user_id": user_id})
    user_tweets = data['user_tweets']
    user_timeline = data['user_timeline']
    NLP_model = current_app.config['NLP_model']
    
    user_tweets_text = [tweet['text'] for tweet in user_tweets['data']]
    num_positive = 0; num_neutral = 0; num_negative = 0; num_irrelevant = 0;
    for i in range(len(user_tweets['data'])):
        tweet = user_tweets_text[i]
        sentiment = NLP_model.predict(tweet)
        intensity = NLP_model.predict_confidence(tweet)
        user_tweets['data'][i]['sentiment'] = sentiment
        user_tweets['data'][i]['intensity'] = intensity
        if  (sentiment == 'Positive'):
            num_positive+=1
        elif (sentiment == 'Negative'):
            num_negative+=1
        elif (sentiment == 'Neutral'):
            num_neutral+=1
        elif (sentiment == 'Irrelevant'):
            num_irrelevant+=1

    total_tweets = num_positive + num_neutral + num_negative + num_irrelevant
    user_intensity_totals = { 
        'Positive': num_positive/total_tweets, 
        'Neutral': num_neutral/total_tweets, 
        'Negative': num_negative/total_tweets ,
        'NA': num_irrelevant/total_tweets
    }

    user_sent_data = {
        'intensity_totals': user_intensity_totals,
        'overall_sentiment': max(user_intensity_totals, key=user_intensity_totals.get)
    }
    
    timeline_tweets_text = [tweet['text'] for tweet in user_timeline['data']]
    num_positive = 0; num_neutral = 0; num_negative = 0; num_irrelevant = 0;
    for i in range(len(user_timeline['data'])):
        tweet = timeline_tweets_text[i]
        sentiment = NLP_model.predict(tweet)
        intensity = NLP_model.predict_confidence(tweet)
        user_timeline['data'][i]['sentiment'] = sentiment
        user_timeline['data'][i]['intensity'] = intensity
        if  (sentiment == 'Positive'):
            num_positive+=1
        elif (sentiment == 'Negative'):
            num_negative+=1
        elif (sentiment == 'Neutral'):
            num_neutral+=1
        elif (sentiment == 'Irrelevant'):
            num_irrelevant+=1

    total_tweets = num_positive + num_neutral + num_negative + num_irrelevant
    tl_intensity_totals = { 
        'Positive': num_positive/total_tweets, 
        'Neutral': num_neutral/total_tweets, 
        'Negative': num_negative/total_tweets,
        'NA': num_irrelevant/total_tweets
    }

    tl_sent_data = {
        'intensity_totals': tl_intensity_totals,
        'overall_sentiment': max(tl_intensity_totals, key=tl_intensity_totals.get)
    }
    
    analysis_dict = {
        "user_tweets": user_tweets,
        "user_sentiment_data": user_sent_data,
        "user_timeline": user_timeline,
        "timeline_sentiment_data": tl_sent_data
    }
    db.user_twitter_data.insert_one(
        {   
            "user_id": user_id,
            "analysis": analysis_dict
        }
    )
    
    return jsonify(analysis_dict)
