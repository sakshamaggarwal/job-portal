from collections import defaultdict
import json
import pymongo
from pymongo import MongoClient
from urllib.parse import quote


class Db:
    def __init__(self):
        password = "123456!@#"
        mongo_url = "mongodb+srv://job_portal:" + quote(
            password) + "@cluster0.wxp6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        cluster = MongoClient(mongo_url)

        self.db = cluster["Job_portal"]
        self.user_collection = self.db["Users"]
        self.applications_collection = self.db["applicationTracker"]

    def save_profile(self, uci_netid, first_name, last_name, major, year, graduation_year, gender, race, disability,
                     veteran, work_ex, skills, work_sponsorship):
        self.user_collection.update_one({"uci_netid": uci_netid},
                                        {"$setOnInsert": {
                                            "uci_netid": uci_netid,
                                            "first_name": first_name,
                                            "last_name": last_name,
                                            "major": major,
                                            "year": year,
                                            "graduation_year": graduation_year,
                                            "gender": gender,
                                            "race": race,
                                            "disability": disability,
                                            "veteran": veteran,
                                            "work_experience": work_ex,
                                            "skills": skills,
                                            "work_sponsorship": work_sponsorship
                                        }},
                                        upsert=True)

    def get_profile_info(self, uci_netid):
        cursor = self.user_collection.find({'uci_netid': uci_netid})
        list_cur = list(cursor)
        print(type(list_cur[0]))
        res = {}
        for dicts in list_cur:
            for keys in dicts:
                res[keys] = str(dicts[keys])
        json_data = json.dumps(res, indent=2)
        return json_data

    def get_profiles_info(self):
        cursor = self.user_collection.find({})
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

    def save_and_update_application(self, uci_netid, company, status, job_type, link, position, location, job_id,
                                    date_applied, deadline):
        self.applications_collection.replace_one({"uci_netid": uci_netid, "company": company},
                                                 {
                                                     "uci_netid": uci_netid,
                                                     "company": company,
                                                     "status": status,
                                                     "job_type": job_type,
                                                     "link": link,
                                                     "position": position,
                                                     "location": location,
                                                     "job_id": job_id,
                                                     "date_applied": date_applied,
                                                     "deadline": deadline
                                                 },
                                                 upsert=True)

    def check_user_exists(self, uci_netid):
        cursor = self.user_collection.find_one({"uci_netid": uci_netid})
        if cursor is None:
            return json.dumps("False")
        else:
            return json.dumps("True")

    def get_all_applications(self):
        cursor = self.applications_collection.find({})
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

    def get_application(self, uci_netid):
        cursor = self.applications_collection.find({"uci_netid": uci_netid})
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

    def job_listing(self):
        user_data = self.user_collection.find({})
        application_data = self.applications_collection.find({})
        list_user = list(user_data)
        list_app = list(application_data)

        user_res = []
        for dicts in list_user:
            dict_2 = {}
            for keys, values in dicts.items():
                if keys != "_id" and len(values) > 0:
                    dict_2[keys] = str(values)
            user_res.append(dict_2)
        print(user_res)

        app_res = defaultdict(list)
        for dicts in list_app:
            dict_2 = {}
            uci_netid = ""
            for keys, values in dicts.items():
                if keys != "_id" and len(values) > 0:
                    dict_2[keys] = str(values)
                    if keys == 'uci_netid':
                        uci_netid = values
            app_res[uci_netid].append(dict_2)
        print(app_res)

        job_listing = []
        for user in user_res:
            uci_netid = user['uci_netid']
            job_list_dict = {}
            jobs_applied_by_user = app_res[uci_netid]
            if len(jobs_applied_by_user) > 0:
                for job in jobs_applied_by_user:
                    job_list_dict['status'] = job['status']
                    job_list_dict['company'] = job['company']
                    job_list_dict['job_type'] = job['job_type']
                    job_list_dict['position'] = job['position']
                    job_list_dict['date_applied'] = job['date_applied']
                    job_list_dict['deadline'] = job['deadline']
                    job_list_dict['link'] = job['link']
                    job_list_dict['major'] = user['major']
                    job_list_dict['year'] = user['year']
                    job_list_dict['gender'] = user['gender']
                    job_list_dict['sponsorship'] = user['work_sponsorship']
                    job_list_dict['work_experience'] = user['work_experience']
                job_listing.append(job_list_dict)

        json_data = json.dumps(job_listing)
        return json_data
