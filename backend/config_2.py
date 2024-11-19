import mysql.connector

DATABASE_CONFIG = {
    'user': 'root',
    'password': '',
    'host': 'localhost',  # Không bao gồm cổng ở đây
    'port': 3306,         # Thêm cổng như một tham số riêng
    'database': 'booking_hotel'
}

def get_db_connection():
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    return connection