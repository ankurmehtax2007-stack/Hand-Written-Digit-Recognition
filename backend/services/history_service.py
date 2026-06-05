import json
from datetime import datetime

def save_prediction(
    model,
    prediction,
    confidence
):
    record = {
        "time":
        datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        ),

        "model": model,

        "prediction": prediction,

        "confidence": confidence
    }
    with open("database/history.json","r") as file:
        history = json.load(file)

    history.append(record)

    with open("database/history.json","w") as file:
        json.dump(history, file, indent=4)

def get_history():

    with open(
        "database/history.json",
        "r"
    ) as file:

      return json.load(file)

def delete_prediction(timestamp):
    with open("database/history.json", "r") as file:
        history = json.load(file)

    new_history = [item for item in history if item.get("time") != timestamp]

    with open("database/history.json", "w") as file:
        json.dump(new_history, file, indent=4)

    return True