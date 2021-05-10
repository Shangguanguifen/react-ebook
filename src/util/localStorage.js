/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-24 08:35:34 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-04 18:10:31
 */
//可在JSON和对象指向自由转换
// WebStorageCache 对HTML5 localStorage 和sessionStorage 进行了扩展，添加了超时时间，序列化方法。可以直接存储json对象，同时可以非常简单的进行超时时间的设置。
// 优化：WebStorageCache自动清除访问的过期数据，避免了过期数据的累积。另外也提供了清除全部过期数据的方法：wsCache.deleteAllExpires();

import Storage from 'web-storage-cache';

const localStorage = new Storage();

export function setLocalStorage(key, value) {
  return localStorage.set(key, value);
}

export function getLocalStorage(key) {
  return localStorage.get(key);
}

export function removeLocalStorage(key) {
  return localStorage.delete(key);
}

export function clearLocalStorage() {
  return localStorage.clear();
}
//
export function setBookObject(fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`);
  if (!book) {
    book = {};
  }
  book[key] = value;
  setLocalStorage(`${fileName}-info`, book);
}

export function getBookObject(fileName, key) {
  let book = getLocalStorage(`${fileName}-info`);
  if (book) {
    return book[key];
  } else {
    return null;
  }
}
//
export function getFontFamily(fileName) {
  return getBookObject(fileName, 'fontFamily');
}

export function saveFontFamily(fileName, fontFamily) {
  setBookObject(fileName, 'fontFamily', fontFamily);
}
//
export function getFontSize(fileName) {
  return getBookObject(fileName, 'fontSize');
}

export function saveFontSize(fileName, fontSize) {
  setBookObject(fileName, 'fontSize', fontSize);
}

export function getTheme(fileName) {
  return getBookObject(fileName, 'theme');
}

export function saveTheme(fileName, theme) {
  setBookObject(fileName, 'theme', theme);
}

export function getProgress(fileName) {
  return getBookObject(fileName, 'progress');
}

export function saveProgress(fileName, progress) {
  setBookObject(fileName, 'progress', progress);
}

// 当前电子书的阅读进度
export function getLocation(fileName) {
  return getBookObject(fileName, 'location');
}

export function saveLocation(fileName, location) {
  setBookObject(fileName, 'location', location);
}

// 阅读时间
export function getReadTime(fileName) {
  return getBookObject(fileName, 'time');
}

export function saveReadTime(fileName, theme) {
  setBookObject(fileName, 'time', theme);
}

// 书签
export function getBookmark(fileName) {
  return getBookObject(fileName, 'bookmark');
}

export function saveBookmark(fileName, bookmark) {
  setBookObject(fileName, 'bookmark', bookmark);
}

export function saveOffsetY(offsetY) {
  setLocalStorage('homeOffsetY', offsetY);
}

export function getOffsetY() {
  return getLocalStorage('homeOffsetY');
}

export function saveShelfBook(shelfBook) {
  setLocalStorage('shelfBook', shelfBook);
}

export function getShelfBook() {
  return getLocalStorage('shelfBook');
}






