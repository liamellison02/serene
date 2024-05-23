# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements file into the container's /app directory
COPY requirements.txt ./

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Copy the entire Flask app source code into the container's /app directory
COPY api .

# Build the React app
# Change the working directory to the client directory in the container
WORKDIR /app/../client
# Copy package.json and package-lock.json to the container's /client directory
COPY client/package.json client/package-lock.json ./
# Install npm dependencies
RUN npm install
# Copy all files from the client directory on the host to the container's /client directory
COPY client ./
# Build the React app
RUN npm run build

# Move the build files to the Flask static directory
# Create the static directory inside /app
RUN mkdir -p /app/client/build
# Copy the React build output to the static directory inside /app
RUN cp -r build/* /app/build

# Change the working directory back to /app
WORKDIR /app

ENV TRAIN_PATH /app/flask/dataset/train.txt
ENV VAL_PATH /app/flask/dataset/val.txt
ENV TEST_PATH /app/flask/dataset/test.txt

EXPOSE $PORT

# Define the command to run the Flask app
CMD ["sh", "-c", "python app.py"]
