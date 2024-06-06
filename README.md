<p align="center">
  <img height="100" src="client/src/assets/logo.png" alt="Qdrant">
</p>
<p align="center">
    <b>A Twitter timeline with clairvoyant abilities</b>
</p>

**SERENE** displays the emotional makeup of your timeline. Our machine learning models provide analysis that will inform you of the most common and impactful emotions found on your timeline. Check it out here: <a href='sereneapp.co'>sereneapp.co</a>

# Serene

## Overview

Serene is an award-winning full-stack web application initially developed during the Data Hackfest 2024 hackathon and further improved post-hackathon. The application is designed to inform users about the impact of their social media usage on their mental health by performing sentiment analysis on their posts and home timeline.

## Features

- **Sentiment Analysis**: Analyzes the sentiment of user posts to gauge the impact of social media usage on mental health.
- **OAuth2.0 Authentication**: Securely authenticates with Twitter/X to pull user tweet data.
- **Machine Learning**: Utilizes a custom TensorFlow model and the pre-trained VaderSentiment model for sentiment analysis.
- **CI/CD Pipeline**: Automated build and deployment process using GitHub Actions, Docker, and Heroku.

## Technologies Used

- **Backend**: Flask
- **Frontend**: React
- **Database**: MongoDB
- **Machine Learning**: TensorFlow, VaderSentiment
- **CI/CD**: GitHub Actions, Docker, Heroku

## Continuous Integration and Deployment (CI/CD)

- **GitHub Actions**:
    - The project includes a GitHub Actions workflow that triggers on merge commits into the development or production branch. 
    - The workflow automates the build process using Docker and deploys the application to Heroku.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback, please contact our Twitter @serenetimeline.