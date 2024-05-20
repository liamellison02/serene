FROM python:3.9-slim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
ENV TRAIN_PATH /app/data/train.csv
ENV VAL_PATH /app/data/val.csv
ENV TEST_PATH /app/data/test.csv
EXPOSE 5000
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

CMD ["flask", "run", "--host=0.0.0.0"]
