from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS to allow requests from your React frontend
CORS(app)

# Load the combined model, which includes the trained Nearest Neighbors model and the TF-IDF vectorizer
print("Loading the combined model...")
combined_model = joblib.load('combined_model.pkl')
model = combined_model['model']
vectorizer = combined_model['vectorizer']
job_roles = combined_model['job_roles']
print("Model and vectorizer loaded successfully.")

@app.route('/recommend', methods=['POST'])
def recommend():
    print("Received a recommendation request.")
    
    # Get JSON data from the POST request
    data = request.get_json()
    skills = data.get('skills', '')
    print(f"Skills received: {skills}")

    # Check if skills were provided
    if not skills:
        print("No skills provided in the request.")
        return jsonify({'error': 'No skills provided'}), 400

    # Transform the input skills to a TF-IDF vector
    input_vector = vectorizer.transform([skills])

    # Use the model to find the nearest job role
    distances, indices = model.kneighbors(input_vector)

    # Retrieve the recommended job role based on the index
    recommended_role = job_roles[indices[0][0]]
    print(f"Recommended job role: {recommended_role}")

    # Return the recommended role as a JSON response
    return jsonify({'recommended_role': recommended_role})

if __name__ == '__main__':
    print("Starting the Flask server...")
    # Run the Flask app on localhost, port 5001
    app.run(host='0.0.0.0', port=5001)
    print("Flask server is running.")
