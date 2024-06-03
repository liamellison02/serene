import os
from .db import get_worker

db = get_worker(os.environ['DB_URI'])

def init_collection():
    if 'usage' not in db.list_collection_names():
        db.create_collection('usage')
        usage_collection = db.usage
        usage_collection.insert_one({'num_tweets_read': 0})
        usage_collection.insert_one({'allow_users_to_read': 5000})
        usage_collection.insert_one({'max_TWITTER_API_reads': 10000})

def add_usage(num_tweets_read: int, user_id: int):
    db.usage.update_one({}, {'$inc': {'num_tweets_read': num_tweets_read}})
    db.usage.update_one({'allow_users_to_read': {'$exists': True}}, {'$inc': {'allow_users_to_read': -num_tweets_read}})
    user = db.users.find_one({'user_id': user_id})
    if not user:
        return
    db.users.update_one({'user_id': user_id}, {'$inc': {'num_tweets_read': num_tweets_read}})

def server_reached_limit():
    init_collection()
    server_usage = db.usage.find_one({'num_tweets_read': {'$exists': True}})['num_tweets_read']
    server_limit = db.usage.find_one({'allow_users_to_read': {'$exists': True}})['allow_users_to_read']
    if server_usage >= server_limit:
        return True
    return False
    
def user_reached_limit(user_id: int):
    init_collection()
    user = db.users.find_one({'user_id': user_id})
    if not user:
        return False
    if user['num_tweets_read'] + 30 >= user['tweet_limit']:
        return True
    return False
