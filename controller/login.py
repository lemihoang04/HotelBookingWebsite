from flask import Flask, render_template, request, redirect, url_for, session, flash
from config import dbcon
import mysql.connector

app = Flask(__name__)
app.secret_key = 'your_secret_key' 





@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        

        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password))
        user = cursor.fetchone()
        
        cursor.close()
        connection.close()
        
        if user:

            session['user_id'] = user['id']``
            session['username'] = user['username']
            return redirect(url_for('dashboard'))  
        else:
            flash('Invalid username or password')  
            return redirect(url_for('login'))

    return render_template('login.html')


@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        return f"Hello, {session['username']}! Welcome to your dashboard."
    else:
        return redirect(url_for('login')) 

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return redirect(url_for('login'))  

if __name__ == '__main__':
    app.run(debug=True)
