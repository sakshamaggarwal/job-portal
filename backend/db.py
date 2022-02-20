from collections import defaultdict
import pandas as pd
import json
import pymongo
from pymongo import MongoClient
from urllib.parse import quote

class Db:
    def __init__(self):
        column_names = ['uci_netid', 'first_name', 'last_name', 'major', 'year', 'gender', 'sex', 'disability',
                        'veteran', 'work_ex', 'skills', 'work_auth', 'grad_date', 'ethinicity',
                        'email', 'pass']
        mongo_url = "mongodb+srv://job_portal:" + quote(
            "123456!@#") + "@cluster0.wxp6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        cluster = MongoClient(mongo_url)

        self.db = cluster["Job_portal"]
        self.collection = self.db["Users"]

    def save_profile(self, uci_netid, first_name, last_name, major, year, gender, sex, disability,
                     veteran, work_ex, skills, work_auth, grad_date, ethinicity,
                     email, pass_bool):
        self.collection.insert_one({
            "uci_netid": uci_netid,
            "first_name": first_name,
            "last_name": last_name,
            "major": major,
            "year": year,
            "gender": gender,
            "sexual_orientation": sex,
            "disability": disability,
            "veteran": veteran,
            "work_ex": work_ex,
            "skills": skills,
            "work_auth": work_auth,
            "grad_date": grad_date,
            "ethinicity": ethinicity,
            "email": email,
            "pass": pass_bool
        })

    def get_profile_info(self, uci_netid):
        cursor = self.collection.find({'uci_netid': uci_netid})
        list_cur = list(cursor)
        print(type(list_cur[0]))
        res = {}
        for dicts in list_cur:
            for keys in dicts:
                res[keys] = str(dicts[keys])
        json_data = json.dumps(res, indent=2)
        return json_data

    def get_profiles_info(self):
        cursor = self.collection.find({})
        list_cur = list(cursor)
        print(list_cur)
        res = []
        for dicts in list_cur:
            dict_2 = {}
            for keys in dicts:
                if keys != "_id":
                    dict_2[keys] = dicts[keys]
            res.append(dict_2)
        json_data = json.dumps(res)
        return json_data
