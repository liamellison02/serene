import os
from flaskapp import create_app
from flaskapp.process import TweetSentimentAnalyzer

app = create_app()
app.secret_key = os.urandom(50)

if __name__ == '__main__':
    port = os.environ.get("PORT")
    if port is None:
        port = 5000
        print("PORT environment variable not set. Falling back to default port 5000.")
    else:
        port = int(port)
        print(f"Using port {port} from PORT environment variable.")

    app.run(host="0.0.0.0", port=port)
    # Initialize and train the sentiment model
    train_path = os.environ.get('TRAIN_PATH')
    val_path = os.environ.get('VAL_PATH')
    test_path = os.environ.get('TEST_PATH')
    app.config['sentiment_model'] = TweetSentimentAnalyzer(train_path, val_path, test_path)