/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-22 15:12:48 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-03 20:37:56
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {withRouter} from 'react-router-dom'
import Epub from 'epubjs';

import './index.scss';
import {actionCreators} from 'store/book';
import { 
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation,
  getReadTime,
  saveReadTime } from 'util/localStorage';
import {
  initGlobalStyle,
  useRefreshLocation,
  display,
  useHideTitleAndMenu,
  flatten,
  debouce } from 'util/mixin'
import { themeList } from 'util/book';



function EbookReader(props) {
  const fileName = useSelector(state => state.book.fileName);
  const currentBook = useSelector(state => state.book.currentBook);

  const menuVisible = useSelector(state => state.book.menuVisible);
  const defaultFontFamily = useSelector(state => state.book.defaultFontFamily);
  const defaultFontSize = useSelector(state => state.book.defaultFontSize);
  const defaultTheme = useSelector(state => state.book.defaultTheme);
  const navigation = useSelector(state => state.book.navigation);
  const [readTimeTask, setReadTimeTask] = useState(0);
  const [firstOffsetY, setFirstOffsetY] = useState(0);
  const [mouseState, setMouseState] = useState(null);
  const [mouseStartTime, setMouseStartTime] = useState(0);
  const [locationList, setLocationList] = useState(0);
  const hideTitleAndMenu = useHideTitleAndMenu();
  const reflreshLocation = useRefreshLocation();
  const dispatch = useDispatch();

  const prevPage = (currentBook, fileName) => {
    if(currentBook) {
      currentBook.rendition.prev().then(() => {
        // 更新百分比并缓存当前电子书定位
        reflreshLocation(currentBook, fileName);
      });
      hideTitleAndMenu();
    }
  }
  const nextPage = (currentBook, fileName) => {
    if(currentBook) {
      currentBook.rendition.next().then(() => {
         // 更新百分比并缓存当前电子书定位
         reflreshLocation(currentBook, fileName);
      });
      hideTitleAndMenu();
    }
  }  
  const toggleTitleAndMenu = () => {
    if(menuVisible) {
      dispatch(actionCreators.setSettingVisible(-1));
      dispatch(actionCreators.setFontFamilyVisible(false));
    }
    dispatch(actionCreators.setMenuVisible(!menuVisible));
    dispatch(actionCreators.setSettingVisible(-1));
    dispatch(actionCreators.setFontFamilyVisible(false));
  }

  /* PC端鼠标操作
   * 1 - 鼠标进入
   * 2 - 鼠标进入后的移动
   * 3 - 鼠标从移动状态松手
   * 4 - 鼠标还原 
  */
  const onMouseDown = (e) => {
    setMouseState(1);
    setMouseStartTime(e.timeStamp);
    e.preventDefault();
    e.stopPropagation();
  }

  const onMouseMove = (e) => {
    if(mouseState === 1) {
      setMouseState(2);
    } else if (mouseState === 2) {
      let offsetY = 0;
      if (firstOffsetY) {
        offsetY = e.clientY - firstOffsetY;
        dispatch(actionCreators.setOffsetY(offsetY));
      } else {
        setFirstOffsetY(e.clientY);
      }
    }
    e.preventDefault();
    e.stopPropagation();
  }

  const onMouseUp = (e) => {
    if(mouseState === 2) {
      dispatch(actionCreators.setOffsetY(0));
      setFirstOffsetY(null);
      setMouseState(3);
    } else {
      setMouseState(4);
    }
    const timer = e.timeStamp - mouseStartTime;
    if(timer < 200) {
      setMouseState(4);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  // 手势操作
  const onMackClick = (e) => {
    if (mouseState && (mouseState === 2 || mouseState === 3)) {
      return
    }
    const clientX = e.clientX;
    const width = window.innerWidth;
    if (clientX > 0 && clientX < width * 0.3) {
      prevPage(currentBook, fileName);
    } else if (clientX > 0 && clientX > width * 0.7) {
      nextPage(currentBook, fileName);
    } else {
      toggleTitleAndMenu();
    }
  }

  const onTouchMove = (e) => {
    let offsetY = 0;
    if (firstOffsetY) {
      offsetY = e.changedTouches[0].clientY - firstOffsetY;
      dispatch(actionCreators.setOffsetY(offsetY));
    } else {
      setFirstOffsetY(e.changedTouches[0].clientY);
    }
    // e.preventDefault()
    e.stopPropagation()
  }

  const onTouchEnd = (e) => {
    dispatch(actionCreators.setOffsetY(0))
    setFirstOffsetY(null);
  }


  // 初始化字体
  const initFontFamily = (currentBook, fileName) => {
    let font = getFontFamily(fileName);
      if (!font) {
        saveFontFamily(fileName, defaultFontFamily);
        currentBook.rendition.themes.font(defaultFontFamily)
      } else {
        currentBook.rendition.themes.font(font);
        dispatch(actionCreators.setDefaultFontFamily(font));
      }
  }

  // 初始化字号
  const initFontSize = (currentBook, fileName) => {
    let fontSize = getFontSize(fileName);
      if (!fontSize) {
        saveFontSize(fileName, defaultFontSize);
        currentBook.rendition.themes.fontSize(defaultFontSize + 'px');
      } else {
        currentBook.rendition.themes.fontSize(fontSize + 'px');
        dispatch(actionCreators.setDefaultFontSize(fontSize));
      }
  }
  
  // 初始化主题
  const initTheme = (currentBook, fileName) => {
    // 主题注册
    themeList.forEach(theme => {
      currentBook.rendition.themes.register(theme.name, theme.style);
    })
    let theme = getTheme(fileName);
    if(!theme) {
      saveTheme(fileName, defaultTheme);
      initGlobalStyle(defaultTheme);
      currentBook.rendition.themes.select(defaultTheme);

    } else {
      dispatch(actionCreators.setDefaultTheme(theme));
      // 设置主题
      currentBook.rendition.themes.select(theme);
      initGlobalStyle(theme);
    }
  }

  // 阅读时间的计算
  const startLoopReadTime = (fileName) => {
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
    setReadTimeTask(task)
  }
  
  // 初始化
  const initRendition = (currentBook, fileName) => {
    const rendition = currentBook.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight,
      method: 'default'
    });

    const location = getLocation(fileName);
    display(currentBook, fileName, location, () => {
      // 初始化
      initTheme(currentBook, fileName);
      initFontFamily(currentBook, fileName);
      initFontSize(currentBook, fileName);
      startLoopReadTime(fileName);
    })
    // contents对象：主要用来管理资源
    rendition.hooks.content.register(contents => {
      Promise.all([
        contents.addStylesheet('http://localhost:3000/fonts/daysOne.css'),
        contents.addStylesheet('http://localhost:3000/fonts/cabin.css'),
        contents.addStylesheet('http://localhost:3000/fonts/montserrat.css'),
        contents.addStylesheet('http://localhost:3000/fonts/tangerine.css')
      ]).then(() => {
      })
    })
  }

  // 手势操作
  /* const initGesture = (currentBook, fileName) => {
    let touchStartX, touchStartTime;
    currentBook.rendition.on('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
      touchStartTime = event.timeStamp;
    });
    currentBook.rendition.on('touchend', (event) => {
      const offsetX = event.changedTouches[0].clientX - touchStartX;
      const time = event.timeStamp - touchStartTime;

      // 判断手指状态
      if(time < 500 && offsetX > 40) {
        // 上一页
        prevPage(currentBook, fileName);
      } else if(time < 500 && offsetX < -40) {
        nextPage(currentBook, fileName);
      } else {
        toggleTitleAndMenu(currentBook)
      }

      // 禁止事件的默认事件和传播
      // event.preventDefault();
      event.stopPropagation();
    });
  } */
 

  const parseBook = (currentBook) => {
    currentBook.loaded.cover.then(cover => {
      currentBook.archive.createUrl(cover).then(url => {
        dispatch(actionCreators.setCover(url));
      });
    });
    currentBook.loaded.metadata.then(metadata => {
      dispatch(actionCreators.setMetadata(metadata));
    });
    // 目录
    currentBook.loaded.navigation.then(nav => {
      const navItem = flatten(nav.toc);
      function find(item, level = 0) {
        return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
      };
      navItem.forEach(item => {
        item.level = find(item);
      });
      dispatch(actionCreators.setNavigation(navItem));
    })
  }

  const initEpub = () => {
    const fileName = props.match.params.id.split('|').join('/')
    const url = 'http://localhost:3000/epub/' + fileName + '.epub';
    dispatch(actionCreators.setFileName(fileName));
    const book = Epub(url);
    dispatch(actionCreators.setCurrentBook(book));

    initRendition(book, fileName);
    // initGesture(book, fileName);
    parseBook(book);

    book.ready.then(() => {
      // 分页
      return book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(fileName) / 16))
    }).then(locations => {
      setLocationList(locations);
      dispatch(actionCreators.setBookAvailable(true));
      reflreshLocation(book, fileName);
    })

  }

  useEffect(() => {
    if(navigation && locationList) {
      navigation.forEach(nav => {
        nav.pagelist = [];
      })
      
      locationList.forEach((item => {
        const loc = item.match(/\[(.*)\]!/)[1];
        try{
          navigation.forEach(nav => {
            if(nav.href) {
              const href = nav.href.match(/^(.*)\.html$/)[1];
              if(href === loc) {
                nav.pagelist.push(item);
                throw Error();
              }
            }
          })
        } catch(e) {};
        // 计算出章节在哪一页
        let currentPage = 1;
        const totalPage = locationList.length;
        navigation.forEach((nav, index) => {
          //页数
          /* if (index === 0) {
            nav.page = 1
          } else {
            nav.page = currentPage
          }
          currentPage += nav.pagelist.length + 1 */
          // 百分比
          nav.page = Math.floor((currentPage / totalPage) * 100);
          currentPage += nav.pagelist.length;
        })
      }))
      dispatch(actionCreators.setPagelist(locationList));
      dispatch(actionCreators.setNavigation(navigation));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationList, navigation])
  
  useEffect(() => {
    initEpub();
    return () => {
      if(readTimeTask) {
        clearInterval(readTimeTask);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <div className="ebook-reader">
      <div id="read"></div>
      <div
        className="ebook-reader-mask"
        onClick={onMackClick}
        onTouchMove={debouce(onTouchMove, 14)}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        ></div>
    </div>
  );
}

export default withRouter(EbookReader);
