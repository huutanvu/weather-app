import weatherService from "../../helpers/weatherService";
import locationService from "../../helpers/locationService";

/*
 * action types
 */

const actions = {
    SET_WEATHER: 'SET_WEATHER',
    SET_USER_LOCATION: 'SET_USER_LOCATION',
    SET_CAPITALS_DATA: 'SET_CAPITALS_DATA'
};

/*
 * action creators
 */

export const setCurrentLocation = (location) => {
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

export const setCapitalsData = (continent, capitalsData) => {
    return {
        type: actions.SET_CAPITALS_DATA,
        continent,
        capitalsData
    }
}

export const setUserLocation = () => {
    return async (dispatch, getState) => {
        const currentLocation = await locationService.getCurrentPosition();
        dispatch(setCurrentLocation({ lon: currentLocation.coords.longitude, lat: currentLocation.coords.latitude }))
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
            if (!(location.hasOwnProperty("city") && location.hasOwnProperty("country"))) {
                let { city, country } = await locationService.getReverseLocation(location);
                location["city"] = city;
                location["country"] = country;
            }
            dispatch(setWeather(currentWeather, weatherForecast, location))
        }
    }
}

export const setLocationByName = (location) => {
    return async (dispatch, getState) => {
        const weather = getState().weather;
        const currentTimestamp = Math.floor(Date.now() / 1000);  // convert to seconds
        const lastUpdated = Math.floor(weather.lastUpdated / 1000);  // convert to seconds
        if (weather.location === null ||
            weather.location.country !== location.country ||
            weather.location.city !== location.city ||
            (weather.lastUpdated !== null && ((currentTimestamp - lastUpdated) > 600))) {
            let { lon, lat } = await locationService.getLocation(location.city, location.country);
            let currentWeather = await weatherService.getCurrentWeatherByCoords(lon, lat);
            let weatherForecast = await weatherService.getForecastWeatherByCoords(lon, lat);
            location["lon"] = lon;
            location["lat"] = lat;
            dispatch(setWeather(currentWeather, weatherForecast, location));
        }
    }
}

export const getCapitalsData = (continent) => {
    return async (dispatch, getState) => {
        const weather = getState().weather;
        if (weather.continent !== continent) {
            let capitalsData = await weatherService.getCapitalsWeather(continent);
            dispatch(setCapitalsData(continent, capitalsData));
        }
    }
}

export default actions;