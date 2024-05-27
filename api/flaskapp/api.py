from flask import Blueprint, request, jsonify, current_app

api_bp = Blueprint('api', __name__)

@api_bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data['text']
    id = data['id']
    model = current_app.config['sentiment_model']
    tweets = []
    sequence = model.get_sequences([text])
    for i in range(len(sequence)):
        sentiment = (model.predict_emotion(sequence[i]))
        intensity = (model.predict_emotion_probability(sequence[i])) * model.get_sentiment_score(text[i])
        tweet = {'ID': id[i], 'text': text[i], 'sentiment': sentiment, 'intensity': intensity}
        tweets.extend(tweet)

    return jsonify(tweets)
