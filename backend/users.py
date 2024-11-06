from config import get_db_connection
from datetime import datetime

def user_to_json(user_data):
    return {
        "UserID": user_data['UserID'],
        "Username": user_data['Username'],
        "Email": user_data['Email'],
        "CreatedAt": user_data['CreatedAt'].isoformat(),
    }

def create_user(username, email, password):
    connection = get_db_connection()
    cursor = connection.cursor()
    sql = "INSERT INTO user (Username, Email, Password, CreatedAt) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (username, email, password, datetime.utcnow()))
    connection.commit()
    cursor.close()
    connection.close()

def get_all_users():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user")
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return [user_to_json(user) for user in users]

def get_user_by_id(user_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user WHERE UserID = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    return user_to_json(user) if user else None

def update_user(user_id, username=None, email=None, password=None):
    connection = get_db_connection()
    cursor = connection.cursor()
    updates = []
    values = []

    if username:
        updates.append("Username = %s")
        values.append(username)
    if email:
        updates.append("Email = %s")
        values.append(email)
    if password:
        updates.append("Password = %s")
        values.append(password)

    values.append(user_id)
    sql = f"UPDATE user SET {', '.join(updates)} WHERE UserID = %s"
    cursor.execute(sql, tuple(values))
    connection.commit()
    cursor.close()
    connection.close()

def delete_user(user_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM user WHERE UserID = %s", (user_id,))
    connection.commit()
    cursor.close()
    connection.close()
