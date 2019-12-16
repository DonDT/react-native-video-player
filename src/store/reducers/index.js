import {combineReducers} from 'redux';
import Indexes from './VideosPlayedReducer';
import LolIndexes from './LolChannelReducer';

const rootReducer = combineReducers({
  Indexes,
  LolIndexes,
});

export default rootReducer;
