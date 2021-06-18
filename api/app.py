
'''API endpoints necessary for user interaction, to be added to the rest of API'''

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import cloudinary
import cloudinary.uploader

# Cloudinary developer environment variables — make a free account at https://cloudinary.com
API_KEY="117178297545825"
API_SECRET="XTLwZfTXWecZUxSN6JSabn9TbMU"
CLOUD_NAME="learntogether"

# Flask server initialization
app = Flask(__name__)
CORS(app) # Enables Cross Origin Resource Sharing (CORS) source for photo transfer to server
app.logger.info(CLOUD_NAME)


'''Generates url for user-uploaded image to use in model'''
@app.route("/upload", methods=['POST'])
@cross_origin()
def upload_image():
    cloudinary.config(cloud_name=CLOUD_NAME, api_key=API_KEY, api_secret=API_SECRET) # Connecting to Cloudinary API
    upload_result = None
    if request.method == 'POST':
        image_to_upload = request.files['file']
        if image_to_upload:
            upload_result = cloudinary.uploader.upload(image_to_upload)
            # Uncomment the following line to view the result from this function
            # print(jsonify(upload_result))
            return jsonify(upload_result)


if __name__ == '__main__':
    app.run()