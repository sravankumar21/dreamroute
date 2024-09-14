from flask import Blueprint, request, jsonify
import joblib

# Create a blueprint for the recommendation system
recommendation_bp = Blueprint('recommendation', __name__)

# Load the combined model for the recommendation system
print("Loading the combined model...")
try:
    with open('combined_model.joblib', 'rb') as f:
        combined_model = joblib.load(f)
    recommend_model = combined_model['model']
    vectorizer = combined_model['vectorizer']
    job_roles = combined_model['job_roles']
    print("Recommendation model and vectorizer loaded successfully.")
except Exception as e:
    print(f"Error loading the combined model: {e}")

@recommendation_bp.route('/recommend', methods=['POST'])
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
    distances, indices = recommend_model.kneighbors(input_vector)

    # Retrieve the recommended job role based on the index
    recommended_role = job_roles[indices[0][0]]
    print(f"Recommended job role: {recommended_role}")

    # Return the recommended role as a JSON response
    return jsonify({'recommended_role': recommended_role})
