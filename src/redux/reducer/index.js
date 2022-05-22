import todosReducer from './todosReducer';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  todosReducer,
});

export default rootReducers;

