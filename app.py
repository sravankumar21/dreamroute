from flask import Flask
from flask_cors import CORS
from recommendation import recommendation_bp
from chatbot import chatbot_bp

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS to allow requests from your React frontend
CORS(app)

# Register blueprints
app.register_blueprint(recommendation_bp)
app.register_blueprint(chatbot_bp)

if __name__ == '__main__':
    print("Starting the Flask server...")
    app.run(host='0.0.0.0', port=5001)
    print("Flask server is running.")
