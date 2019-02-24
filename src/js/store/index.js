import { 
    applyMiddleware, 
    combineReducers, 
    createStore,
    compose
} from 'redux';
import Thunk from 'redux-thunk';
import { middleware as reduxPack } from 'redux-pack';
import * as reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ ...reducers });
const middlewares = [Thunk, reduxPack];
const middleware = applyMiddleware(...middlewares);
const config = (process.env.NODE_ENV === 'development') ? composeEnhancers(middleware) : middleware;
const store = createStore(rootReducer, config);

/**
 * 
 */
if (module.hot) {
    module.hot.accept([
        './reducers'
    ], () => {
        const NewReducers = require('./reducers');
        const NewRootReducer = combineReducers({ ...NewReducers });
        store.replaceReducer(NewRootReducer);
    });
}

export default store;