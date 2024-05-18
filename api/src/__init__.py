from flask import Flask, session, redirect
from functools import wraps
from pymongo.mongo_client import MongoClient

app = Flask(__name__)
# these strings MUST be empty when pushing to git
app.secret_key = b''
uri = ""

# Create a new client and connect to the server
client = MongoClient(uri)
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
# Database
db = client.worker


# Decorators
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/')

    return wrap
