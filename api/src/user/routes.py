from src import app, db
from src.user.models import User
from flask import jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
import uuid
from requests_oauthlib import OAuth2Session
import urllib.parse
import urllib.request
import urllib.error
import json
import requests


oauth2_authorize = 'https://twitter.com/i/oauth2/authorize'
redirect_uri = 'http://127.0.0.1:5000/twitter'  # https://sereneapp.co/callback
scope = 'tweet.read%20users.read'
client_id = 'Ujd2YUZaUnlNMzZmbDFyUlJvcTM6MTpjaQ'
client_key = 'kgFUe3wLqewq4NsReX7qkkJU7NN4Y0bZml09fMhDyHr8LzeFF8'
access_token_url = 'https://api.twitter.com/2/oauth2/token'


@app.route('/logout')
def logout():
    return User().logout()


@app.route('/authorize/twitter')
def login_with_twitter():

    # state = ""
    # state_unique = False
    # while not state_unique:

    # if db.authorized_sessions.find_one({"state": state}) is None:
    #     state_unique = True
    # db.authorized_sessions.insert_one({'state': state, 'challenge': challenge})  # might need more info
    # import base64
    #
    # encoded_client_auth = base64.b64encode(f'{client_id}:{client_key}'.encode('utf-8')).decode('utf-8')
    # auth = f'Basic {encoded_client_auth}'
    # oauth = OAuth2Session(auth=auth,
    #                       redirect_uri=redirect_uri, scope=scope, challenge=challenge, code_challenge_method='plain')
    challenge = 'sdwwsdw'
    # state = str(uuid.uuid4())
    # session['state'] = state
    query = {
        'response_type': 'code',
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'scope': scope,
        'state': session['state'],
        'code_challenge': challenge,
        'code_challenge_method': 'plain',
    }

    print(challenge)
    return redirect(f"{oauth2_authorize}?{urllib.parse.urlencode(query)}")

    # return jsonify("oauth")


@app.route('/callback')
def process_user():
    # get twitter api data
    args = request.args
    state = args['state']


@app.route('/twitter')
def twitter_data():
    args = request.args
    return jsonify(args)
