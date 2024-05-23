from flask import Blueprint, request, jsonify, current_app

api_bp = Blueprint('api', __name__)

@api_bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data['text']
    model = current_app.config['sentiment_model']
    sequence = model.get_sequences([text])[0]
    sentiment = model.predict_emotion(sequence)
    intensity = model.predict_emotion_probability(sequence)
    return jsonify({
        "text": text,
        "sentiment": sentiment,
        "intensity": intensity
    })
