from flask import Flask
from flask import request
from service import Service
import json
import pymongo
from pymongo import MongoClient
from urllib.parse import quote

app = Flask(__name__)

service = Service()


@app.route('/')
def health_check():
    return 'Healthy!'

@app.route('/createProfile', methods=['POST'])
def create_profile():
    global service
    json_data = request.json
    print(json_data.keys())
    uci_netid = json_data['uci_netid']
    name = json_data['first_name'] + " " + json_data['last_name']
    service.create_profile(uci_netid, json_data['first_name'], json_data['last_name'], json_data['major'], json_data['year'], json_data['gender'],
                           json_data['sexual_orientation'], json_data['disability'], json_data['veteran'], json_data['work_ex'], json_data['skills'], json_data['work_auth'],
                           json_data['grad_date'], json_data['ethinicity'], json_data['email'], json_data['pass'])
    return json.dumps({"record added for : " 'uci_netid':uci_netid, 'name':name})

@app.route('/profile/<id>')
def get_profile(id):
    global service
    return service.get_profile_info(id)

@app.route('/profiles')
def get_profiles():
    return service.get_all_profiles()


if __name__ == '__main__':
    app.run()
