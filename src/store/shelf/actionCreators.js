/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-06 13:31:35 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-06 21:17:59
 */
import * as actionTypes from './actionTypes';


export const setIsEditMode = (isEditMode) => ({
  type: actionTypes.SET_IS_EDIT_MODE,
  isEditMode
})

export const setShelfList = (shelfList) => ({
  type: actionTypes.SET_SHELF_LIST,
  shelfList
})

export const setShelfSelected = (shelfSelected) => ({
  type: actionTypes.SET_SHELF_SELECTED,
  shelfSelected
})