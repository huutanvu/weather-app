import weatherService from "../../helpers/weatherService";
import locationService from "../../helpers/locationService";

/*
 * action types
 */

const actions = {
    SET_WEATHER: 'SET_WEATHER',
    SET_USER_LOCATION: 'SET_USER_LOCATION'
};

/*
 * action creators
 */

export const setUserLocation = (location) => {
    return {
        type: actions.SET_USER_LOCATION,
        userLocation: location
    }
}

export const setWeather = (currentWeather, weatherForecast, location) => {
    return {
        type: actions.SET_WEATHER,
        currentWeather,
        weatherForecast,
        location
    }
}

export const setLocation = (location) => {
    return async (dispatch, getState) => {
        const weather = getState().weather;
        const currentTimestamp = Math.floor(Date.now() / 1000);  // convert to seconds
        const lastUpdated = Math.floor(weather.lastUpdated / 1000);  // convert to seconds
        if (weather.location === null ||
            weather.location.lon !== location.lon ||
            weather.location.lat !== location.lat ||
            (weather.lastUpdated !== null && ((currentTimestamp - lastUpdated) > 600))) {
            let currentWeather = await weatherService.getCurrentWeatherByCoords(location.lon, location.lat);
            let weatherForecast = await weatherService.getForecastWeatherByCoords(location.lon, location.lat);
            let { city, country } = await locationService.getReverseLocation(location);
            location["city"] = city;
            location["country"] = country;
            dispatch(setWeather(currentWeather, weatherForecast, location))
        }
    }
}

export default actions;