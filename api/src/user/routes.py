from src import app
from src.user.models import User


@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()


@app.route('/user/logout')
def logout():
    return User().logout()


@app.route('/user/login', methods=['POST'])
def login():
    return User().login()
