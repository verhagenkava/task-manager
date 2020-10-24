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
tasks = []


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
                    return jsonify(statusCode=200, message='Usuário não identificado.')
                else:
                    return jsonify(statusCode=500, message='Senha incorreta')
            else:
                return jsonify(statusCode=500, message='Usuário não identificado.')
        
    except Exception as e:
        return jsonify(statusCode=500, message=str(e))

@app.route('/add', methods=['POST'])
def add_task():

    try:
        data = json.loads(request.data)
        tasks.append(data)
        print(tasks)
        return jsonify(statusCode=200, message='Tarefa salva com sucesso.')
        
    except Exception as e:
        return jsonify(statusCode=500, message=str(e))


app.run()
