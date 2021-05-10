import * as actionTypes from './actionTypes';

export const setFileName = (fileName) => ({
  type: actionTypes.SET_FILENAME,
  fileName
})

export const setMenuVisible = (show) => ({
  type: actionTypes.SET_MENU_VISIBLE,
  show
})

export const setSettingVisible = (key) => ({
  type: actionTypes.SET_SETTING_VISIBLE,
  key
})

export const setDefaultFontSize = (fontSize) => ({
  type: actionTypes.SET_DEFAULT_FONT_SIZE,
  fontSize
})

export const setCurrentBook = (currentBook) => ({
  type: actionTypes.SET_CURRENT_BOOK,
  currentBook
})

export const setDefaultFontFamily = (fontFamily) => ({
  type: actionTypes.SET_DEFAULT_FONT_FAMILY,
  fontFamily
})

export const setFontFamilyVisible = (showFontFamily) => ({
  type: actionTypes.SET_FONT_FAMILY_VISIBLE,
  showFontFamily
})

export const setDefaultTheme = (theme) => ({
  type: actionTypes.SET_DEFAULT_THEME,
  theme
})

export const setBookAvailable = (bookAvailable) => ({
  type: actionTypes.SET_BOOK_AVAILABLE,
  bookAvailable
})

export const setProgress = (progress) => ({
  type: actionTypes.SET_PROGRESS,
  progress
})

export const setSection = (section) => ({
  type: actionTypes.SET_SECTION,
  section
})

export const setSectionProgress = (sectionProgress) => ({
  type: actionTypes.SET_SECTION_PROGRESS,
  sectionProgress
})

export const setCover = (cover) => ({
  type: actionTypes.SET_COVER,
  cover
})

export const setMetadata = (metadata) => ({
  type: actionTypes.SET_METADATA,
  metadata
})

export const setNavigation = (navigation) => ({
  type: actionTypes.SET_NAVIGATION,
  navigation
})

export const setOffsetY = (offsetY) => ({
  type: actionTypes.SET_OFFSETY,
  offsetY
})

export const setIsBookmark = (isBookmark) => ({
  type: actionTypes.SET_IS_BOOKMARK,
  isBookmark
})

export const setPagelist = (pagelist) => ({
  type: actionTypes.SET_PAGELIST,
  pagelist
})