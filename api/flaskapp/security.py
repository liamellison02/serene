from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

DB_URI = os.environ['DB_URI']

client = MongoClient(DB_URI)

databases = client.list_database_names()

print("Databases:")
for db in databases:
    print(f"- {db}")


def initCollection():
    db = client['worker']
    if 'Usage' not in db.list_collection_names():
        db.create_collection('Usage')
        usage_collection = db['Usage']
        usage_collection.insert_one({'num_tweets_read': 0})
        usage_collection.insert_one({'allow_users_to_read': 5000})
        usage_collection.insert_one({'max_TWITTER_API_reads': 10000})

def addUsage(num_tweets_read: int):
    initCollection()
    db = client['worker']
    usage_collection = db['Usage']
    usage_collection.update_one({}, {'$inc': {'num_tweets_read': num_tweets_read}})

def hasUserPassedThreshold():
    return False