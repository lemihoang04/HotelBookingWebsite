from flask import Flask, jsonify, request, send_from_directory
from werkzeug.utils import secure_filename
import os
from users import *
from flask_cors import CORS
from room import *
from hotel import *
from review import *
from payment import *
from booking import *
from flask import session
import hashlib
import hmac
import json
import requests
import time
app = Flask(__name__)
app.secret_key = 'hotel'
CORS(app, origins="http://localhost:3000", supports_credentials=True)

# ZaloPay configuration
ZALOPAY_CONFIG = {
    "app_id": "2553",
    "key1": "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    "key2": "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    "create_order_endpoint": "https://sb-openapi.zalopay.vn/v2/create",
    "query_order_endpoint": "https://sb-openapi.zalopay.vn/v2/query",
}
UPLOAD_FOLDER = 'backend/uploads'
LOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['LOAD_FOLDER'] = LOAD_FOLDER
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def generate_hmac(data, key):
    return hmac.new(key.encode(), data.encode(), hashlib.sha256).hexdigest()

# ZaloPay routes
@app.route('/create_order', methods=['POST'])
def create_zalopay_order():
    order_details = request.form
    print(order_details)
    if not order_details:
        return jsonify({"error": "Missing order details"}), 400

    trans_id = int(time.time() * 1000)
    embed_data = {
        "redirecturl": f"http://localhost:3000/ProcessPayment?id_user={order_details.get('UserID')}"
    }

    order = {
        "app_id": ZALOPAY_CONFIG["app_id"],
        "app_trans_id": f"{time.strftime('%y%m%d')}_{trans_id}",
        "app_user": order_details.get("userName", "user123"),
        "app_time": int(time.time() * 1000),
        "item": json.dumps(order_details.get("items", [])),
        "embed_data": json.dumps(embed_data),
        "amount": order_details.get("TotalPrice", 50000),
        "callback_url": "https://example.ngrok-free.app/callback",
        "description": f"ZaloPay - Payment for the order #{trans_id}",
        "bank_code": "",
    }

    data = f"{order['app_id']}|{order['app_trans_id']}|{order['app_user']}|{order['amount']}|{order['app_time']}|{order['embed_data']}|{order['item']}"
    order["mac"] = generate_hmac(data, ZALOPAY_CONFIG["key1"])

    try:
        response = requests.post(
            ZALOPAY_CONFIG["create_order_endpoint"],
            data=order,  # Changed to `data` for form-encoded content
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        return jsonify(response.json()), response.status_code
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/callback', methods=['POST'])
def callback_zalopay_order():
    data = request.form
    if not data:
        return jsonify({"error": "Missing data"}), 400

    received_mac = data.get("mac")
    data_str = data.get("data")

    if not received_mac or not data_str:
        return jsonify({"error": "Invalid callback data"}), 400

    mac = generate_hmac(data_str, ZALOPAY_CONFIG["key2"])
    if received_mac != mac:
        return jsonify({"return_code": -1, "return_message": "mac not equal"}), 400

    data_json = json.loads(data_str)
    print(f"Update order's status to success for app_trans_id: {data_json['app_trans_id']}")

    return jsonify({"return_code": 1, "return_message": "success"}), 200

@app.route('/payment/CheckZaloPay', methods=['POST'])
def check_zalopay_order_status():
    app_trans_id = request.form.get("app_trans_id")

    if not app_trans_id:
        return jsonify({"error": "Missing app_trans_id"}), 400

    data = f"{ZALOPAY_CONFIG['app_id']}|{app_trans_id}|{ZALOPAY_CONFIG['key1']}"
    mac = generate_hmac(data, ZALOPAY_CONFIG["key1"])

    payload = {
        "app_id": ZALOPAY_CONFIG["app_id"],
        "app_trans_id": app_trans_id,
        "mac": mac,
    }

    try:
        response = requests.post(
            ZALOPAY_CONFIG["query_order_endpoint"],
            data=payload,  # Changed to `data` for form-encoded content
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        return jsonify(response.json()), response.status_code
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500


@app.route('/register', methods=['POST'])
def api_create_user():
    data = request.form
    name = data.get('Name')
    email = data.get('Email')
    password = data.get('Password')
    phone = data.get('Phone')
    
    if not all([name, email, password, phone]):
        return jsonify({"error": "Missing required information"}), 400

    create_user(name, email, password, phone)
    return jsonify({"message": "User successfully created"}), 201

@app.route('/api/account', methods=['GET'])
def get_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"errCode": 1, "message": "Not authenticated"}), 401
    user = get_user_by_id(user_id)  
    if user:
        return jsonify({"errCode": 0, "user": user}), 200
    else:
        return jsonify({"errCode": 1, "message": "User not found"}), 404
