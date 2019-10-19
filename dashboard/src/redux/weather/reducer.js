import actions from "./actions";

const initialState = {
    userLocation: null,
    location: null,
    currentWeather: null,
    weatherForecast: null,
    lastUpdated: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_USER_LOCATION:
            return Object.assign({}, state, {
                userLocation: action.userLocation
            })
        case actions.SET_WEATHER:
            return Object.assign({}, state, {
                currentWeather: action.currentWeather,
                weatherForecast: action.weatherForecast,
                location: action.location,
                lastUpdated: Date.now()
            })
        default:
            return state;
    }
}

export default reducer;