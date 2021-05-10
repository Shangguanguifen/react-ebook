/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-26 11:16:11 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-09 21:50:03
 */
import { useMemo } from 'react';
import { createHashHistory } from 'history';
import { useDispatch, useSelector } from 'react-redux';

import { addCss, removeAllCss } from './book';
import { getCategoryName } from './store';
import { saveLocation, getReadTime, saveReadTime, getBookmark, saveOffsetY } from 'util/localStorage';
import {actionCreators} from 'store/book';


// 动态引入样式
export function initGlobalStyle(defaultTheme) {
  removeAllCss();
  switch (defaultTheme) {
    case 'Default':
      addCss('http://localhost:3000/theme/theme_default.css');
      break;
    case 'Eye':
      addCss('http://localhost:3000/theme/theme_eye.css');
      break;
    case 'Gold':
      addCss('http://localhost:3000/theme/theme_gold.css');
      break;
    case 'Night':
      addCss('http://localhost:3000/theme/theme_night.css');
      break;
    default:
      addCss('http://localhost:3000/theme/theme_default.css');
      break;
  }
}


// 节流
export function throttle(fn, wait=500) {
  let preTime = Date.now();
  return function(...params) {
    let content = this;
    let args = params;
    let currTime = Date.now();
    if(currTime - preTime >= wait) {
      fn.apply(content, args);
      preTime = Date.now();
    }
  }
}

// 防抖
export function debouce(fn, wait=50, immediate=false) {
  let timer, content, args;
  let later = () => setTimeout(() => {
    timer = null;
    if(!immediate) {
      fn.apply(content, args);
      content = args = null;
    }
  }, wait)

  return function(...params) {
    if(!timer) {
      timer = later();
      if(immediate) {
        fn.apply(this, params);
      } else {
        content = this;
        args = params
      }
    } else {
      clearTimeout(timer);
      timer = later();
    }
  }
}

export const useRefreshLocation = () => {
  const dispatch = useDispatch();
  let callback = (currentBook, fileName) => {
    const currentLocation = currentBook.rendition && currentBook.rendition.currentLocation() ? currentBook.rendition.currentLocation() : null;
    if(currentLocation && currentLocation.start) {
      const startCfi = currentLocation.start.cfi;
      const currentProgress = currentBook.locations.percentageFromCfi(startCfi);
      saveLocation(fileName, startCfi);
      dispatch(actionCreators.setProgress(Math.floor(currentProgress * 100)));
      dispatch(actionCreators.setSection(currentLocation.start.index));
      // 进行翻页,刷新等操作时获取缓存的书签数组判断当前页是否为标签页;
      const bookmark = getBookmark(fileName);
      if (bookmark) {
        if (bookmark.some(item => item.cfi === startCfi)) {
          // 当前页为标签页
          dispatch(actionCreators.setIsBookmark(true));
        } else {
          // 当前页不是标签页
          dispatch(actionCreators.setIsBookmark(false));
        }
      } else {
        // 本书还没有做过标签
        dispatch(actionCreators.setIsBookmark(false));
      }
    }
  }
  return callback;
}

export const reflreshLocation = (currentBook, fileName) => {
  const currentLocation = currentBook.rendition && currentBook.rendition.currentLocation()?  currentBook.rendition.currentLocation() : null;
  // eslint-disable-next-line eqeqeq
  // console.log(currentLocation, currentLocation.start.cfi)
  if(currentLocation && currentLocation.start) {
    const startCfi = currentLocation.start.cfi;
    const currentProgress = currentBook.locations.percentageFromCfi(startCfi);
    saveLocation(fileName, startCfi);
    return {
      currentPage: Math.floor(currentProgress * 100),
      section: currentLocation.start.index
    }
  } else {
    return '';
  }

}

export function display(currentBook, fileName, target, cb) {
  if (target) {
    currentBook.rendition.display(target).then(() => {
      // 缓存定位信息
      reflreshLocation(currentBook, fileName);
      if (cb) cb();
    })
  } else {
    currentBook.rendition.display().then(() => {
      reflreshLocation((currentBook, fileName));
      if (cb) cb();
    })
  }
}

export function useDisplay() {
  const reflreshLocation = useRefreshLocation();
  const callback = (currentBook, fileName, target, cb) => {
    if (target) {
      currentBook.rendition.display(target).then(() => {
        // 缓存定位信息
        reflreshLocation(currentBook, fileName);
        if (cb) cb();
      })
    } else {
      currentBook.rendition.display().then(() => {
        reflreshLocation((currentBook, fileName));
        if (cb) cb();
      })
    }
  }
  return callback;
}


export const useHideTitleAndMenu = () => {
  const dispatch = useDispatch();
  const callback = () => {
    dispatch(actionCreators.setMenuVisible(false));
    dispatch(actionCreators.setSettingVisible(-1));
    dispatch(actionCreators.setFontFamilyVisible(false));
  }
  return callback;
}

// 阅读时间的计算
export const startLoopReadTime = (fileName) => {
  let readTime = getReadTime(fileName)
  if (!readTime) {
    readTime = 0
  }
  let task = setInterval(() => {
    readTime++
    if (readTime % 30 === 0) {
      saveReadTime(fileName, readTime)
    }
  }, 1000)
  return task;
}

// 获取阅读时间
export const useGetReadTimeText = (fileName) => {
  const  callback = useMemo(() => {
    const readTime = getReadTime(fileName)
      if (!readTime) {
        return 0;
      } else {
        return Math.ceil(readTime / 60);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getReadTime(fileName)])
  return callback;
}

export function flatten(array) {
  return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
}

export const showBookDetail = ( book) => {
  const history = createHashHistory();
  const categoryText = book.categoryText ? book.categoryText : getCategoryName(book.category)
  history.push(`/store/detail/${categoryText}/${book.fileName}`)
}

export const useShowBookDetail = () => {
  const offsetY = useSelector(state => state.home.offsetY);
  const callback = (book) => {
    saveOffsetY(offsetY);
    const history = createHashHistory();
    history.push(`/store/detail/${book.categoryText}/${book.fileName}`)  
  }
  return callback
}



