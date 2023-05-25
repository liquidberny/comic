import {  applyMiddleware , compose } from 'redux' ;
import thunk from 'redux-thunk' ;
import rootReducer from './reducers/rootReducer' ;
import { sessionService } from 'redux-react-session';
import { legacy_createStore as createStore } from 'redux';


const initialState = {} ;
const middlewares = [thunk] ;

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));

sessionService.initSessionService(store);

export default store;
