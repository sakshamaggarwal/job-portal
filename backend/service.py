from db import Db
class Service:
    def __init__(self):
        self.db = Db()

    def create_profile(self,uci_netid, first_name, last_name, major, year, gender, sex, disability,
                     veteran, work_ex, skills, work_auth, grad_date, ethinicity,
                     email, pass_bool):

        self.db.save_profile(uci_netid, first_name, last_name, major, year, gender, sex, disability,
                     veteran, work_ex, skills, work_auth, grad_date, ethinicity,
                     email, pass_bool)


    def get_profile_info(self, id):
        return self.db.get_profile_info(id)

    def get_all_profiles(self):
        return self.db.get_profiles_info()

    def add_application(self, uci_netid, company, status, job_type, link, position, location, job_id, date_applied, deadline):
        self.db.save_application(uci_netid, company, status, job_type, link, position, location, job_id, date_applied, deadline)

    def update_application(self, uci_netid, company, status, job_type, link, position, location, job_id, date_applied, deadline):
        self.db.update_application(uci_netid, company, status, job_type, link, position, location, job_id, date_applied, deadline)

    def job_listing(self):
        return self.db.job_listing()

    def get_all_applications(self):
        return self.db.get_all_applications()
