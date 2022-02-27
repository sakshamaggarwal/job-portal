from collections import defaultdict
import pandas as pd
import json


class Db:
    def __init__(self):
        column_names = ['uci_netid', 'first_name', 'last_name', 'major', 'year', 'gender', 'sex', 'disability',
                        'veteran', 'work_ex', 'skills', 'work_auth', 'grad_date', 'ethinicity',
                        'email', 'pass']
        self.df = pd.DataFrame(columns=column_names)

    def save_profile(self, uci_netid, first_name, last_name, major, year, gender, sex, disability,
                     veteran, work_ex, skills, work_auth, grad_date, ethinicity,
                     email, pass_bool):
        self.df.loc[len(self.df.index)] = [uci_netid, first_name, last_name, major, year, gender, sex, disability,
                                           veteran, work_ex, skills, work_auth, grad_date, ethinicity,
                                           email, pass_bool]

    def get_profile_info(self, uci_netid):
        profile = (self.df.loc[self.df['uci_netid'] == uci_netid]).T.to_dict()
        # parsed = json.loads(profile)
        return json.dumps(profile)

    def get_profiles_info(self):
        result = self.df.T.to_dict()
        return json.dumps(result)
