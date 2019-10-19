import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default class WeatherService {
    constructor() { }

    getCurrentWeather = async (cityName) => {
        const currentWeatherUrl = `${BACKEND_URL}/current`;
        try {
            let response = await axios.get(currentWeatherUrl, { params: { city: cityName } });
            return response.data;
        }
        catch (err) {
            console.error(err)
        }
    }

    getForecastWeather = async (cityName) => {
        const forecastWeatherUrl = `${BACKEND_URL}/forecast`;
        try {
            let response = await axios.get(forecastWeatherUrl, { params: { city: cityName } });
            return response.data;
        }
        catch (err) {
            console.error(err)
        }

    }
}
