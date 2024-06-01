from flask import Blueprint, request, jsonify, current_app
from flaskapp import db

api_bp = Blueprint('api', __name__)

@api_bp.route('/analyze', methods=['GET'])
def analyze():
    user_id = request.args.get('user_id')
    data = db.users.find_one({"user_id": user_id})
    # model = current_app.config['sentiment_model']
    # sequence = model.get_sequences([text])[0]
    # sentiment = model.predict_emotion(sequence)
    # intensity = model.predict_emotion_probability(sequence)
    user_tweets = data['user_tweets']
    user_timeline = data['user_timeline']
    sentiment_data = {'overall_sentiment': 'joy'}
    return jsonify({
        "user_tweets": user_tweets,
        "timeline_tweets": user_timeline,
        "sentiment_data": sentiment_data
    })
