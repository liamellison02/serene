import os
import re
import base64
import hashlib

import requests
from requests_oauthlib import OAuth2Session
from flask import Blueprint, request, redirect, jsonify, session

twitter_bp = Blueprint('twitter', __name__)

CLIENT_ID = os.environ['CLIENT_ID']
CLIENT_KEY = os.environ['CLIENT_KEY']
REDIRECT_URI = os.environ['REDIRECT_URI']
ACCESS_TOKEN_URL = os.environ['ACCESS_TOKEN_URL']
AUTHORIZE_URL = os.environ['AUTHORIZE_URL']
USER_TIMELINE_URL = os.environ['USER_TIMELINE_URL']
USER_TWEETS_URL = os.environ['USER_TWEETS_URL']
API_USERS_ENDPOINT = os.environ['API_USERS_ENDPOINT']

code_verifier = base64.urlsafe_b64encode(os.urandom(30)).decode("utf-8")
code_verifier = re.sub("[^a-zA-Z0-9]+", "", code_verifier)

code_challenge = hashlib.sha256(code_verifier.encode("utf-8")).digest()
code_challenge = base64.urlsafe_b64encode(code_challenge).decode("utf-8")
code_challenge = code_challenge.replace("=", "")

scopes = ['tweet.read', 'users.read', 'follows.read', 'follows.write']
                       

@twitter_bp.route('/authorize/twitter')
def twitter_info():
    global twitter
    twitter = OAuth2Session(
        client_id=CLIENT_ID,
        scope=scopes,
        redirect_uri=REDIRECT_URI
    )
    auth_url, state = twitter.authorization_url(
        AUTHORIZE_URL, code_challenge=code_challenge, code_challenge_method='S256'
    )
    session["oauth_state"] = state
    
    return redirect(auth_url)


@twitter_bp.route('/callback', methods=["GET"])
def process_user():
    code = request.args.get('code')

    # for offline access, you would also need to call for a bearer token as well as an access token here
    token = twitter.fetch_token(
        token_url=ACCESS_TOKEN_URL,
        client_secret=CLIENT_KEY,
        code_verifier=code_verifier,
        code=code
    )
    user_info = requests.request(
        "GET", 
        API_USERS_ENDPOINT + 'me',
        headers={"Authorization": f'Bearer {token["access_token"]}'}
    ).json()

    user_id = user_info["data"]["id"]
    username = user_info["data"]["username"]
    
    current_authorized_usernames = ['kylekorversalt', 'ArmanD39467899', 'liamellison02']
    if username.lower() not in current_authorized_usernames:
        return jsonify(user_info)
    
    user_tweets = requests.request(
        "GET", 
        API_USERS_ENDPOINT + user_id + USER_TWEETS_URL,
        headers={"Authorization": f'Bearer {token["access_token"]}'}, 
        params={'max_results': 10}
    ).json()
    user_timeline = requests.request(
        "GET", 
        API_USERS_ENDPOINT + user_id + USER_TIMELINE_URL,
        headers={"Authorization": f'Bearer {token["access_token"]}'},
        params={'max_results': 10}
    ).json()

    return jsonify(user_id, username, user_tweets, user_timeline)

# @twitter_bp.route('/logout')
# def logout():
#     global oauth_store
#     oauth_store = {}
#     return redirect('/')
