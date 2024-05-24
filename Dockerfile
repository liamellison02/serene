FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install -y nodejs npm
COPY api .
WORKDIR /app/../../client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client ./
RUN npm run build
RUN mkdir -p /app/flaskapp/client/build
RUN cp -r build/* /app/flaskapp/client/build
WORKDIR /app

ENV TRAIN_PATH /app/flaskapp/dataset/train.txt
ENV VAL_PATH /app/flaskapp/dataset/val.txt
ENV TEST_PATH /app/flaskapp/dataset/test.txt

EXPOSE $PORT

CMD ["sh", "-c", "python run.py"]
