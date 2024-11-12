from flask import Flask, render_template, request, redirect, url_for, session, flash
import mysql.connector

app = Flask(__name__, template_folder='view')
app.secret_key = 'secret_key'  

def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='bookinghotel'
    )
    return connection


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        

        cursor.execute('SELECT * FROM user WHERE email = %s AND password = %s', (username, password))
        user = cursor.fetchone()
        
        cursor.close()
        connection.close()
        
        if user:
            session['user_id'] = user['UserID']
            session['Email'] = user['Email']
            return redirect(url_for('index'))  
        else:
            flash('Invalid username or password')  
            return redirect(url_for('login'))

    return render_template('login.html')


@app.route('/index')
def index():
    if 'username' in session:
        return render_template('index.html')
    else:
        return redirect(url_for('login'))  


@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return redirect(url_for('login'))  

if __name__ == '__main__':
    app.run(debug=True)
