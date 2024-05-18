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
    tweets = [
        {"mood": "sad",
         "score": 69420,
         "id": 343434,
         "date": "2020-02-28",
         "user": "liamellisonrocks",
         "text": "man i love to code"
         }
    ]
    return jsonify(tweets), 200


@app.route('/dashboard')
@login_required
def dashboard():
    return "User Dashboard"


if __name__ == '__main__':
    app.run(debug=True)
