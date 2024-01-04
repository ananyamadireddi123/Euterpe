#!/usr/bin/python3

from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
import json
from werkzeug.local import Local
from extensions import db
from models import Song

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///playlist.db'

local = Local()

def get_db():
    if not hasattr(local, "connection"):
        local.connection = sqlite3.connect('instance/playlist.db')
    return local.connection

db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_song', methods=['POST'])
def add_song():
    title = request.form['title']
    existing = Song.query.filter_by(title=title).first()
    
    if existing is None:
        new_song = Song(title=title)
        db.session.add(new_song)
        db.session.commit()

    filename = request.form['flename']
    return redirect(url_for(filename))


@app.route('/remove_song', methods=['POST'])
def remove_song():
    title = request.form['title']
    song = Song.query.filter_by(title=title).first()
    
    if song is not None:
        db.session.delete(song)
        db.session.commit()
    return redirect('playlist')     


@app.route('/artists')
def artists():
    return render_template('artist.html')

@app.route('/about')
def about():
    return render_template('About.html')

@app.route('/About')
def About():
    return render_template('About.html')

@app.route('/bornpsongs')
def bornpsongs():
    return render_template('bornpsongs.html')

@app.route('/bpal')
def bpal():
    return render_template('bpal.html')

@app.route('/btsal')
def btsal():
    return render_template('btsal.html')

@app.route('/checkmate')
def checkmate():
    return render_template('checkmate.html')

@app.route('/cheshire')
def cheshire():
    return render_template('cheshire.html')

@app.route('/dandwsongs')
def dandwsongs():
    return render_template('dandwsongs.html')

@app.route('/fearless')
def fearless():
    return render_template('fearless.html')

@app.route('/guesswho')
def guesswho():
    return render_template('guesswho.html')

@app.route('/ITZME')
def ITZME():
    return render_template('ITZME.html')

@app.route('/itzyal')
def itzyal():
    return render_template('itzyal.html')

@app.route('/killsongs')
def killsongs():
    return render_template('killsongs.html')

@app.route('/loc')
def loc():
    return render_template('loc.html')

@app.route('/lover')
def lover():
    return render_template('lover.html')

@app.route('/lysongs')
def lysongs():
    return render_template('lysongs.html')

@app.route('/mapsongs')
def mapsongs():
    return render_template('mapsongs.html')

@app.route('/midnights')
def midnights():
    return render_template('midnights.html')

@app.route('/rainsongs')
def rainsongs():
    return render_template('rainsongs.html')

@app.route('/raresongs')
def raresongs():
    return render_template('raresongs.html')

@app.route('/red')
def red():
    return render_template('red.html')

@app.route('/reputation')
def reputation():
    return render_template('reputation.html')

@app.route('/revalacion')
def revalacion():
    return render_template('revalacion.html')

@app.route('/rev')
def rev():
    return render_template('rev.html')

@app.route('/revsongs')
def revsongs():
    return render_template('revsongs.html')

@app.route('/searchpage')
def searchpage():
    return render_template('searchpage.html')

@app.route('/selal')
def selal():
    return render_template('selal.html')

@app.route('/spotlight')
def spotlight():
    return render_template('spotlight.html')

@app.route('/squareonesongs')
def squareonesongs():
    return render_template('squareonesongs.html')

@app.route('/squaresongs')
def squaresongs():
    return render_template('squaresongs.html')

@app.route('/sunsongs')
def sunsongs():
    return render_template('sunsongs.html')

@app.route('/tayloral')
def tayloral():
    return render_template('tayloral.html')

@app.route('/thesongs')
def thesongs():
    return render_template('thesongs.html')

@app.route('/wingssongs')
def wingssongs():
    return render_template('wingssongs.html')

@app.route('/youngsongs')
def youngsongs():
    return render_template('youngsongs.html')

@app.route('/playlist')
def playlist():
    connection = get_db()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM song")
    data = cursor.fetchall()

    # render the template with the retrieved data
    return render_template("playlist.html", data=data)    

 


if __name__ == '__main__':
    app.run(debug=True)
