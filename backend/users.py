from config import get_db_connection
from datetime import datetime

def user_to_json(user_data):
    return {
        "UserID": user_data['UserID'],
        "Name": user_data['Name'],
        "Email": user_data['Email'],
        "Phone": user_data['Phone'],
        "CreatedAt": user_data['CreatedAt'].isoformat(),
    }
def admin_to_json(user_data):
    return {
        "Name": user_data['name'],
        "Email": user_data['Email'],
        "Phone": user_data['phone'],
        "CreatedAt": user_data['CreatedAt'].isoformat(),
    }
def create_user(name, email, password, phone):
    connection = get_db_connection()
    cursor = connection.cursor()
    sql = "INSERT INTO user (Name, Email, Password, Phone, CreatedAt) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(sql, (name, email, password, phone, datetime.utcnow()))
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
def get_admin_by_name(name):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM admin WHERE name = %s", (name,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    return admin_to_json(user) if user else None

def login(email, password):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user WHERE Email = %s AND Password = %s", (email, password))
    user = cursor.fetchone()
    cursor.close()
    connection.close()

    return user_to_json(user) if user else None
def loginAdmin(email, password):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM admin WHERE Email = %s AND Password = %s", (email, password))
    user = cursor.fetchone()
    cursor.close()
    connection.close()

    return admin_to_json(user) if user else None

def update_user(user_id, name=None, email=None, password=None, phone=None):
    connection = get_db_connection()
    cursor = connection.cursor()
    updates = []
    values = []

    if name:
        updates.append("Name = %s")
        values.append(name)
    if email:
        updates.append("Email = %s")
        values.append(email)
    if password:
        updates.append("Password = %s")
        values.append(password)
    if phone:
        updates.append("Phone = %s")
        values.append(phone)

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
