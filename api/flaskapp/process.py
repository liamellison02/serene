import tensorflow as tf
import numpy as np
import random
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pandas as pd


class TweetSentimentAnalyzer:
    def __init__(self, train_path, val_path, test_path):
        self.maxlen = 50
        self.tokenizer = Tokenizer(num_words=10000, oov_token="<UNK>")
        self.analyzer = SentimentIntensityAnalyzer()
        self.classes = None
        self.class_to_index = None
        self.index_to_class = None

        self.train_data = self.load_data(train_path)
        self.val_data = self.load_data(val_path)
        self.test_data = self.load_data(test_path)

        self.train_tweets, self.train_labels = self.get_tweet(self.train_data)
        self.val_tweets, self.val_labels = self.get_tweet(self.val_data)
        self.test_tweets = self.get_tweet_without_labels(self.test_data)

        self.tokenizer.fit_on_texts(self.train_tweets)
        self.padded_train_sequences = self.get_sequences(self.train_tweets)
        self.val_sequences = self.get_sequences(self.val_tweets)
        self.test_sequences = self.get_sequences(self.test_tweets)

        self.classes = set(self.train_labels)
        self.class_to_index = dict((c, i) for i, c in enumerate(self.classes))
        self.index_to_class = dict((value, key) for key, value in self.class_to_index.items())
        self.train_labels = self.train_labels.map(self.class_to_index)
        self.val_labels = self.val_labels.map(self.class_to_index)

        self.model = self.create_model()
        self.train_model()
        self.evaluate_model()
        self.predict()

    def load_data(self, path):
        return pd.read_csv(path, sep=";", names=["text", "label"])

    def get_tweet(self, data):
        tweets = data["text"]
        labels = data["label"]
        return tweets, labels

    def get_tweet_without_labels(self, data):
        return data["text"]

    def get_sequences(self, tweets):
        sequences = self.tokenizer.texts_to_sequences(tweets)
        padded_sequences = pad_sequences(sequences, truncating='post', padding='post', maxlen=self.maxlen)
        return padded_sequences

    def get_sentiment_score(self, text):
        sentiment_dict = self.analyzer.polarity_scores(text)
        return sentiment_dict['compound']

    def create_model(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Embedding(10000, 16, input_length=self.maxlen),
            tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(20, return_sequences=True)),
            tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(20)),
            tf.keras.layers.Dense(6, activation='softmax')
        ])
        model.compile(
            loss='sparse_categorical_crossentropy',
            optimizer='adam',
            metrics=['accuracy']
        )
        return model

    def predict_emotion(self, sequence):
        p = self.model.predict(np.expand_dims(sequence, axis=0))[0]
        pred_class = self.index_to_class[np.argmax(p).astype('uint8')]
        return pred_class

    def predict_emotion_probability(self, sequence):
        p = self.model.predict(np.expand_dims(sequence, axis=0))[0]
        pred_class_index = np.argmax(p)
        intensity = p[pred_class_index]
        return intensity

    def train_model(self):
        m = self.model.fit(
            self.padded_train_sequences,
            self.train_labels,
            validation_data=(self.val_sequences, self.val_labels),
            epochs=20,
            callbacks=[
                tf.keras.callbacks.EarlyStopping(monitor='val_accuracy', patience=8)
            ]
        )

    def evaluate_model(self):
        _ = self.model.evaluate(self.test_sequences)

    def predict(self):
        predict_x = self.model.predict(self.test_sequences)
        classes_x = np.argmax(predict_x, axis=1)

        """for _ in range(5):
            i = random.randint(0, len(self.test_tweets) - 1)
            print("Tweet : ", self.test_tweets[i])
            intensity_score = abs(self.get_sentiment_score(self.test_tweets[i]))
            pred_class = self.predict_emotion(self.test_sequences[i])
            pred_intensity = self.predict_emotion_probability(self.test_sequences[i])
            print("predicted label : ", pred_class)
            print("intensity or probability of emotion: {:.2f}".format(pred_intensity))
            print("sentiment score from VADER: ", intensity_score)
            print("-----------------------\n")"""

    def main(self,tweetdict,timelinedict):
        pertweet_sentiment_dict = self.calculate_sentiment_per_tweet(tweetdict)
        total_intensity_user = self.calculate_total_intensity(list(tweetdict["text"]))
        total_intensity_timeline = self.calculate_total_intensity(list(timelinedict["text"]))
        overall_results = {
            "total_anger_intensity_level": total_intensity_user["anger"],
            "total_joy_intensity_level": total_intensity_user["joy"],
            "total_sadness_intensity_level": total_intensity_user["sadness"],

            "timeline_anger_intensity_level": total_intensity_timeline["anger"],
            "timeline_joy_intensity_level": total_intensity_timeline["joy"],
            "timeline_sadness_intensity_level": total_intensity_timeline["sadness"]
        }
        return overall_results, pertweet_sentiment_dict
