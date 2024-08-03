import firebase_admin
from firebase_admin import credentials, firestore

# Step 1: Initialize Firebase Admin SDK
cred = credentials.Certificate("infraon-sports-firebase-adminsdk-scvyt-1f76128064.json")
firebase_admin.initialize_app(cred)

# Step 2: Initialize Firestore
db = firestore.client()

# Step 3: Define the data to be updated
update_data = {
    "Group A" : [3,15,11,9,8],
    "Group B" : [13,6,14,7,20],
    "Group C" : [10,2,17,18,16],
    "Group D" : [1,4,19,5,12],
}

duplicatiopn_check = []
for group in update_data:
    for num in update_data[group]:
        if num in duplicatiopn_check: exit()
        duplicatiopn_check.append(num)

dict_to_update = {}
for group in update_data:
    dict_to_update[str(group)] = {}
    for num in update_data[group]:
        dict_to_update[str(group)]["Team "+str(num)] = {"wins":0,"lost":0,"score":0}
# print(dict_to_update)
# exit()
# Step 4: Update data in Firestore

match_ = {
    "matches" : [
    {
        "MATCH": "Team 3 vs Team 15",
        "Time": "10 to 11 AM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 11 vs Team 9",
        "Time": "10 to 11 AM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 8 vs Team 3",
        "Time": "10 to 11 AM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 1 vs Team 4",
        "Time": "11 to 12 PM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 19 vs Team 5",
        "Time": "11 to 12 PM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 12 vs Team 1",
        "Time": "11 to 12 PM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 15 vs Team 11",
        "Time": "12 to 1 PM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 9 vs Team 8",
        "Time": "12 to 1 PM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 3 vs Team 11",
        "Time": "12 to 1 PM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 4 vs Team 19",
        "Time": "1 to 2 PM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 5 vs Team 12",
        "Time": "1 to 2 PM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 1 vs Team 19",
        "Time": "1 to 2 PM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 15 vs Team 9",
        "Time": "2 to 3 PM",
        "Court": "Court 1",
        "Winner": ""
    },
    {
        "MATCH": "Team 11 vs Team 8",
        "Time": "2 to 3 PM",
        "Court": "Court 1",
        "Winner": ""
    },
     {
        "MATCH": "Team 13 vs Team 6",
        "Time": "10 to 11 AM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 14 vs Team 7",
        "Time": "10 to 11 AM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 20 vs Team 13",
        "Time": "10 to 11 AM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 2 vs Team 17",
        "Time": "11 to 12 PM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 18 vs Team 16",
        "Time": "11 to 12 PM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 10 vs Team 17",
        "Time": "11 to 12 PM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 2 vs Team 18",
        "Time": "12 to 1 PM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 10 vs Team 16",
        "Time": "12 to 1 PM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 10 vs Team 18",
        "Time": "12 to 1 PM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 2 vs Team 16",
        "Time": "1 to 2 PM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 15 vs Team 8",
        "Time": "1 to 2 PM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 12 vs Team 4",
        "Time": "1 to 2 PM",
        "Court": "Court 2",
        "Winner": ""
    },
    {
        "MATCH": "Team 19 vs Team 5",
        "Time": "2 to 3 PM",
        "Court": "Court 2",
        "Winner": ""
    },

    {
        "MATCH": "Team 17 vs Team 2",
        "Time": "10 to 11 AM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 16 vs Team 18",
        "Time": "10 to 11 AM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 16 vs Team 17",
        "Time": "10 to 11 AM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 6 vs Team 14",
        "Time": "11 to 12 PM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 7 vs Team 20",
        "Time": "11 to 12 PM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 13 vs Team 14",
        "Time": "11 to 12 PM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 4 vs Team 5",
        "Time": "12 to 1 PM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 19 vs Team 12",
        "Time": "12 to 1 PM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 1 vs Team 5",
        "Time": "12 to 1 PM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 6 vs Team 7",
        "Time": "1 to 2 PM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 14 vs Team 20",
        "Time": "1 to 2 PM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 13 vs Team 7",
        "Time": "1 to 2 PM",
        "Court": "Court 3",
        "Winner": ""
    },
    {
        "MATCH": "Team 6 vs Team 20",
        "Time": "2 to 3 PM",
        "Court": "Court 3",
        "Winner": ""
    }
]

}

doc_ref = db.collection("matches").document("match")
doc_ref.set(match_)

print("Data updated successfully!")
