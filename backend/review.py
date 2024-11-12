from config_2 import get_db_connection

# Serialize review data into JSON format
def review_to_json(review_data):
    return {
        "ReviewID": review_data['ReviewID'],
        "UserID": review_data['UserID'],
        "HotelID": review_data['HotelID'],
        "Rating": str(review_data['Rating']),
        "Comment": review_data['Comment'],
        "Timestamp": review_data['Timestamp'].isoformat()
    }

# Create a new review record
def create_review(user_id, hotel_id, rating, comment):
    connection = get_db_connection()
    cursor = connection.cursor()
    sql = """
        INSERT INTO review (UserID, HotelID, Rating, Comment)
        VALUES (%s, %s, %s, %s)
    """
    cursor.execute(sql, (user_id, hotel_id, rating, comment))
    connection.commit()
    cursor.close()
    connection.close()

# Retrieve all reviews for a specific hotel
def get_reviews_by_hotel_id(hotel_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM review WHERE HotelID = %s", (hotel_id,))
    reviews = cursor.fetchall()
    cursor.close()
    connection.close()
    return [review_to_json(review) for review in reviews]

# Retrieve a review by ID
def get_review_by_id(review_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM review WHERE ReviewID = %s", (review_id,))
    review = cursor.fetchone()
    cursor.close()
    connection.close()
    return review_to_json(review) if review else None

# Update a review record
def update_review(review_id, rating=None, comment=None):
    connection = get_db_connection()
    cursor = connection.cursor()
    updates = []
    values = []

    if rating is not None:
        updates.append("Rating = %s")
        values.append(rating)
    if comment is not None:
        updates.append("Comment = %s")
        values.append(comment)

    values.append(review_id)
    sql = f"UPDATE review SET {', '.join(updates)} WHERE ReviewID = %s"
    cursor.execute(sql, tuple(values))
    connection.commit()
    cursor.close()
    connection.close()

# Delete a review record
def delete_review(review_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM review WHERE ReviewID = %s", (review_id,))
    connection.commit()
    cursor.close()
    connection.close()
