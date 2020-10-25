#!/usr/bin/env python

import flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
from datetime import date
from datetime import timedelta

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

    print(users)

    try:
        data = json.loads(request.data)
        print(data)
        if (users != []):
            for user in users:
                print(user)
                if (user['email'] == data['email']):
                    if (user['password'] == data['password']):
                        return jsonify(statusCode=200, message='Usuário identificado.')
                    else:
                        return jsonify(statusCode=404, message='Senha incorreta')

            return jsonify(statusCode=404, message='Usuário não identificado.')
        else:
            return jsonify(statusCode=404, message='Usuário não identificado.')

    except Exception as e:
        return jsonify(statusCode=500, message=str(e))


@app.route('/add', methods=['POST'])
def add_task():

    try:
        data = json.loads(request.data)
        tasks.append(data)
        return jsonify(statusCode=200, message='Tarefa salva com sucesso.')

    except Exception as e:
        return jsonify(statusCode=500, message=str(e))


@app.route('/tasks', methods=['POST'])
def get_tasks():

    try:
        filtered_tasks = []
        data = json.loads(request.data)
        if (tasks != []):
            last_task_id = tasks[-1]['taskId']
        else:
            last_task_id = 0

        if (data['index'] == 0):
            return jsonify(statusCode=200, tasks=tasks, lastTaskId=last_task_id)
        else:
            date_now = date.today()
            delta = timedelta(weeks=1)
            date_then = date_now + delta

            for task in tasks:

                split_task_date = task['date'].split('/', 2)
                task_date = date(int(split_task_date[2]), int(
                    split_task_date[1]), int(split_task_date[0]))

                if (data['index'] == 1 and task_date == date_now):
                    filtered_tasks.append(task)
                elif (data['index'] == 2 and task_date >= date_now and task_date <= date_then):
                    filtered_tasks.append(task)

            return jsonify(statusCode=200, tasks=filtered_tasks, lastTaskId=last_task_id)

    except Exception as e:
        return jsonify(statusCode=500, message=str(e))


@app.route('/task/<id>', methods=['DELETE'])
def delete_task(id):

    try:
        for task in tasks:

            if (int(task['taskId']) == int(id)):
                value = task
                break
        
        tasks.remove(value)
        return jsonify(statusCode=200, message='Tarefa removida com sucesso.')

    except Exception as e:
        return jsonify(statusCode=500, message=str(e))


@app.route('/update', methods=['POST'])
def update_task():

    try:
        data = json.loads(request.data)
        index = 0

        for task in tasks:

            if (int(task['taskId']) == int(data['taskId'])):
                break
            
            index += 1
        tasks[index] = data
        return jsonify(statusCode=200, message='Tarefa removida com sucesso.')

    except Exception as e:
        return jsonify(statusCode=500, message=str(e))


app.run()
