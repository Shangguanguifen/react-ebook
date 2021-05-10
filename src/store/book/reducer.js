/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-28 10:32:51 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-03 20:48:20
 */
/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from './actionTypes'

const defaultState = {
  fileName: '',
  currentBook: null,
  menuVisible: false,
  settingVisible: -1, //-1: 不显示， 0：字号， 1：主题， 2：进度条， 3：目录
  defaultFontSize: 16,
  defaultFontFamily: 'Default',
  fontFamilyVisible: false,
  defaultTheme: 'Default',
  bookAvailable: false, //书本是否解析完毕
  progress: 0,  //书籍阅读进度
  sectionProgress: 0,
  section: 0, //章节
  isPaginating: true,
  navigation: null, //目录信息
  cover: null,  //电子书封面
  metadata: null, //书籍信息
  paginate: '',
  pagelist: null,
  offsetY: 0, //下滑高度--显示标签
  isBookmark: null //是否标注了书签
}
export default (state = defaultState, action) => {
  const newState = state

  switch(action.type) {
    case actionTypes.SET_FILENAME:
      newState.fileName = action.fileName;
      break;
    case actionTypes.SET_MENU_VISIBLE:
      newState.menuVisible = action.show;
      break;
    case actionTypes.SET_SETTING_VISIBLE:
      newState.settingVisible = action.key;
      break;
    case actionTypes.SET_DEFAULT_FONT_SIZE:
      newState.defaultFontSize = action.fontSize;
      break;
    case actionTypes.SET_CURRENT_BOOK:
      newState.currentBook = action.currentBook;
      break;
    case actionTypes.SET_DEFAULT_FONT_FAMILY:
      newState.defaultFontFamily = action.fontFamily;
      break;
    case actionTypes.SET_FONT_FAMILY_VISIBLE:
      newState.fontFamilyVisible = action.showFontFamily;
      break;
    case actionTypes.SET_DEFAULT_THEME:
      newState.defaultTheme = action.theme;
      break;
    case actionTypes.SET_BOOK_AVAILABLE:
      newState.bookAvailable = action.bookAvailable;
      break;
    case actionTypes.SET_PROGRESS:
      newState.progress = action.progress;
      break;
    case actionTypes.SET_SECTION:
      newState.section = action.section;
      break;
    case actionTypes.SET_SECTION_PROGRESS:
      newState.sectionProgress = action.sectionProgress;
      break;
    case actionTypes.SET_COVER:
      newState.cover = action.cover;
      break;
    case actionTypes.SET_METADATA:
      newState.metadata = action.metadata;
      break;
    case actionTypes.SET_NAVIGATION:
      newState.navigation = action.navigation;
      break;
    case actionTypes.SET_OFFSETY:
      newState.offsetY = action.offsetY;
      break;
    case actionTypes.SET_IS_BOOKMARK:
      newState.isBookmark = action.isBookmark;
      break;
    case actionTypes.SET_PAGELIST:
      newState.pagelist = action.pagelist;
      break;
    default:
      return newState;
  }

  return newState;
}