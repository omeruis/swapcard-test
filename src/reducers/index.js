import { combineReducers } from 'redux';
import ArtistsReducer from './reducer-artists'
import AlbumsReducer from './reducer-albums'

const rootReducer = combineReducers({
  artists : ArtistsReducer,
  albums : AlbumsReducer,
});

export default rootReducer;
