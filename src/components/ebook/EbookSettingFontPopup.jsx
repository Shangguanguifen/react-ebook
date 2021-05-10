/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-23 13:47:25 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 10:35:20
 */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators } from 'store/book';
import { FONT_FAMILY } from 'util/book';
import { saveFontFamily, getFontFamily } from 'util/localStorage';


function EbookSettingFontPopup() {
  const fileName = useSelector(state => state.book.fileName);
  const fontFamilyVisible = useSelector(state => state.book.fontFamilyVisible);
  const defaultFontFamily = useSelector(state => state.book.defaultFontFamily);
  const currentBook = useSelector(state => state.book.currentBook);

  const [bookFontFamily, setBookFontFamily] = useState(() => {
    let initFontFamily = getFontFamily(fileName);
    if(initFontFamily) {
      return initFontFamily;
    } else {
      return 'Default';
    }
  });
  const dispath = useDispatch();

  const onHide = () => {
    dispath(actionCreators.setFontFamilyVisible(false));
  }

  const isSelected = (item) => {
    return defaultFontFamily === item.font;
  }
  const setFontFamily = (font) => {
    dispath(actionCreators.setDefaultFontFamily(font));
    saveFontFamily(fileName, font)
    setBookFontFamily(font);
  }

  useEffect(() => {
    if(bookFontFamily === 'Default') {
      currentBook.rendition.themes.font('Times New Roman');
    } else {
      currentBook.rendition.themes.font(bookFontFamily);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookFontFamily])

  let fontFamilyList = FONT_FAMILY;
  return fontFamilyVisible
    ? <div name="popup-slide-up">
        <div className="ebook-popup-list" v-show="fontFamilyVisible">
          <div className="ebook-popup-title">
            <div className="ebook-popup-title-icon" onClick={onHide}>
              <span className="icon-down2"></span>
            </div>
            <span className="ebook-popup-title-text">选择字体</span>
          </div>
          <div className="ebook-popup-list-wrapper">
            {
              fontFamilyList.map(item => {
                return <div className="ebook-popup-item" key={item.font} onClick={() => setFontFamily(item.font)}>
                  <div className={isSelected(item)? 'selected ebook-popup-item-text' : 'ebook-popup-item-text'}>{item.font}</div>
                  {
                    isSelected(item)
                      ? <div className="ebook-popup-item-check" >
                          <span className="icon-check"></span>
                        </div>
                      : null
                  }
                </div>
              })
            }
          </div>
        </div>
      </div>
  : null
}

export default EbookSettingFontPopup;
