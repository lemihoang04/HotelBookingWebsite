from flask import Flask, jsonify, request
from users import create_user, get_all_users, get_user_by_id, update_user, delete_user

app = Flask(__name__)

# API để tạo người dùng
@app.route('/users', methods=['POST'])
def api_create_user():
    data = request.json
    username = data.get('Username')
    email = data.get('Email')
    password = data.get('Password')
    
    if not all([username, email, password]):
        return jsonify({"error": "Thiếu thông tin bắt buộc"}), 400

    create_user(username, email, password)
    return jsonify({"message": "Người dùng đã được tạo thành công"}), 201

# API để lấy tất cả người dùng
@app.route('/users', methods=['GET'])
def api_get_all_users():
    users = get_all_users()
    return jsonify(users), 200

# API để lấy một người dùng theo ID
@app.route('/users/<int:user_id>', methods=['GET'])
def api_get_user_by_id(user_id):
    user = get_user_by_id(user_id)
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "Người dùng không tồn tại"}), 404

# API để cập nhật thông tin người dùng
@app.route('/users/<int:user_id>', methods=['PUT'])
def api_update_user(user_id):
    data = request.json
    username = data.get('Username')
    email = data.get('Email')
    password = data.get('Password')

    if not any([username, email, password]):
        return jsonify({"error": "Không có thông tin để cập nhật"}), 400

    update_user(user_id, username=username, email=email, password=password)
    return jsonify({"message": "Thông tin người dùng đã được cập nhật thành công"}), 200

# API để xóa người dùng
@app.route('/users/<int:user_id>', methods=['DELETE'])
def api_delete_user(user_id):
    delete_user(user_id)
    return jsonify({"message": "Người dùng đã bị xóa"}), 200

if __name__ == '__main__':
    app.run(debug=True)
