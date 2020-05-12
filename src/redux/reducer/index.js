import {combineReducers} from 'redux';
import note from './note_reducer';

const rootReducer = combineReducers({
  note,
});

export default rootReducer;
