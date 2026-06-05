from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)

from routes.predict import predict_bp
from routes.history import history_bp

app.register_blueprint(
    predict_bp
)

app.register_blueprint(
    history_bp
)

@app.route("/")
def home():

    return {
        "status":"running"
    }

import os

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )

