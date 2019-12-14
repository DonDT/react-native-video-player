import {combineReducers} from 'redux';
import Videos from './VideosPlayedReducer';

const rootReducer = combineReducers({
  Videos,
});

export default rootReducer;
