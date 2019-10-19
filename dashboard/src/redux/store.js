import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import reducers from './reducers';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, routeMiddleware];

// https://github.com/zalmoxisus/redux-devtools-extension
// To use with Redux dev tool
const composeEnhancers =
    typeof window === 'object' &&
        process.env.NODE_ENV !== "production" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
)

const store = createStore(
    combineReducers({
        ...reducers,
        router: connectRouter(history),
    }),
    enhancer
);

export { store, history };