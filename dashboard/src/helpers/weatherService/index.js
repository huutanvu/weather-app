import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class WeatherService {

    getCurrentWeatherByCity = async (cityName) => {
        const currentWeatherUrl = `${BACKEND_URL}/current`;
        try {
            let response = await axios.get(currentWeatherUrl, { params: { city: cityName } });
            return response.data;
        }
        catch (err) {
            console.error(err);
        }
    }

    getForecastWeatherByCity = async (cityName) => {
        const forecastWeatherUrl = `${BACKEND_URL}/forecast`;
        try {
            let response = await axios.get(forecastWeatherUrl, {
                params: {
                    city: cityName,
                    timezoneOffset: new Date().getTimezoneOffset()
                }
            });
            return response.data;
        }
        catch (err) {
            console.error(err);
        }
    }

    getCurrentWeatherByCoords = async (lon, lat) => {
        const currentWeatherUrl = `${BACKEND_URL}/current`;
        try {
            let response = await axios.get(currentWeatherUrl, { params: { lon, lat } });
            return response.data;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    getForecastWeatherByCoords = async (lon, lat) => {
        const forecastWeatherUrl = `${BACKEND_URL}/forecast`;
        try {
            let response = await axios.get(forecastWeatherUrl, {
                params: {
                    lon, lat,
                    timezoneOffset: new Date().getTimezoneOffset()
                }
            });
            return response.data;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    getCapitalsWeather = async (continent) => {
        const currentWeatherUrl = `${BACKEND_URL}/capitals`;
        try {
            let response = await axios.get(currentWeatherUrl, { params: { continent } });
            return response.data;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

}


export default new WeatherService();
