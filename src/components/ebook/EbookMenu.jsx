/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-23 13:47:46 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 10:25:53
 */
import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators } from 'store/book';
import EbookSettingFont from 'components/ebook/EbookSettingFont';
import EbookSettingFontPopup from 'components/ebook/EbookSettingFontPopup';
import EbookSettingTheme from 'components/ebook/EbookSettingTheme';
import EbookSettingProgress from 'components/ebook/EbookSettingProgress';
import EbookSlide from 'components/ebook/EbookSlide';




function EbookMenu() {
  const menuVisible = useSelector(state => state.book.menuVisible);
  const settingVisible = useSelector(state => state.book.settingVisible);
  const dispath = useDispatch();

  const showSetting = (key) => {
    dispath(actionCreators.setSettingVisible(key));

  }
  return menuVisible
         ? <div >
            <div className={!menuVisible || settingVisible >= 0 ? 'hide-box-shadow menu-wrapper' : "menu-wrapper"}>
              <div className="icon-wrapper">
                <span className="icon-menu" onClick={() => showSetting(3)}></span>
              </div>
              <div className="icon-wrapper">
                <span className="icon-progress" onClick={() => showSetting(2)}></span>
              </div>
              <div className="icon-wrapper">
                <span className="icon-bright" onClick={() => showSetting(1)}></span>
              </div>
              <div className="icon-wrapper">
                <span className="icon-A" onClick={() => showSetting(0)}></span>
              </div>
            </div>
            <EbookSettingFont />
            <EbookSettingFontPopup />
            <EbookSettingTheme />
            <EbookSettingProgress />
            <EbookSlide />
          </div>
        : null;
}

export default EbookMenu;
