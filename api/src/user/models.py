from flask import jsonify, request, session, redirect, url_for
from passlib.hash import pbkdf2_sha256
from src import db
from src.analysis import process_class
import uuid
import oauth2 as oauth
import urllib.parse
import urllib.request
import urllib.error
import json
import pandas as pd
request_token_url = 'https://api.twitter.com/oauth/request_token'
access_token_url = 'https://api.twitter.com/oauth/access_token'
authorize_url = 'https://api.twitter.com/oauth/authorize'
show_user_url = 'https://api.twitter.com/1.1/users/show.json'
authorize_endpoint = 'tweet.read%20users.read%20follows.read%20offline.access'

oauth_creds = {}


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

    def login_with_twitter(self):

        user = db.users.find_one({
            "username": request.json['username']
        })

        if user and pbkdf2_sha256.verify(request.json['password'], user['password']):
            return self.start_session(user)

        return jsonify({"error": "Invalid login credentials"}), 401

    def get_column_data(self,csv_file_path, column_name):
        df = pd.read_excel(csv_file_path)
        df = df.to_csv('output.csv', index=False)
        return df[column_name].tolist()

    def getTweetData(self):
        if self.is_authenticated:
            sent_analysis_obj = process_class.TweetSentimentAnalyzer("dataset/train.txt", "dataset/val.txt","dataset/test.txt")
            user = db.users.find_one({"username": request.json['username']})
            twitter_id = user['user_id']
            id_data = self.get_column_data('Datafield.xlsx','B')
            date_data = self.get_column_data('Datafield.xlsx', 'C')
            user_data = self.get_column_data('Datafield.xlsx', 'E')
            text_data = self.get_column_data('Datafield.xlsx', 'F')
            user_tweets_from_api = [
                 {
                     "id": id_data,
                     "date": date_data,
                     "user": user_data,
                     "text": text_data
                 }
             ]
            timeline_tweets_from_api = [
                 {
                     "id": id_data,
                     "date": date_data,
                     "user": user_data,
                     "text": text_data
                  }
             ]
            overall_results_dict, pertweet_sentiment_result = sent_analysis_obj.main(user_tweets_from_api,timeline_tweets_from_api)
            #perform sent analysis on tweets
            overall_results = overall_results_dict
            predicted_sentiment_pertweet = pertweet_sentiment_result
            user_analysis_data = (overall_results, predicted_sentiment_pertweet)

            # store tweet dict into database
            return jsonify(user_analysis_data), 200
