import { combineReducers } from 'redux';
import { reducer as bookReducer } from './book'
import { reducer as homeReducer } from './home'
import { reducer as shelfReducer } from './shelf'


const reducer  = combineReducers({
  book: bookReducer,
  home : homeReducer,
  shelf: shelfReducer
})

export default reducer;