@app.route('/api/admin', methods=['GET'])
def get_admin():
    user_id = session.get('name')
    if not user_id:
        return jsonify({"errCode": 1, "message": "Not authenticated"}), 401
    user = get_admin_by_name(user_id)  
    if user:
        return jsonify({"errCode": 0, "user": user}), 200
    else:
        return jsonify({"errCode": 1, "message": "Admin not found"}), 404


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
    data = request.form
    name = data.get('Name')
    email = data.get('Email')
    password = data.get('Password')
    phone = data.get('Phone')

    if not any([name, email, password, phone]):
        return jsonify({"error": "No information to update"}), 400

    update_user(user_id, name=name, email=email, password=password, phone=phone)
    return jsonify({"errCode":0,"message": "User information successfully updated"}), 200

@app.route('/users/<int:user_id>', methods=['DELETE'])
def api_delete_user(user_id):
    delete_user(user_id)
    return jsonify({"message": "User has been deleted"}), 200

@app.route('/login',  methods=['POST'])
def api_login():
    session.clear()  
    data = request.form
    print("Received data:", data) 
    email = data.get('Email')
    password = data.get('Password')
    print(f"Email: {email}, Password: {password}") 
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = login(email, password)
    if user:
        session['user_id'] = user['UserID']  
        session['email'] = email
        return jsonify({"errCode":0,"user": user}), 200
    else:
        return jsonify({"error": "Wrong email or password"}), 404
@app.route('/loginAdmin',  methods=['POST'])
def api_loginAdmin():
    session.clear()  
    data = request.form
    print("Received data:", data) 
    email = data.get('Email')
    password = data.get('Password')
    print(f"Email: {email}, Password: {password}") 
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = loginAdmin(email, password)
    if user:
        session['name'] = user['Name']  
        session['email'] = email
        return jsonify({"errCode":0,"user": user}), 200
    else:
        return jsonify({"error": "Wrong email or password"}), 404
@app.route('/logout', methods=['POST'])
def api_logout():
    session.clear()  
    return jsonify({"errCode":0,"message": "Logged out successfully"}), 200

