import thunk from 'redux-thunk';
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import reducers from './rootReducer';

const enhancer = compose(applyMiddleware(thunk));

export default createStore(reducers, enhancer);
