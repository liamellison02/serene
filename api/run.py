import os
from flaskapp import create_app
from flask_cors import CORS

app = create_app()
CORS(app)
app.secret_key = os.urandom(50)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
