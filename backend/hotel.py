from config_2 import get_db_connection

# Serialize hotel data into JSON format
def hotel_to_json(hotel_data):
    return {
        "HotelID": hotel_data['HotelID'],
        "Name": hotel_data['Name'],
        "Location": hotel_data['Location'],
        "Description": hotel_data['Description'],
        "StarRating": str(hotel_data['StarRating']),
        "ContactInfo": hotel_data['ContactInfo']
    }

# Create a new hotel record
def create_hotel(name, location, description, star_rating, contact_info):
    connection = get_db_connection()
    cursor = connection.cursor()
    sql = """
        INSERT INTO hotel (Name, Location, Description, StarRating, ContactInfo)
        VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(sql, (name, location, description, star_rating, contact_info))
    connection.commit()
    cursor.close()
    connection.close()

# Retrieve all hotels
def get_all_hotels():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM hotel")
    hotels = cursor.fetchall()
    cursor.close()
    connection.close()
    return [hotel_to_json(hotel) for hotel in hotels]

# Retrieve a hotel by ID
def get_hotel_by_id(hotel_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM hotel WHERE HotelID = %s", (hotel_id,))
    hotel = cursor.fetchone()
    cursor.close()
    connection.close()
    return hotel_to_json(hotel) if hotel else None

# Update a hotel record
def update_hotel(hotel_id, name=None, location=None, description=None, star_rating=None, contact_info=None):
    connection = get_db_connection()
    cursor = connection.cursor()
    updates = []
    values = []

    if name:
        updates.append("Name = %s")
        values.append(name)
    if location:
        updates.append("Location = %s")
        values.append(location)
    if description:
        updates.append("Description = %s")
        values.append(description)
    if star_rating:
        updates.append("StarRating = %s")
        values.append(star_rating)
    if contact_info:
        updates.append("ContactInfo = %s")
        values.append(contact_info)

    values.append(hotel_id)
    sql = f"UPDATE hotel SET {', '.join(updates)} WHERE HotelID = %s"
    cursor.execute(sql, tuple(values))
    connection.commit()
    cursor.close()
    connection.close()

# Delete a hotel record
def delete_hotel(hotel_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM hotel WHERE HotelID = %s", (hotel_id,))
    connection.commit()
    cursor.close()
    connection.close()
