from db import Db


class Service:
    def __init__(self):
        self.db = Db()

    def create_profile(self, uci_netid, first_name, last_name, major, year, graduation_year, gender, race, disability,
                       veteran, work_experience, skills, work_sponsorship):
        self.db.save_profile(uci_netid, first_name, last_name, major, year, graduation_year, gender, race, disability,
                             veteran, work_experience, skills, work_sponsorship)

    def get_profile_info(self, id):
        return self.db.get_profile_info(id)

    def check_user_exists(self, uci_netid):
        return self.db.check_user_exists(uci_netid)

    def get_all_profiles(self):
        return self.db.get_profiles_info()

    def save_and_update_application(self, uci_netid, company, status, job_type, link, position, location, job_id,
                                    date_applied, deadline):
        self.db.save_and_update_application(uci_netid, company, status, job_type, link, position, location, job_id,
                                            date_applied, deadline)

    def job_listing(self):
        return self.db.job_listing()

    def get_all_applications(self):
        return self.db.get_all_applications()

    def get_application(self, id):
        return self.db.get_application(id)
