from api import create_app
from dotenv import load_dotenv

load_dotenv('./.env', override=True)

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
