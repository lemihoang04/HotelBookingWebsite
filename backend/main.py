from flask import Flask, jsonify, request
from users import *

app = Flask(__name__)

@app.route('/users', methods=['POST'])
def api_create_user():
    data = request.json
    username = data.get('Username')
    email = data.get('Email')
    password = data.get('Password')
    
    if not all([username, email, password]):
        return jsonify({"error": "Missing required information"}), 400

    create_user(username, email, password)
    return jsonify({"message": "User successfully created"}), 201

@app.route('/users', methods=['GET'])
def api_get_all_users():
    users = get_all_users()
    return jsonify(users), 200

@app.route('/users/<int:user_id>', methods=['GET'])
def api_get_user_by_id(user_id):
    user = get_user_by_id(user_id)
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "User does not exist"}), 404

@app.route('/users/<int:user_id>', methods=['PUT'])
def api_update_user(user_id):
    data = request.json
    username = data.get('Username')
    email = data.get('Email')
    password = data.get('Password')

    if not any([username, email, password]):
        return jsonify({"error": "No information to update"}), 400

    update_user(user_id, username=username, email=email, password=password)
    return jsonify({"message": "User information successfully updated"}), 200

@app.route('/users/<int:user_id>', methods=['DELETE'])
def api_delete_user(user_id):
    delete_user(user_id)
    return jsonify({"message": "User has been deleted"}), 200

@app.route('/login', methods=['POST'])
def api_login():
    data = request.json
    username = data.get('Username')
    password = data.get('Password')

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    user = login(username, password)
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "Wrong username or password"}), 404

if __name__ == '__main__':
    app.run(debug=True)
