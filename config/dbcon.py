from flask import Flask, render_template, request, redirect, url_for, session, flash

import mysql.connector


def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='your_username',
        password='your_password',
        database='your_database'
    )
    return connection