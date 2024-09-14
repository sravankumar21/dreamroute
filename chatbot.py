import json
import numpy as np
import pickle
from tensorflow.keras.models import load_model
from flask import Blueprint, request, jsonify

# Create a Blueprint for the chatbot routes
chatbot_bp = Blueprint('chatbot', __name__)

# Global variables
model = None
words = None
classes = None
intents_data = None

# Load resources
def load_resources():
    global model
    global words
    global classes
    global intents_data

    try:
        with open('public/data/interview_faq_with_samples.json') as file:
            global intents_data
            intents_data = json.load(file)
        print("Intents data loaded successfully.")
    except Exception as e:
        print(f"Error loading intents data: {e}")
        raise

    try:
        model = load_model('chatbot_model.h5')
        print("Chatbot model loaded successfully.")
    except Exception as e:
        print(f"Error loading chatbot model: {e}")
        raise

    try:
        with open('words.pkl', 'rb') as file:
            global words
            words = pickle.load(file)
        print("Words loaded successfully.")
    except Exception as e:
        print(f"Error loading words: {e}")
        raise

    try:
        with open('classes.pkl', 'rb') as file:
            global classes
            classes = pickle.load(file)
        print("Classes loaded successfully.")
    except Exception as e:
        print(f"Error loading classes: {e}")
        raise

# Convert message to a vector based on words.pkl
def message_to_vector(message):
    # Tokenize and pad the message as needed
    message_words = message.lower().split()
    vector = [0] * len(words)
    for word in message_words:
        if word in words:
            vector[words.index(word)] = 1
    return np.array([vector])

# Predict intent
def predict_intent(message):
    try:
        message_vector = message_to_vector(message)
        prediction = model.predict(message_vector)
        max_index = np.argmax(prediction[0])
        intent = classes[max_index]
        print(f"Prediction result: {prediction}")
        print(f"Predicted intent: {intent}")
        return [{'intent': intent}]
    except Exception as e:
        print(f"Error during prediction: {e}")
        return []

# Get response
def get_response(intents_list):
    responses = []
    try:
        for intent in intents_list:
            tag = intent['intent']
            for entry in intents_data:
                if entry['tag'] == tag:
                    responses.append({
                        'intent': tag,
                        'responses': entry['responses']
                    })
        print(f"Responses found: {responses}")
    except Exception as e:
        print(f"Error in get_response function: {e}")
    return responses

# Define the /interview-preparation endpoint
@chatbot_bp.route('/interview-preparation', methods=['POST'])
def interview_preparation():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            print("Error: Invalid request data.")
            return jsonify({'error': 'Invalid request data.'}), 400

        message = data['message']
        print(f"Received message: {message}")

        # Predict the intent
        intents_list = predict_intent(message)
        print(f"Intents list: {intents_list}")

        # Get the response
        responses = get_response(intents_list)
        print(f"Responses: {responses}")

        return jsonify(responses), 200

    except Exception as e:
        print(f"Error in /interview-preparation route: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

# Initialize resources
load_resources()
