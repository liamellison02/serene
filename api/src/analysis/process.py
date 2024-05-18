import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import nlp
import random
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
def show_history(h):
    epochs_trained = len(h.history['loss'])
    plt.figure(figsize=(16, 6))

    plt.subplot(1, 2, 1)
    plt.plot(range(0, epochs_trained), h.history.get('accuracy'), label='Training')
    plt.plot(range(0, epochs_trained), h.history.get('val_accuracy'), label='Validation')
    plt.ylim([0., 1.])
    plt.xlabel('Epochs')
    plt.ylabel('Accuracy')
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(range(0, epochs_trained), h.history.get('loss'), label='Training')
    plt.plot(range(0, epochs_trained), h.history.get('val_loss'), label='Validation')
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.legend()
    plt.show()


def show_confusion_matrix(y_true, y_pred, classes):
    from sklearn.metrics import confusion_matrix

    cm = confusion_matrix(y_true, y_pred, normalize='true')

    plt.figure(figsize=(8, 8))
    sp = plt.subplot(1, 1, 1)
    ctx = sp.matshow(cm)
    plt.xticks(list(range(0, 6)), labels=classes)
    plt.yticks(list(range(0, 6)), labels=classes)
    plt.colorbar(ctx)
    plt.show()

import pandas as pd

train = pd.read_csv(
    "dataset/train.txt",
    sep=";",
    names=["text", "label"])

val = pd.read_csv(
    "dataset/val.txt",
    sep=";",
    names=["text", "label"])

test = pd.read_csv(
    "dataset/test.txt",
    sep=";",
    names=["text", "label"])
train.head()

def get_tweet(data):
    tweets = data["text"]
    labels = data["label"]
    return tweets, labels

def get_tweet_without_labels(data):
    tweets = data["text"]
    return tweets

tweets, labels = get_tweet(train)

def data_description(data):
    shape = data.shape
    text_nulls = data["text"].isnull().sum()
    label_nulls = data["label"].isnull().sum()
    label_count = data["label"].value_counts()

    plt.hist(data["label"])
    plt.xlabel('emotions')
    plt.ylabel('Frequency')
    plt.title('data distribution')

    print("data shape : ", shape)
    print("null values in text field : ", text_nulls)
    print("null values in text field : ", label_nulls)
    print("label counts")
    print(label_count)
    plt.show()


from tensorflow.keras.preprocessing.text import Tokenizer
tokenizer = Tokenizer(num_words=10000, oov_token="<UNK>")
tokenizer.fit_on_texts(tweets)

lengths = [len(s.split()) for s in tweets]
"""plt.hist(lengths, bins=len(set(lengths)))
plt.show()"""

maxlen = 50
from tensorflow.keras.preprocessing.sequence import pad_sequences
def get_sequences(tokenizer, tweets):
    sequences = tokenizer.texts_to_sequences(tweets)
    padded_sequences = pad_sequences(sequences, truncating='post', padding='post', maxlen=maxlen)
    return padded_sequences

padded_train_sequences = get_sequences(tokenizer, tweets)
padded_train_sequences[50]
lengths = [len(l) for l in padded_train_sequences]
"""plt.hist(lengths)
plt.show()"""

classes = set(labels)
class_to_index = dict((c, i) for i, c in enumerate(classes))
index_to_class = dict((value, key) for key, value in class_to_index.items())

labels_to_ids = lambda labels: np.array([class_to_index.get(x) for x in labels])
ids_to_labels = lambda ids: np.array([index_to_class.get(x) for x in ids])
train_labels = labels_to_ids(labels)
train_labels[50]

def get_sentiment_score(text):
    analyzer = SentimentIntensityAnalyzer()
    sentiment_dict = analyzer.polarity_scores(text)
    return sentiment_dict['compound']
def create_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Embedding(10000, 16, input_length=maxlen),
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

def predict_emotion(model, sequences, index_to_class,i):
    p = model.predict(np.expand_dims(sequences[i], axis=0))[0]
    pred_class = index_to_class[np.argmax(p).astype('uint8')]
    return pred_class

def predict_emotion_probability(model, sequences, i):
    p = model.predict(np.expand_dims(sequences[i], axis=0))[0]
    pred_class_index = np.argmax(p)
    intensity = p[pred_class_index]
    return intensity

#show_confusion_matrix(test_labels, classes_x, list(classes))

def main():
    model = create_model()
    val_tweets, val_labels = get_tweet(val)
    val_sequences = get_sequences(tokenizer, val_tweets)
    val_labels = labels_to_ids(val_labels)
    m = model.fit(
        padded_train_sequences,
        train_labels,
        validation_data=(val_sequences, val_labels),
        epochs=20,
        callbacks=[
         tf.keras.callbacks.EarlyStopping(monitor='val_accuracy', patience=2)
         ]
    )


    test_tweets = get_tweet_without_labels(test)
    test_sequences = get_sequences(tokenizer, test_tweets)
    #test_labels = labels_to_ids(test_labels)
    _ = model.evaluate(test_sequences)

    predict_x = model.predict(test_sequences)
    classes_x = np.argmax(predict_x, axis=1)

    for _ in range(5):
        i = random.randint(0, len(test_tweets) - 1)
        #print("Tweet : ", test_tweets[i], " ==> label : ", index_to_class[test_labels[i]])
        print("Tweet : ", test_tweets[i])
        intensity_score = abs(get_sentiment_score(test_tweets[i]))
        pred_class = predict_emotion(model, test_sequences, index_to_class, i)
        pred_intensity = predict_emotion_probability(model, test_sequences, i)
        print("predicted label : ", pred_class)
        print("intensity or probability of emotion: {:.2f}".format(pred_intensity))
        print("sentiment score from VADER: ", intensity_score)
        print("-----------------------\n")


if __name__ == '__main__':
    main()
