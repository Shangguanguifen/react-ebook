/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-06 13:21:35 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-06 20:47:23
 */
import * as actionTypes from './actionTypes'

const defaultState = {
  isEditMode: false, //是否进入编辑模式
  shelfList: [], //书架图书列表
  shelfSelected: [],  //书架图书选中要删除的图书
  shelfTitleVisible: true, //书架标题的显示状态
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  const newState = state
  switch(action.type) {
    case actionTypes.SET_IS_EDIT_MODE:
      newState.isEditMode = action.isEditMode;
      break;
    case actionTypes.SET_SHELF_LIST:
      newState.shelfList = action.shelfList;
      break;
    case actionTypes.SET_SHELF_SELECTED:
      newState.shelfSelected = action.shelfSelected;
      break;
    default:
      return newState;
  }

  return newState;
}