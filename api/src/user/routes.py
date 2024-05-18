from src import app
from src.user.models import User
from flask import request


@app.route('/signup', methods=['POST'])
def signup():
    return User().signup()


@app.route('/logout')
def logout():
    return User().logout()


@app.route('/login', methods=['POST'])
def login():
    return User().login()


@app.route('/authorize/twitter', methods=['GET'])
def twitter_info():
    args = request.args
    return args
