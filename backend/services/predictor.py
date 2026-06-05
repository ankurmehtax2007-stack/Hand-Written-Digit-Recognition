import numpy as np

from services.model_loader import (
    perceptron_model,
    ann_model,
    cnn_model
)

def predict_digit(model_name, ann_input, cnn_input):
    if model_name == "perceptron":
        prediction = perceptron_model.predict(
            ann_input
        )

    elif model_name == "ann":
        prediction = ann_model.predict(
            ann_input
        )

    else:
        prediction = cnn_model.predict(
            cnn_input
        )
    digit = int(np.argmax(prediction))
    confidence = float(np.max(prediction)) * 100
    probabilities = prediction[0].tolist()

    return digit, confidence, probabilities