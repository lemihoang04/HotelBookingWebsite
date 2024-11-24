from config_2 import get_db_connection

# Serialize payment data into JSON format
def payment_to_json(payment_data):
    return {
        "PaymentID": payment_data['PaymentID'],
        "BookingID": payment_data['BookingID'],
        "UserID": payment_data['UserID'],
        "Amount": str(payment_data['Amount']),
        "PaymentMethod": payment_data['PaymentMethod'],
        "PaymentStatus": payment_data['PaymentStatus'],
        "Timestamp": payment_data['Timestamp'].isoformat()
    }

# Create a new payment record
def create_payment(booking_id, user_id, amount, payment_method, payment_status):
    connection = get_db_connection()
    cursor = connection.cursor()
    sql = """
        INSERT INTO payment (BookingID, UserID, Amount, PaymentMethod, PaymentStatus)
        VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(sql, (booking_id, user_id, amount, payment_method, payment_status))
    connection.commit()
    cursor.close()
    connection.close()

def get_Payments():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM payment")
    payments = cursor.fetchall()
    cursor.close()
    connection.close()
    return [payment_to_json(payment) for payment in payments]
# Retrieve all payments for a specific booking
def get_payments_by_booking_id(booking_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM payment WHERE BookingID = %s", (booking_id,))
    payments = cursor.fetchall()
    cursor.close()
    connection.close()
    return [payment_to_json(payment) for payment in payments]

# Retrieve a payment by ID
def get_payment_by_id(payment_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM payment WHERE PaymentID = %s", (payment_id,))
    payment = cursor.fetchone()
    cursor.close()
    connection.close()
    return payment_to_json(payment) if payment else None

# Update a payment record
def update_payment_status(booking_id):
    # Kết nối tới cơ sở dữ liệu
    connection = get_db_connection()
    cursor = connection.cursor()

    # Câu lệnh SQL cập nhật
    sql = "UPDATE payment SET PaymentStatus = 'Completed' WHERE BookingID = %s"

    # Thực thi câu lệnh SQL
    cursor.execute(sql,  (booking_id,))
    connection.commit()

    # Đóng kết nối
    cursor.close()
    connection.close()


# Delete a payment record
def delete_payment(payment_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM payment WHERE BookingID = %s", (payment_id,))
    connection.commit()
    cursor.close()
    connection.close()
