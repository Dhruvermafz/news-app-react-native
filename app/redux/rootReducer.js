import {combineReducers} from 'redux';
import {reducer as homeReducer} from '../modules/home';
const rootReducer = combineReducers({homeReducer});

export default rootReducer;
