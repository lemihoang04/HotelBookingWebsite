from flask import Flask, jsonify, request
from users import *
from flask_cors import CORS
from room import *
from hotel import *
from review import *
from payment import *
from booking import *
from flask import session

app = Flask(__name__)
app.secret_key = 'hotel'
CORS(app, origins="http://localhost:3000", supports_credentials=True)


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
    return jsonify({"message": "User information successfully updated"}), 200

@app.route('/users/<int:user_id>', methods=['DELETE'])
def api_delete_user(user_id):
    delete_user(user_id)
    return jsonify({"message": "User has been deleted"}), 200

@app.route('/login',  methods=['POST'])
def api_login():
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
@app.route('/logout', methods=['POST'])
def api_logout():
    session.clear()  
    return jsonify({"errCode":0,"message": "Logged out successfully"}), 200


@app.route('/create_room', methods=['POST'])
def api_create_room():
    data = request.form
    RoomType = data.get('RoomType')
    Price = data.get('Price')
    Availability = data.get('Availability')
    Features = data.get('Features')
    
    if not all([RoomType, Price, Availability, Features]):
        return jsonify({"error": "Missing required information"}), 400

    create_room(RoomType, Price, Availability, Features)
    return jsonify({"message": "Room successfully created"}), 201

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
    amount = data.get('Amount')
    payment_method = data.get('PaymentMethod')
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

    create_booking(user_id, room_id, check_in_date, check_out_date, total_price, booking_status)
    return jsonify({"message": "Booking successfully created"}), 201

@app.route('/bookings', methods=['GET'])
def api_get_bookings():
    bookings = get_Bookings()
    return jsonify(bookings), 200

@app.route('/bookings/<int:booking_id>', methods=['GET'])
def api_get_booking_by_id(booking_id):
    booking = get_booking_by_id(booking_id)
    if booking:
        return jsonify(booking), 200
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
