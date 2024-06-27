from pymongo import MongoClient


def get_worker(db_uri):
    client = MongoClient(db_uri)
    db = client.worker
    return db
