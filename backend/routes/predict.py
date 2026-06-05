from flask import Blueprint
from flask import request
from flask import jsonify

import base64
import io
from services.history_service import save_prediction
from services.predictor import predict_digit
from services.preprocessing import preprocess_image

from PIL import Image

predict_bp = Blueprint(
    "predict",
    __name__
)

@predict_bp.route("/predict", methods=["POST"])
def predict():
    data = request.json
    model_name = data["model"]
    image_data = data["image"]

    image_bytes = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_bytes))

    ann_input, cnn_input = preprocess_image(image)

    digit, confidence, probs = predict_digit(model_name, ann_input, cnn_input)

    save_prediction(model_name, digit, confidence)

    return jsonify({
        "prediction": digit,
        "confidence": confidence,
        "probabilities": probs
    })

