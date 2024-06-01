from flask import Blueprint, request, jsonify, current_app
from flaskapp import db

api_bp = Blueprint('api', __name__)

@api_bp.route('/analyze', methods=['GET'])
def analyze():
    user_id = request.args.get('user_id')
    data = db.users.find_one({"user_id": user_id})
    user_tweets = data['user_tweets']
    user_timeline = data['user_timeline']
    model = current_app.config['sentiment_model']
    
    user_text = [tweet['text'] for tweet in user_tweets]
    user_sequences = model.get_sequences(user_text)
    for i in range(len(user_tweets)):
        sequence = user_sequences[i]
        sentiment = model.predict_emotion(sequence)
        intensity = model.predict_emotion_probability(sequence) * model.get_sentiment_score(user_text[i])
        user_tweets[i]['sentiment'] = sentiment
        user_tweets[i]['intensity'] = intensity
    
    timeline_text = [tweet['text'] for tweet in user_timeline]
    timeline_sequences = model.get_sequences(timeline_text)
    for i in range(len(user_timeline)):
        sequence = timeline_sequences[i]
        sentiment = model.predict_emotion(sequence)
        intensity = model.predict_emotion_probability(sequence) * model.get_sentiment_score(timeline_text[i])
        user_timeline[i]['sentiment'] = sentiment
        user_timeline[i]['intensity'] = intensity
    
    return jsonify({
        "user_tweets": user_tweets,
        "user_timeline": user_timeline
    })
