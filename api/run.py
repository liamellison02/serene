from src import app, login_required
from src.user.routes import *


@app.route('/')
def home():
    return "Home Page"


@app.route('/dashboard/')
@login_required
def dashboard():
    return "User Dashboard"


if __name__ == '__main__':
    app.run(debug=True)
