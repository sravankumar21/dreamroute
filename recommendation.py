from flask import Blueprint, request, jsonify
import joblib
import os
import re
import docx2txt
from PyPDF2 import PdfReader
from werkzeug.utils import secure_filename

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

# Allowed file extensions
ALLOWED_EXTENSIONS = {'pdf', 'docx'}

# Function to check file extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Clean the resume text to remove unwanted characters
def clean_resume(resume_text):
    resume_text = re.sub('http\\S+\\s*', ' ', resume_text)  # Remove URLs
    resume_text = re.sub('RT|cc', ' ', resume_text)  # Remove RT and cc
    resume_text = re.sub('#\\S+', '', resume_text)  # Remove hashtags
    resume_text = re.sub('@\\S+', '  ', resume_text)  # Remove mentions
    resume_text = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"""), ' ', resume_text)  # Remove punctuations
    resume_text = re.sub(r'[^\x00-\x7f]', r' ', resume_text)
    resume_text = re.sub('\\s+', ' ', resume_text)  # Remove extra whitespace
    return resume_text

# Extract text from a PDF file
def extract_text_from_pdf(file_path):
    text = ''
    with open(file_path, 'rb') as file:
        reader = PdfReader(file)
        for page in reader.pages:
            text += page.extract_text()
    return text

# Extract technical skills from the resume text
def extract_technical_skills(text):
    text = text.lower()
    match = re.search(r'technical skills|skills', text)

    if match:
        start_idx = match.start()
        tech_skills_text = text[start_idx:start_idx + 1000]
        tech_skills_list = re.split(r'[\n;,.]', tech_skills_text)
        tech_skills_list = [skill.strip() for skill in tech_skills_list if len(skill.strip()) > 1]
        print(f"Extracted skills segment: {tech_skills_text}")
        return tech_skills_list
    else:
        print("Technical skills section not found in resume.")
        return "Technical skills section not found."

# Route for recommending based on input skills
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
    print("Transformed skills into vector.")

    # Use the model to find the nearest job role
    distances, indices = recommend_model.kneighbors(input_vector)

    # Retrieve the recommended job role based on the index
    recommended_role = job_roles[indices[0][0]]
    print(f"Recommended job role: {recommended_role}")

    # Return the recommended role as a JSON response
    return jsonify({'recommended_role': recommended_role})

@recommendation_bp.route('/recommend_from_resume', methods=['POST'])
def recommend_from_resume():
    print("Received a request for resume-based recommendation.")
    
    if 'resume' not in request.files:
        print("Error: No resume file provided in the request.")
        return jsonify({'error': 'No resume file provided'}), 400
    
    file = request.files['resume']
    print(f"Received file: {file.filename}")

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join('uploads', filename)
        print(f"Saving the resume file to: {file_path}")
        
        try:
            file.save(file_path)
            print("File saved successfully.")
            
            # Extract text based on file type
            try:
                if filename.endswith('.docx'):
                    print("Extracting text from DOCX file.")
                    resume_text = docx2txt.process(file_path)
                elif filename.endswith('.pdf'):
                    print("Extracting text from PDF file.")
                    resume_text = extract_text_from_pdf(file_path)
                else:
                    os.remove(file_path)
                    print("Error: Unsupported file format.")
                    return jsonify({'error': 'Unsupported file format'}), 400

                print(f"Extracted resume text: {resume_text}")
                resume_text = clean_resume(resume_text)
                print(f"Cleaned resume text: {resume_text}")

                extracted_skills = extract_technical_skills(resume_text)
                if not extracted_skills or isinstance(extracted_skills, str):
                    print("No technical skills found.")
                    return jsonify({'error': 'No technical skills found'}), 400

                skills_text = ' '.join(extracted_skills)
                print(f"Combined skills text: {skills_text}")

                # Vectorize the extracted skills
                input_vector = vectorizer.transform([skills_text])
                print("Transformed extracted skills into vector.")

                distances, indices = recommend_model.kneighbors(input_vector)
                recommended_roles = [job_roles[idx] for idx in indices[0]]
                print(f"Recommended job roles: {recommended_roles}")

                os.remove(file_path)  # Cleanup
                print("Temporary resume file deleted.")

                return jsonify({'extracted_skills': extracted_skills, 'recommended_roles': recommended_roles})

            except Exception as e:
                print(f"Error during resume processing: {e}")
                return jsonify({'error': 'Error processing the resume'}), 500

        except Exception as e:
            print(f"Error saving file: {e}")
            return jsonify({'error': 'Error saving the file'}), 500

    else:
        print("Error: File type not allowed or file is missing.")
        return jsonify({'error': 'File type not allowed or file missing'}), 400
