'''
This is a small script which eases the mass insertion process in the DB. This script prints a bunch
of MYSQL Insert commands which could be fed into the engine to Insert multiple Twitter Users in the 
TwitterUsers Table in midnight_tweety DB.

Instructions:
The 'topdir' would hold a string which would be the local path for the JSON file.
The json file should follow the same strcture as the 'people.json' file.
Run the script anywhere and it would print the MYSQL Insertion comands on the console.

Author: Vishrut Reddi
'''
 
# Directory path of the JSON file 
topdir = '/Users/vishrutreddi/Documents/Github/twitterGame/people.json'
 
import json
from pprint import pprint

with open(topdir) as data_file:    
    data = json.load(data_file)

for obj in data['users']:
	print("INSERT INTO TwitterUsers(TwitterName, TwitterHandle) VALUES ('" + obj['screenname'] + "', '" + obj['handle'] + "');");
