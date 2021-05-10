/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-30 19:45:16 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-06 13:21:39
 */
import * as actionTypes from './actionTypes'

const defaultState = {
  offsetY: 0,
  hotSearchOffsetY: 0,
  flapCardVisible: false,
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  const newState = state
  switch(action.type) {
    case actionTypes.SET_OFFSETY:
      newState.offsetY = action.offsetY;
      break;
    case actionTypes.SET_HOT_SEARCH_OFFSETY:
      newState.hotSearchOffsetY = action.hotSearchOffsetY;
      break;
    case actionTypes.SET_FLAP_CARD_VISIBLE:
      newState.flapCardVisible = action.flapCardVisible;
      break;
    default:
      return newState;
  }

  return newState;
}