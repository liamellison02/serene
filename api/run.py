# import os
# from flaskapp import create_app

# app = create_app()
# app.secret_key = os.urandom(50)

# if __name__ == '__main__':
#     port = int(os.environ.get("PORT", 5000))
#     app.run(debug=True, host='0.0.0.0', port=port)

from flask import Flask
import os
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == "__main__":
    port = os.environ.get("PORT")

    if port is None:
        port = 5000
        print("PORT environment variable not set. Falling back to default port 5000.")
    else:
        port = int(port)
        print(f"Using port {port} from PORT environment variable.")
    
    app.run(host="0.0.0.0", port=port)