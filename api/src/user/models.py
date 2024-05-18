from flask import jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from src import db
import uuid

X_HOST = 'https://api.twitter.com'


class User:
    def __init__(self):
        self.is_authenticated = False

    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['username'] = user
        self.is_authenticated = True
        return jsonify(user), 200

    def signup(self):
        print(request.json)

        # Create the user object
        user = {
            "name": request.json['name'],
            "username": request.json['username'],
            "password": request.json['password']
        }

        # Encrypt the password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        # Check for existing email address
        if db.users.find_one({"username": user['username']}):
            return jsonify({"error": "Username already in use"}), 400

        if db.users.insert_one(user):
            return self.start_session(user)

        return jsonify({"error": "Signup failed"}), 400

    def logout(self):
        session.clear()
        self.is_authenticated = False
        return redirect('/')

    def login(self):

        user = db.users.find_one({
            "username": request.json['username']
        })

        if user and pbkdf2_sha256.verify(request.json['password'], user['password']):
            return self.start_session(user)

        return jsonify({"error": "Invalid login credentials"}), 401

    def getTweetData(self):
        if self.is_authenticated:
            user = db.users.find_one({"username": request.json['username']})
            twitter_id = user['user_id']
            # make request to Twitter api to grab tweets
            # create a dict of dicts to store tweets ex:
            # tweet_data = {
            #     "tweets": tweets_from_twitter_api,
            # }
            # perform sent analysis on tweets
            # append analysis data to the tweet_data dict under the key "analysis"
            # store tweet dict into database
            # return jsonify(tweet_data), 200
