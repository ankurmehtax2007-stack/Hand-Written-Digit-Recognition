import numpy as np

from PIL import Image

def preprocess_image(image):
    
    image = image.convert("L")

    image = image.resize((28,28))

    image_array = np.array(image)

    image_array = image_array.astype("float32") / 255.0

    ann_input = image_array.reshape(1,784)

    cnn_input = image_array.reshape(1,28,28,1)

    return ann_input, cnn_input