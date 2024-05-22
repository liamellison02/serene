import os
from flask import Flask, send_from_directory
from .api import api_bp
from .twitter_oauth import twitter_bp
# from .process import TweetSentimentAnalyzer


def create_app():
    app = Flask(__name__, static_folder='build')
    
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(twitter_bp)

    # Initialize and train the sentiment model
    # train_path = os.environ.get('TRAIN_PATH')
    # val_path = os.environ.get('VAL_PATH')
    # test_path = os.environ.get('TEST_PATH')
    # app.config['sentiment_model'] = TweetSentimentAnalyzer(train_path, val_path, test_path)
    
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app
