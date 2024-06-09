import os
from flask import Blueprint, request, jsonify, current_app, abort
from .db import get_worker

db = get_worker(os.environ['DB_URI'])
api_bp = Blueprint('api', __name__)


def calculate_total_intensity(tweets):
    total_intensity = {}
    for tweet in tweets:
        sentiment = tweet['sentiment']
        intensity = tweet['intensity']
        total_intensity[sentiment] = total_intensity.get(sentiment, 0) + intensity
    return total_intensity

@api_bp.route('/analyze', methods=['GET'])
def analyze():
    secret_token = os.environ.get('Model_key')
    request_token = request.headers.get('Authorization')

    if not request_token or request_token != f'Bearer {secret_token}':
        abort(403)

    user_id = request.args.get('user_id')
    data = db.user_tweet_data.find_one({"user_id": user_id})
    if not data:
        abort(404)

    user_id = request.args.get('user_id')
    data = db.user_tweet_data.find_one({"user_id": user_id})
    user_tweets = data['user_tweets']
    user_timeline = data['user_timeline']
    model = current_app.config['sentiment_model']
    
    user_text = [tweet['text'] for tweet in user_tweets['data']]
    user_sequences = model.get_sequences(user_text)
    for i in range(len(user_tweets['data'])):
        sequence = user_sequences[i]
        sentiment = model.predict_emotion(sequence)
        intensity = model.predict_emotion_probability(sequence) * model.get_sentiment_score(user_text[i])
        user_tweets['data'][i]['sentiment'] = sentiment
        user_tweets['data'][i]['intensity'] = intensity
    user_intensity_totals = calculate_total_intensity(user_tweets['data'])
    user_sent_data = {
        'intensity_totals': user_intensity_totals,
        'overall_sentiment': max(user_intensity_totals, key=user_intensity_totals.get)
    }
    
    timeline_text = [tweet['text'] for tweet in user_timeline['data']]
    timeline_sequences = model.get_sequences(timeline_text)
    for i in range(len(user_timeline['data'])):
        sequence = timeline_sequences[i]
        sentiment = model.predict_emotion(sequence)
        intensity = model.predict_emotion_probability(sequence) * abs(model.get_sentiment_score(timeline_text[i]))
        user_timeline['data'][i]['sentiment'] = sentiment
        user_timeline['data'][i]['intensity'] = intensity
    tl_intensity_totals = calculate_total_intensity(user_timeline['data'])
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
