from flask import Flask, jsonify, request
from flask_cors import CORS
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
    CORS(app)

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
                  "units": "metric"}
        if request.args.get('city') is not None:
            params["q"] = request.args.get('city')
        elif all([request.args.get(coor) is not None for coor in ["lon", "lat"]]):
            params["lon"] = request.args.get('lon')
            params["lat"] = request.args.get('lat')
        else:
            return jsonify({"error": "Bad request"}), 400
        response = requests.request("GET", current_weather_api, params=params)
        if not response.status_code == 200:
            return jsonify({"error": "Cannot get weather data"}), response.status_code
        else:
            return jsonify(response.json()), 200

    @app.route('/forecast', methods=['GET'])
    def get_weather_forecast():
        forecast_api = f"{WEATHER_API}/forecast"
        params = {"APPID": WEATHER_API_KEY,
                  "units": "metric"}
        if request.args.get('city') is not None:
            params["q"] = request.args.get('city')
        elif all([request.args.get(coor) is not None for coor in ["lon", "lat"]]):
            params["lon"] = request.args.get('lon')
            params["lat"] = request.args.get('lat')
        else:
            return jsonify({"error": "Bad request"}), 400
        response = requests.request("GET", forecast_api, params=params)
        if not response.status_code == 200:
            return jsonify({"error": "Cannot get weather data"}), response.status_code
        else:
            return jsonify(response.json()), 200

    return app
