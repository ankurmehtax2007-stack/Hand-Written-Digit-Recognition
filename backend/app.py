from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)