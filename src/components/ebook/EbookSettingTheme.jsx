/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-24 13:05:23 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 10:37:13
 */
import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";

import { themeList } from 'util/book';
import { actionCreators } from 'store/book';
import { getTheme, saveTheme } from 'util/localStorage';
import { initGlobalStyle } from 'util/mixin';



function EbookSettingTheme() {
  const fileName = useSelector(state => state.book.fileName);
  const menuVisible = useSelector(state => state.book.menuVisible);
  const settingVisible = useSelector(state => state.book.settingVisible);
  const defaultTheme = useSelector(state => state.book.defaultTheme);
  const currentBook = useSelector(state => state.book.currentBook);

  const [bookTheme, setBookTheme] = useState(() => {
    let initFontSize = getTheme(fileName);
    if(initFontSize) {
      return initFontSize;
    } else {
      return 'defaule';
    }
  });
  const dispath = useDispatch();

  // 切换主题
  const onSetTheme = (index) => {
    const theme = themeList[index];
    dispath(actionCreators.setDefaultTheme(theme.name));
    setBookTheme(theme.name);
    saveTheme(fileName, theme.name);
    initGlobalStyle(theme.name)
  }
  useEffect(() => {
    currentBook.rendition.themes.select(defaultTheme);
  }, [bookTheme, currentBook.rendition.themes, defaultTheme])

  return menuVisible && settingVisible === 1
    ? <div name="slide-up">
        <div className="setting-wrapper">
          <div className="setting-theme">
            {
              themeList.map((item, index) => {
                return (
                  <div className="setting-theme-item" key={item.name} onClick={() => onSetTheme(index)}>
                    <div
                      className={item.name === defaultTheme ? "preview selected" : "preview"}
                      style={{background: item.style.body.background}}
                      >
                    </div>
                    <div className={item.name === defaultTheme ? "text selected" : "text"}>{item.alias}</div>
                  </div>)
              })
            }
          </div>
        </div>
      </div>
    : null;
}

export default EbookSettingTheme;
