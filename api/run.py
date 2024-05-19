from src import app, login_required
from src.user.routes import *
from typing import TypedDict
from flask import jsonify, request


@app.route('/')
def home():
    return "Home Page"


@app.route('/example')
def example():
    # tweets = User.getTweetData()
    #
    #
    data = {
        "user_tweet_data": [
            {
                "mood": "sad",
                "intensity_level": 0.1,
                "id": 343434,
                "date": "2020-02-28",
                "user": "liamellisonrocks",
                "content": "man i love to code"
            }
        ]
    }
    return jsonify(data), 200


@app.route('/dashboard')
# @login_required
def dashboard():
    return "User Dashboard"


@app.route('/twitter')
def show_token():
    args = request.args
    return jsonify(args), 200


if __name__ == '__main__':
    app.run(debug=True)
