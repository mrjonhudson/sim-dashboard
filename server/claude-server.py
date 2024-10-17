from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import json
import time
import os
import base64

app = Flask(__name__)

# CORS configuration
CORS(app, resources={r"/stream": {"origins": "*"}}, supports_credentials=True)

# Add log file here
# log_file = ""
log_file = "/Users/mrjonhudson/Library/Application Support/CrossOver/Bottles/Assetto Corsa/drive_c/Program Files (x86)/Steam/steamapps/common/assettocorsa/apps/python/ac-telem/logs/speed_log.json"

# Ask for PIN and encode it
pin = input("Enter the PIN: ")
AUTH_PIN = f"Bearer {base64.b64encode(pin.encode()).decode()}"

def verify_auth_token(pin):
    return pin == AUTH_PIN

def get_json_data():
    try:
        with open(log_file, 'r') as file:
            return json.load(file)
    except Exception as e:
        return {"error": str(e)}

@app.route('/stream')
def stream():
    pin = request.headers.get('Authorization')
    if not pin or not verify_auth_token(pin):
        return jsonify({"error": "Unauthorized"}), 401

    def event_stream():
        while True:
            data = get_json_data()
            yield f"data: {json.dumps(data)}\n\n"
            time.sleep(0.1)  # Adjust this value to control update frequency

    # Check if the client supports SSE
    if request.headers.get('Accept') == 'text/event-stream':
        return Response(event_stream(), content_type='text/event-stream')
    else:
        # Fallback to JSONP for older browsers
        callback = request.args.get('callback', False)
        data = get_json_data()
        if callback:
            content = f"{callback}({json.dumps(data)})"
            return Response(content, mimetype="application/javascript")
        else:
            return jsonify(data)

if __name__ == '__main__':
    if log_file == "":
        exit("Log file not set")
    app.run(host='0.0.0.0', port=3001, threaded=True)
