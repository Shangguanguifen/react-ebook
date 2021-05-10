/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-23 11:49:45 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-04-25 13:19:39
 */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";


import { FONT_SIZE_LIST } from 'util/book';
import { actionCreators } from 'store/book';
import { getFontSize, saveFontSize } from 'util/localStorage';



function EbookSettingFont() {
  const fileName = useSelector(state => state.book.fileName);
  const menuVisible = useSelector(state => state.book.menuVisible);
  const settingVisible = useSelector(state => state.book.settingVisible);
  const defaultFontSize = useSelector(state => state.book.defaultFontSize);
  const currentBook = useSelector(state => state.book.currentBook);
  const defaultFontFamily = useSelector(state => state.book.defaultFontFamily);
  const dispatch = useDispatch();
  const [bookFontSize, setBookFontSize] = useState(() => {
    let initFontSize = getFontSize(fileName);
    if(initFontSize) {
      return initFontSize;
    } else {
      return 16;
    }
  });
  
  const fontSizeList = FONT_SIZE_LIST;

  // 改变字号
  const onSetFontSize = (fontSize) => {
    dispatch(actionCreators.setDefaultFontSize(fontSize));
    saveFontSize(fileName, fontSize);
    setBookFontSize(fontSize);
  }

  useEffect(() => {
    currentBook.rendition.themes.fontSize(bookFontSize + 'px');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookFontSize])

  const onShowFontFamilyPopup = () => {
    dispatch(actionCreators.setFontFamilyVisible(true));
  }

  return menuVisible && settingVisible === 0 ? <div name="slide-up">
    <div className="setting-wrapper">
      <div className="setting-font-size">
        <div className="preview" style={{fontSize: fontSizeList[0].fontSize + 'px'}}>A</div>
        <div className="select">
          {
            fontSizeList.map((item, index) => {
              return <div className="select-wrapper" key={index} onClick={() => onSetFontSize(item.fontSize)}>
                <div className="line"></div>
                <div className="point-wrapper">
                  {
                    defaultFontSize === item.fontSize 
                      ? <div className="point">
                          <div className="small-point"></div>
                        </div>
                      : null
                  }
                </div>
                <div className="line"></div>
              </div>
            })
          }
        </div>
        <div className="preview" style={{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}}>A</div>
      </div>
      <div className="setting-font-family" onClick={onShowFontFamilyPopup}>
        <div className="setting-font-family-text-wrapper">
          <span className="setting-font-family-text">{defaultFontFamily}</span>
        </div>
        <div className="setting-font-family-icon-wrapper">
          <span className="icon-forward"></span>
        </div>
      </div>
    </div>
  </div>: null;
}

export default EbookSettingFont;
