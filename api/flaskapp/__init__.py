import os
from flask import Flask, send_from_directory
from .api import api_bp
from .twitter_oauth import twitter_bp
from .process import TweetSentimentAnalyzer

def create_app():
    app = Flask(__name__, static_folder='client/build')
    
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(twitter_bp)
    
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app
