import mysql.connector


DATABASE_CONFIG = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'bookinghotel'
}


def get_db_connection():
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    return connection
