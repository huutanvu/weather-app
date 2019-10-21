from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import requests
import datetime
import math

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API = "https://api.openweathermap.org/data/2.5"
DAYS = ["Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday"]


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
            response.raise_for_status()
            return jsonify({"error": "Cannot get weather data"}), response.status_code
        else:
            return jsonify(response.json()), 200

    @app.route('/forecast', methods=['GET'])
    def get_weather_forecast():
        forecast_api = f"{WEATHER_API}/forecast"
        params = {"APPID": WEATHER_API_KEY,
                  "units": "metric"}
        if request.args.get('city') is not None:
            print("City: ", request.args.get('city'))
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
            data = response.json()
            weather_5days_3hours = data["list"]
            next_dates_list = []
            next_weather_list = []
            chart_labels = []
            chart_data = []
            # Add the next 24 hours = 8 instance
            t = 0
            next_day = False
            timezone_delta = -(int(request.args.get('timezoneOffset')) * 60)
            for d in weather_5days_3hours:
                # dt = datetime.datetime.fromtimestamp(d["dt"])
                dt = datetime.datetime.strptime(
                    d["dt_txt"], "%Y-%m-%d %H:%M:%S")
                dt = dt + datetime.timedelta(seconds=timezone_delta)
                date = dt.date()
                time = dt.time()
                if t < 8:
                    t += 1
                    if date == datetime.datetime.now().date():
                        chart_labels.append(time.strftime("%H:%M"))
                    else:
                        if not next_day:
                            next_day = True
                            chart_labels.append(
                                dt.strftime("%d/%m %H:%M"))
                        else:
                            chart_labels.append(time.strftime("%H:%M"))
                    chart_data.append(d["main"]["temp"])

                if date == datetime.datetime.now().date():
                    day = "Today"
                else:
                    day = DAYS[dt.weekday()]
                start_midday = datetime.time(10, 0, 0)
                end_midday = datetime.time(15, 0, 0)
                if start_midday <= time <= end_midday and day not in next_dates_list:
                    next_dates_list.append(day)
                    next_weather_list.append({
                        "temp": math.ceil(d["main"]["temp"]),
                        "icon": d["weather"][0]["icon"],
                        "main": d["weather"][0]["main"]
                    })

            chart_data = {
                "labels": chart_labels,
                "datasets": [{
                    "label": "Temperature",
                    "data": chart_data
                }]
            }

            return jsonify({
                "chart_data": chart_data,
                "weather_forecast": {
                    "dates": next_dates_list,
                    "weathers": next_weather_list
                }
            }), 200

    return app
