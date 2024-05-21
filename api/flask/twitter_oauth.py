import os
import oauth2 as oauth
import urllib.request
import urllib.parse
import urllib.error
from flask import Blueprint, render_template, request, redirect, send_from_directory, jsonify

twitter_bp = Blueprint('twitter', __name__)

REDIRECT_URI='http://127.0.0.1:5000/callback'
CONSUMER_KEY = os.environ['CONSUMER_KEY']
CONSUMER_SECRET = os.environ['CONSUMER_SECRET']
REDIRECT_URI = os.environ['REDIRECT_URI']
REQUEST_TOKEN_URL = os.environ['REQUEST_TOKEN_URL']
ACCESS_TOKEN_URL = os.environ['ACCESS_TOKEN_URL']
AUTHORIZE_URL = os.environ['AUTHORIZE_URL']
VERIFY_USER_URL = os.environ['VERIFY_USER_URL']
USER_TIMELINE_URL = os.environ['USER_TIMELINE_URL']
USER_TWEETS_URL = os.environ['USER_TWEETS_URL']
API_USERS_ENDPOINT = os.environ['API_USERS_ENDPOINT']
oauth_store = {}

@twitter_bp.route('/authorize/twitter')
def twitter_info():
    consumer = oauth.Consumer(CONSUMER_KEY, CONSUMER_SECRET)
    client = oauth.Client(consumer)
    resp, content = client.request(REQUEST_TOKEN_URL, "POST", body=urllib.parse.urlencode({"oauth_callback": REDIRECT_URI}))
    if resp['status'] != '200':
        error_message = f'Invalid response, status {resp["status"]}, {content.decode("utf-8")}'
        return render_template('error.html', error_message=error_message)

    request_token = dict(urllib.parse.parse_qsl(content))
    oauth_token = request_token[b'oauth_token'].decode('utf-8')
    oauth_token_secret = request_token[b'oauth_token_secret'].decode('utf-8')

    oauth_store[oauth_token] = oauth_token_secret

    # return redirect(f'{AUTHORIZE_URL}?oauth_token={oauth_token}')
    return render_template('authorize.html', authorize_url=AUTHORIZE_URL, oauth_token=oauth_token)


@twitter_bp.route('/callback')
def process_user():
    oauth_token = request.args.get('oauth_token')
    oauth_verifier = request.args.get('oauth_verifier')
    oauth_denied = request.args.get('denied')

    if oauth_denied:
        if oauth_denied in oauth_store:
            del oauth_store[oauth_denied]
        return render_template('error.html', error_message="The OAuth request was denied by this user")

    if not oauth_token or not oauth_verifier:
        return render_template('error.html', error_message="Callback param(s) missing")

    if oauth_token not in oauth_store:
        return render_template('error.html', error_message="OAuth token not found locally")

    oauth_token_secret = oauth_store[oauth_token]
    consumer = oauth.Consumer(CONSUMER_KEY, CONSUMER_SECRET)
    token = oauth.Token(oauth_token, oauth_token_secret)
    token.set_verifier(oauth_verifier)
    client = oauth.Client(consumer, token)

    resp, content = client.request(ACCESS_TOKEN_URL, "POST")
    access_token = dict(urllib.parse.parse_qsl(content))

    # for 2.0 PKCE (i.e. offline access scope), you would also need to call for a bearer token as well as an access token here

    user_id = access_token[b'user_id'].decode('utf-8')

    real_oauth_token = access_token[b'oauth_token'].decode('utf-8')
    real_oauth_token_secret = access_token[b'oauth_token_secret'].decode('utf-8')
    real_token = oauth.Token(real_oauth_token, real_oauth_token_secret)
    real_client = oauth.Client(consumer, real_token)

    resp, user_tweets_content = real_client.request(API_USERS_ENDPOINT + user_id + USER_TWEETS_URL, "GET")
    user_tweets = json.loads(user_tweets_content.decode('utf-8'))

    resp, timeline_content = real_client.request(API_USERS_ENDPOINT + user_id + USER_TIMELINE_URL, "GET")
    timeline_tweets = json.loads(timeline_content.decode('utf-8'))

    # overall_results, pertweet_sentiment_dict = model.main(
    #     {"tweet_id": [tweet['id_str'] for tweet in user_tweets], "text": [tweet['text'] for tweet in user_tweets]},
    #     {"tweet_id": [tweet['id_str'] for tweet in timeline_tweets], "text": [tweet['text'] for tweet in timeline_tweets]}
    # )

    # return redirect(url_for('twitter.dashboard', user_id=user_id, results=overall_results, tweets=pertweet_sentiment_dict))
    
    # real_resp, real_content = oauth.Client(consumer, real_token).request(
    #     VERIFY_USER_URL + '?user_id=' + user_id, "GET")

    return jsonify([user_tweets, timeline_tweets])

@twitter_bp.route('/dashboard/')
def dashboard():
    return send_from_directory('static', 'index.html')

@twitter_bp.route('/logout')
def logout():
    global oauth_store
    oauth_store = {}
    return redirect('/')
