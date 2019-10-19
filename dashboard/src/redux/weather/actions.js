/*
 * action types
 */

const actions = {
    SET_LOCATION: 'SET_LOCATION'
};

/*
 * action creators
 */

export const setLocation = (lon, lat) => {
    return {
        type: actions.SET_LOCATION,
        location: { lon, lat }
    }
}

export default actions;