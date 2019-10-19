from flask import Flask, jsonify, request
import os
import requests

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API = "https://api.openweathermap.org/data/2.5"


def create_app():
    """
    """

    app = Flask(__name__)
    app.config.from_object('config.settings')
    app.config.from_pyfile('settings.py', silent=True)

    @app.route('/', methods=['GET'])
    def health_check():
        return jsonify({
            'data': 'Your server is running very fine!',
            'status': 'OK'
        }), 200

    @app.route('/current', methods=['GET'])
    def get_current_weather():
        current_weather_api = f"{WEATHER_API}/weather"
        params = {"APPID": WEATHER_API_KEY,
                  "q": request.args.get('city')}
        response = requests.request("GET", current_weather_api, params=params)
        if not response.status_code == 200:
            return jsonify({"error": "Cannot get weather data"}), response.status_code
        else:
            return jsonify(response.json()), 200

    return app