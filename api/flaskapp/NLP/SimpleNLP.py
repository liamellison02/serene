import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression  # or whatever model you used
import os


class SimpleNLP:
    def __init__(self):
        # Solve for the paths to the model and vectorizer
        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_dir, 'tweet_emotion_model.pkl')
        vectorizer_path = os.path.join(current_dir, 'tfidf_vectorizer.pkl')
        # Load the model & vectorizer from file
        self.model = joblib.load(model_path)
        self.vectorizer = joblib.load(vectorizer_path)

    def get_sequences(self, tweets):
        return self.vectorizer.transform(tweets)
    
    def predict(self, tweet):
        vectorized = self.vectorizer.transform([tweet])
        return self.model.predict(vectorized)[0]
    
    def predict_confidence(self, tweet):
        vectorized = self.vectorizer.transform([tweet])
        return max(self.model.predict_proba(vectorized)[0])