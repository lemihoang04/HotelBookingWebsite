from flask import Flask, jsonify, request
from config_2 import get_db_connection  # Assuming a config file for database connection

app = Flask(__name__)

# Serialize booking data into JSON format
def booking_to_json(booking_data):
    return {
        "BookingID": booking_data['BookingID'],
        "UserID": booking_data['UserID'],
        "RoomID": booking_data['RoomID'],
        "CheckInDate": booking_data['CheckInDate'].isoformat() if booking_data['CheckInDate'] else None,
        "CheckOutDate": booking_data['CheckOutDate'].isoformat() if booking_data['CheckOutDate'] else None,
        "TotalPrice": str(booking_data['TotalPrice']),
        "BookingStatus": booking_data['BookingStatus'],
        "Timestamp": booking_data['Timestamp'].isoformat()
    }

# Create a new booking record
def create_booking(user_id, room_id, check_in_date, check_out_date, total_price, booking_status):
    connection = get_db_connection()
    cursor = connection.cursor()
    sql = """
        INSERT INTO booking (UserID, RoomID, CheckInDate, CheckOutDate, TotalPrice, BookingStatus)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(sql, (user_id, room_id, check_in_date, check_out_date, total_price, booking_status))
    connection.commit()
    cursor.execute("SELECT LAST_INSERT_ID()")
    booking_id = cursor.fetchone()[0]
    cursor.close()
    connection.close()
    return booking_id

def get_Bookings():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM booking ")
    bookings = cursor.fetchall()
    cursor.close()
    connection.close()
    return [booking_to_json(booking) for booking in bookings]

# Retrieve a booking by ID
def get_booking_by_id(booking_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM booking WHERE UserID = %s", (booking_id,))
    bookings = cursor.fetchall()  
    cursor.close()
    connection.close()
    return [booking_to_json(booking) for booking in bookings]

def get_booking_by_id_room(id_room):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM booking WHERE RoomID = %s", (id_room,))
    bookings = cursor.fetchall()  
    cursor.close()
    connection.close()
    return [booking_to_json(booking) for booking in bookings]

# Update a booking record
def update_booking(booking_id, room_id=None, check_in_date=None, check_out_date=None, total_price=None, booking_status=None):
    connection = get_db_connection()
    cursor = connection.cursor()
    updates = []
    values = []

    if room_id is not None:
        updates.append("RoomID = %s")
        values.append(room_id)
    if check_in_date is not None:
        updates.append("CheckInDate = %s")
        values.append(check_in_date)
    if check_out_date is not None:
        updates.append("CheckOutDate = %s")
        values.append(check_out_date)
    if total_price is not None:
        updates.append("TotalPrice = %s")
        values.append(total_price)
    if booking_status is not None:
        updates.append("BookingStatus = %s")
        values.append(booking_status)

    values.append(booking_id)
    sql = f"UPDATE booking SET {', '.join(updates)} WHERE BookingID = %s"
    cursor.execute(sql, tuple(values))
    connection.commit()
    cursor.close()
    connection.close()

# Delete a booking record
def delete_booking(booking_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM booking WHERE BookingID = %s", (booking_id,))
    connection.commit()
    cursor.close()
    connection.close()

# Flask API routes for Booking


