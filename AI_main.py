from keras.models import model_from_json
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import ImageOps
from PIL import Image
import numpy as np
import base64
import io


with open('handwriting_model_architecture.json', 'r') as f:
    model_json = f.read()

model = model_from_json(model_json)
model.load_weights('handwriting_model.weights.h5')

app = Flask(__name__)
CORS(app)  # 開啟跨域權限

@app.route('/AI_main', methods=['POST'])
def handle_image():
    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({'error': 'Missing image field'}), 400

    img_base64 = data['image'].split(',')[1]
    # 去除 base64 開頭
    img_bytes = base64.b64decode(img_base64)
    img = Image.open(io.BytesIO(img_bytes)).convert('L')
    img = img.resize((28, 28))
    img = ImageOps.invert(img)

    img_array = np.array(img)    # 轉成 NumPy 陣列並正規化
    img_array = img_array.reshape(1, 28, 28, 1)
    result = model.predict(img_array)
    predicted_class = int(result.argmax())
    return jsonify({'result': int(predicted_class)})

if __name__ == '__main__':
    app.run(debug=True)