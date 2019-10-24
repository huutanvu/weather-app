from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import requests
import datetime
import math
from csv import reader

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API = "https://api.openweathermap.org/data/2.5"
DAYS = ["Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday"]

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
APP_STATIC = os.path.join(APP_ROOT, 'static')

CAPITALS_DATA = {}
CONTINENT_CACHE = {}
BASIC_RANGES = [[-25, -10], [-9, 0], [1, 10], [11, 20], [21, 30], [31, 40]]

with open(os.path.join(APP_STATIC, "concap.csv"), 'r') as f:
    data = reader(f)
    data = list(data)
    for d in data[1:]:
        country = d[0]
        capital = d[1]
        # Remove the place where capital is N/A
        if capital == "N/A":
            continue
        lat = d[2]
        lon = d[3]
        continent = d[5]
        if continent in CAPITALS_DATA:
            CAPITALS_DATA[continent].append(
                {"country": country, "capital": capital, "location": {"lat": lat, "lon": lon}})
        else:
            CAPITALS_DATA[continent] = [
                {"country": country, "capital": capital, "location": {"lat": lat, "lon": lon}}]

CONTINENT_CACHE = {k: {"last_updated": None, "data": []}
                   for k in CAPITALS_DATA.keys()}


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

    @app.route('/capitals', methods=['GET'])
    def get_temperature_capitals():
        global CONTINENT_CACHE

        def get_temperature(location):
            current_weather_api = f"{WEATHER_API}/weather"
            params = {"APPID": WEATHER_API_KEY,
                      "units": "metric",
                      "lon": location["lon"],
                      "lat": location["lat"]}
            response = requests.request(
                "GET", current_weather_api, params=params)
            if not response.status_code == 200:
                return None
            else:
                return response.json()["main"]["temp"]

        if request.args.get('continent') is not None or request.args.get('continent') in CAPITALS_DATA.keys():
            continent = request.args.get('continent')
        else:
            return jsonify({"error": "Bad request"}), 400
        capitals_temperature = []
        no_capitals = len(CAPITALS_DATA[continent])
        min_temp = 100
        max_temp = -100
        temp_step = 0
        # Due to the limitation of the free API key, an update will be called once every 10 min
        # Use the cache data instead otherwise
        if CONTINENT_CACHE[continent]["last_updated"] is None or (datetime.datetime.now().timestamp() - CONTINENT_CACHE[continent]["last_updated"]) >= 600:
            for capital in CAPITALS_DATA[continent]:
                temp = get_temperature(capital["location"])
                if temp is None:
                    continue
                if temp < min_temp:
                    min_temp = math.floor(temp)
                if temp > max_temp:
                    max_temp = math.ceil(temp)
                capitals_temperature.append(
                    {"country": capital["country"], "capital": capital["capital"], "lat": capital["location"]["lat"],
                     "lon": capital["location"]["lon"], "temperature": round(temp)})
            capitals_temperature = sorted(
                capitals_temperature, key=lambda x: x["temperature"])
            CONTINENT_CACHE[continent]["last_updated"] = datetime.datetime.now(
            ).timestamp()
            CONTINENT_CACHE[continent]["data"] = capitals_temperature.copy()
        else:
            capitals_temperature = CONTINENT_CACHE[continent]["data"].copy()
        final_res = []
        for _range in BASIC_RANGES:
            min_temp_range = _range[0]
            max_temp_range = _range[1]
            temp = []
            while len(capitals_temperature) > 0 and min_temp_range <= capitals_temperature[0]["temperature"] <= max_temp_range:
                temp.append(capitals_temperature.pop(0))
            if len(temp) > 0:
                final_res.append(
                    {"min": min_temp_range, "max": max_temp_range, "data": temp})
        average_length = math.floor(
            sum([len(i["data"]) for i in final_res]) / len(final_res))
        epsilon = 1
        for index, res in enumerate(final_res):
            checked = False
            if not index == len(final_res) - 1:
                next_res = final_res[index + 1]
            else:
                next_res = None
            if len(res["data"]) == 0:
                final_res.pop(res)
            if len(res["data"]) == average_length:
                continue
            if len(res["data"]) > average_length:
                _longer = res["data"][average_length:].copy()
                res["data"] = res["data"][:average_length].copy()
                checked = True
                while len(_longer) > 0 and _longer[0]["temperature"] - res["data"][-1]["temperature"] < epsilon:
                    res["data"].append(_longer.pop(0))
                if len(_longer) > 0:
                    if next_res is None:
                        next_res = {}
                        next_res["data"] = _longer
                        next_res["max"] = _longer[-1]["temperature"]
                        next_res["min"] = _longer[0]["temperature"]
                        final_res.append(next_res)
                    else:
                        next_res["data"] = _longer + next_res["data"]
            while len(res["data"]) < average_length and not checked:
                if next_res is None:
                    break
                if next_res["data"][1]["temperture"] - next_res["data"][0]["temperature"] > epsilon:
                    res["data"].append(next_res["data"].pop(0))
                else:
                    break
            res["max"] = res["data"][-1]["temperature"]
            res["min"] = res["data"][0]["temperature"]

        return jsonify(final_res)

    return app
