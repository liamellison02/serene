from flask import Flask, session, redirect
from functools import wraps
from pymongo.mongo_client import MongoClient

app = Flask(__name__)
app.secret_key = b'\xa8\x89\xb5p\xdb\xc02\xd0\xf1V$\xfe\x8ad\xe6\xf6'

# this MUST be removed from code when pushed to repositories
# if you are testing locally, replace <username>:<password> with your credentials
uri = "mongodb+srv://<username>:<password>@worker.jx0silc.mongodb.net/?retryWrites=true&w=majority&appName=worker"

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
