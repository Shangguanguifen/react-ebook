/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-30 19:45:28 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-04 17:49:54
 */
import * as actionTypes from './actionTypes';

export const setHotSearchOffsetY = (hotSearchOffsetY) => ({
  type: actionTypes.SET_HOT_SEARCH_OFFSETY,
  hotSearchOffsetY
})

export const setFlapCardVisible = (flapCardVisible) => ({
  type: actionTypes.SET_FLAP_CARD_VISIBLE,
  flapCardVisible
})

export const setOffsetY = (offsetY) => ({
  type: actionTypes.SET_OFFSETY,
  offsetY
})