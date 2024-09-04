import google.generativeai as genai
import os
from api_key import GOOGLE_API_KEY
os.environ['GOOGLE_API_KEY'] = GOOGLE_API_KEY
genai.configure(api_key = os.getenv('GOOGLE_API_KEY'))
generation_config = {"temperature" : 0.9,"top_p" : 1,"top_k":1,"max_output_tokens" : 2048}

def get_code(text):
    model = genai.GenerativeModel("gemini-pro",generation_config=generation_config)
    prompt = f'''you are acting as a co - pilot in a editor so your task is only to generate the corresponding code asked or task asked  for and dont generae useless things and code must be executable and dont add language name in begining and dont add ``` in start and end
    required : {text} 
    response : '''
    res = model.generate_content([prompt])
    return res.text