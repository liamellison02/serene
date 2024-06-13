from dotenv import load_dotenv
load_dotenv()
from flask_cors import CORS

import os
from flaskapp import create_app

app = create_app()
app.secret_key = os.urandom(50)
CORS(app)

if __name__ == '__main__':
    port = os.environ.get("PORT")
    if port is None:
        port = 5000
        print("PORT environment variable not set. Falling back to default port 5000.")
    else:
        port = int(port)
        print(f"Using port {port} from PORT environment variable.")

    app.run(host="0.0.0.0", port=port)
