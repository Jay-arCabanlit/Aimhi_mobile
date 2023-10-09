import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import loginReducer from '../reducer/reducer';

const rootReducer = combineReducers({loginReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
