import actions from "./actions";

const initialState = {
    location: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_LOCATION:
            return Object.assign({}, state, {
                location: action.location
            })
        default:
            return state;
    }
}

export default reducer;