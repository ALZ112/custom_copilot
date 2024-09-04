from flask import Flask, request, jsonify
from google_api import get_code
app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_text():
    data = request.json
    selected_text = data.get('text', '')

    # Perform any processing you want with the selected_text
    generated_code = get_code(selected_text)
    # print(generated_code)
    # Return the processed text as a response
    return jsonify({"responseText": generated_code})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
