#!/usr/bin/env python

import flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

users = []


@app.route('/signup', methods=['POST'])
def sign_up():

    try:
        data = json.loads(request.data)
        users.append(data)
        return jsonify(statusCode=200, message='Usuário criado com sucesso!')
    except Exception as e:
        return jsonify(statusCode=500, message=str(e))

@app.route('/login', methods=['POST'])
def login():

    try:
        data = json.loads(request.data)
        for user in users:
            if (user['email'] == data['email']):
                if (user['password'] == data['password']):
                    return jsonify(statusCode=200, message='User found in database.')
                else:
                    return jsonify(statusCode=500, message='Wrong password.')
            else:
                return jsonify(statusCode=500, message='User not identified.')
        
    except Exception as e:
        return jsonify(statusCode=500, message=str(e))


app.run()
