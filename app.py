import sys
import requests
import json
from requests.auth import HTTPDigestAuth
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app_config = {"host": "0.0.0.0", "port": sys.argv[1]}

url = 'http://192.168.1.108/cgi-bin/videoStatServer.cgi?action=getSummary&channel=1'
exampleData = """summary.Channel=0
summary.EnteredSubtotal.Hour=22
summary.EnteredSubtotal.Today=12
summary.EnteredSubtotal.Total=1
summary.EnteredSubtotal.TotalInTimeSection=33
summary.ExitedSubtotal.Hour=11
summary.ExitedSubtotal.Today=12
summary.ExitedSubtotal.Total=10
summary.ExitedSubtotal.TotalInTimeSection=22
summary.InsideSubtotal.Total=12
summary.RuleName=NumberStat
summary.UTC=1615580510"""

"""
---------------------- DEVELOPER MODE CONFIG -----------------------
"""
# Developer mode uses app.py
if "app.py" in sys.argv[0]:

    # Update app config
    app_config["debug"] = True

    # CORS settings
    cors = CORS(
        app,
        resources={r"/*": {"origins": "http://localhost*"}},
    )

    # CORS headers
    app.config["CORS_HEADERS"] = "Content-Type"


"""
--------------------------- REST CALLS -----------------------------
"""
# Remove and replace with your own


@app.route('/dahua')
def getDahua():
    Dahua = requests.get(url, auth=HTTPDigestAuth('admin', 'Lupata1488*'))


    # Turns all values to a list of lines
    DahuaValues = Dahua.text.splitlines()
    # DahuaValues = exampleData.splitlines()

    # Total of people entered today:
    PeopleInString = DahuaValues[2]
    PeopleIn = int(PeopleInString.split("=", 1)[1])

    # Total number of people exited today:
    PeopleOutString = DahuaValues[6]
    PeopleOut = int(PeopleOutString.split("=", 1)[1])

    # Total number of people inside right now:
    PeopleCount = PeopleIn - PeopleOut
    # print(PeopleCount)

    # Number of people still allowed to enter
    MaxPeople = 100
    AllowedToEnter = MaxPeople - PeopleCount

    # print('Allowed to Enter:', AllowedToEnter)

    # Return peopleCount, people in, people out
    res = jsonify(PeopleIn=PeopleIn, PeopleOut=PeopleOut,
                  PeopleCount=PeopleCount, MaxPeople=MaxPeople)
    res.status_code = 200

    return res


"""
-------------------------- APP SERVICES ----------------------------
"""
# Quits Flask on Electron exit


@app.route("/quit")
def quit():
    shutdown = request.environ.get("werkzeug.server.shutdown")
    shutdown()

    return


if __name__ == "__main__":
    app.run(**app_config)