@app.route('/load/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['LOAD_FOLDER'], filename)

@app.route('/create_room', methods=['POST'])
def api_create_room():
    data = request.form  
    RoomID = data.get('idRoom')
    RoomType = data.get('roomType')
    Price = data.get('price')
    Availability = 1
    Features = data.get('features')
    
    if not all([RoomID, RoomType, Price, Availability, Features]):
        return jsonify({"errCode": 1,
            "error": "Missing required information"}), 400
    room = get_room_by_id(RoomID)
    if (room):
        return jsonify({"errCode": 1,
            "error": "RoomID already exists "}), 400
    
    picture = request.files.get('picture') 

    if not picture or not allowed_file(picture.filename):
        return jsonify({"errCode": 1,
                        "error": "Invalid or missing picture"}), 400


    filename = secure_filename(picture.filename)
    picture_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    picture.save(picture_path)

    create_room(RoomID, RoomType, Price, Availability, Features, filename)

    return jsonify({
        "errCode": 0,
        "message": "Room successfully created",
    }), 201


@app.route('/rooms', methods=['GET'])
def api_get_all_rooms():
    rooms = get_all_room()
    return jsonify(rooms), 200

@app.route('/rooms/<int:room_id>', methods=['GET'])
def api_get_room_by_id(room_id):
    room = get_room_by_id(room_id)
    if room:
        return jsonify(room), 200
    else:
        return jsonify({"error": "Room does not exist"}), 404

@app.route('/rooms/<int:room_id>', methods=['PUT'])
def api_update_room(room_id):
    data = request.form
    room_type = data.get('RoomType')
    price = data.get('Price')
    availability = data.get('Availability')
    features = data.get('Features')

    if not any([room_type, price, availability, features]):
        return jsonify({"error": "No information to update"}), 400

    update_room(room_id,room_type=room_type, price=price, availability=availability, features=features)
    return jsonify({"message": "Room information successfully updated"}), 200

@app.route('/rooms/<int:room_id>', methods=['DELETE'])
def api_delete_room(room_id):
    delete_room(room_id)
    return jsonify({"message": "Room has been deleted"}), 200


#hotel

# @app.route('/hotels', methods=['POST'])
# def api_create_hotel():
#     data = request.form
#     name = data.get('Name')
#     location = data.get('Location')
#     description = data.get('Description')
#     star_rating = data.get('StarRating')
#     contact_info = data.get('ContactInfo')
    
#     if not all([name, location, description, star_rating, contact_info]):
#         return jsonify({"error": "Missing required information"}), 400

#     create_hotel(name, location, description, star_rating, contact_info)
#     return jsonify({"message": "Hotel successfully created"}), 201

# @app.route('/hotels', methods=['GET'])
# def api_get_all_hotels():
#     hotels = get_all_hotels()
#     return jsonify(hotels), 200

# @app.route('/hotels/<int:hotel_id>', methods=['GET'])
# def api_get_hotel_by_id(hotel_id):
#     hotel = get_hotel_by_id(hotel_id)
#     if hotel:
#         return jsonify(hotel), 200
#     else:
#         return jsonify({"error": "Hotel not found"}), 404

# @app.route('/hotels/<int:hotel_id>', methods=['PUT'])
# def api_update_hotel(hotel_id):
#     data = request.form
#     name = data.get('Name')
#     location = data.get('Location')
#     description = data.get('Description')
#     star_rating = data.get('StarRating')
#     contact_info = data.get('ContactInfo')

#     if not any([name, location, description, star_rating, contact_info]):
#         return jsonify({"error": "No information to update"}), 400

#     update_hotel(hotel_id, name=name, location=location, description=description, star_rating=star_rating, contact_info=contact_info)
#     return jsonify({"message": "Hotel information successfully updated"}), 200

# @app.route('/hotels/<int:hotel_id>', methods=['DELETE'])
# def api_delete_hotel(hotel_id):
#     delete_hotel(hotel_id)
#     return jsonify({"message": "Hotel has been deleted"}), 200

#review

@app.route('/reviews', methods=['POST'])
def api_create_review():
    data = request.form
    user_id = data.get('UserID')
    rating = data.get('Rating')
    comment = data.get('Comment')
    
    if not all([user_id, rating]):
        return jsonify({"error": "Missing required information"}), 400

    create_review(user_id, rating, comment)
    return jsonify({"message": "Review successfully created"}), 201

@app.route('/reviews', methods=['GET'])
def api_get_reviews():
    reviews = get_reviews()
    return jsonify(reviews), 200

# @app.route('/reviews/detail/<int:review_id>', methods=['GET'])
# def api_get_review_by_id(review_id):
#     review = get_review_by_id(review_id)
#     if review:
#         return jsonify(review), 200
#     else:
#         return jsonify({"error": "Review not found"}), 404

@app.route('/reviews/<int:review_id>', methods=['PUT'])
def api_update_review(review_id):
    data = request.form
    rating = data.get('Rating')
    comment = data.get('Comment')

    if rating is None and comment is None:
        return jsonify({"error": "No information to update"}), 400

    update_review(review_id, rating=rating, comment=comment)
    return jsonify({"message": "Review successfully updated"}), 200

@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def api_delete_review(review_id):
    delete_review(review_id)
    return jsonify({"message": "Review has been deleted"}), 200

#payment

@app.route('/payments', methods=['POST'])
def api_create_payment():
    data = request.form
    booking_id = data.get('BookingID')
    user_id = data.get('UserID')
    amount = data.get('TotalPrice')
    payment_method = data.get('methodPay')
    payment_status = data.get('PaymentStatus')
    
    if not all([booking_id, user_id, amount, payment_method, payment_status]):
        return jsonify({"error": "Missing required information"}), 400

    create_payment(booking_id, user_id, amount, payment_method, payment_status)
    return jsonify({"message": "Payment successfully created"}), 201

@app.route('/payments', methods=['GET'])
def api_get_payments():
    payments = get_Payments()
    return jsonify(payments), 200

@app.route('/payments/<int:booking_id>', methods=['GET'])
def api_get_payments_by_booking_id(booking_id):
    payments = get_payments_by_booking_id(booking_id)
    return jsonify(payments), 200

@app.route('/payments/detail/<int:payment_id>', methods=['GET'])
def api_get_payment_by_id(payment_id):
    payment = get_payment_by_id(payment_id)
    if payment:
        return jsonify(payment), 200
    else:
        return jsonify({"error": "Payment not found"}), 404

@app.route('/payments/<int:payment_id>', methods=['PUT'])
def api_update_payment(payment_id):
    data = request.form
    amount = data.get('Amount')
    payment_method = data.get('PaymentMethod')
    payment_status = data.get('PaymentStatus')

    if amount is None and payment_method is None and payment_status is None:
        return jsonify({"error": "No information to update"}), 400

    update_payment(payment_id, amount=amount, payment_method=payment_method, payment_status=payment_status)
    return jsonify({"message": "Payment successfully updated"}), 200

@app.route('/payments/<int:payment_id>', methods=['DELETE'])
def api_delete_payment(payment_id):
    delete_payment(payment_id)
    return jsonify({"message": "Payment has been deleted"}), 200


#booking
@app.route('/bookings', methods=['POST'])
def api_create_booking():
    data = request.form
    user_id = data.get('UserID')
    room_id = data.get('RoomID')
    check_in_date = data.get('CheckInDate')
    check_out_date = data.get('CheckOutDate')
    total_price = data.get('TotalPrice')
    booking_status = data.get('BookingStatus')
    
    if not all([user_id, room_id, check_in_date, check_out_date, total_price, booking_status]):
        return jsonify({"error": "Missing required information"}), 400

    new_booking_id = create_booking(user_id, room_id, check_in_date, check_out_date, total_price, booking_status)
    return jsonify({"errCode":0,"message": "Booking successfully created","id_booking": new_booking_id}), 201

@app.route('/bookings', methods=['GET'])
def api_get_bookings():
    bookings = get_Bookings()
    return jsonify(bookings), 200

@app.route('/bookings/<int:booking_id>', methods=['GET'])
def api_get_booking_by_id(booking_id):
    booking = get_booking_by_id(booking_id)
    if booking:
        return jsonify({"errCode":0,"booking":booking}), 200
    else:
        return jsonify({"error": "Booking not found"}), 404

@app.route('/bookings/<int:booking_id>', methods=['PUT'])
def api_update_booking(booking_id):
    data = request.form
    room_id = data.get('RoomID')
    check_in_date = data.get('CheckInDate')
    check_out_date = data.get('CheckOutDate')
    total_price = data.get('TotalPrice')
    booking_status = data.get('BookingStatus')

    if room_id is None and check_in_date is None and check_out_date is None and total_price is None and booking_status is None:
        return jsonify({"error": "No information to update"}), 400

    update_booking(booking_id, room_id=room_id, check_in_date=check_in_date, check_out_date=check_out_date, total_price=total_price, booking_status=booking_status)
    return jsonify({"message": "Booking successfully updated"}), 200

@app.route('/bookings/<int:booking_id>', methods=['DELETE'])
def api_delete_booking(booking_id):
    delete_booking(booking_id)
    return jsonify({"message": "Booking has been deleted"}), 200



if __name__ == '__main__':
    app.run(debug=True)
