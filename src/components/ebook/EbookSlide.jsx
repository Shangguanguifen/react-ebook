/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-26 11:11:13 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-04-29 21:16:46
 */
import React, { useState } from 'react';
import { useSelector } from "react-redux";

import { useHideTitleAndMenu } from 'util/mixin';
import EbookSlideContents from 'components/ebook/EbookSlideContents';
import EbookSlideBookmark from 'components/ebook/EbookSlideBookmark';
import EbookLoading from 'components/ebook/EbookLoading';


function EbookSlide() {
  const menuVisible = useSelector(state => state.book.menuVisible);
  const settingVisible = useSelector(state => state.book.settingVisible);
  const bookAvailable = useSelector(state => state.book.bookAvailable);
  // const bookAvailable = false;
  const [currentTable, setCurrentTable] = useState(1);
  const hideTitleAndMenu = useHideTitleAndMenu();

  const onHideTitleAndMenu = () => {
    hideTitleAndMenu();
  }

  const onSelectTab = (index) => {
    setCurrentTable(index);
  }

  return menuVisible && settingVisible === 3
  ? <div>
      <div className="slide-content-wrapper">
        <div className="content">
          {
            bookAvailable
            ?  <div className="content-page-wrapper">
                <div className="content-page">
                  {
                    currentTable === 1 ? <EbookSlideContents /> : <EbookSlideBookmark />
                  }
                </div>
                <div className="content-page-tab">
                  <div
                    className={currentTable === 1 ? 'content-page-tab-item selected' : 'content-page-tab-item'}
                    onClick={() => onSelectTab(1)}>目录</div>
                  <div
                    className={currentTable === 2 ? 'content-page-tab-item selected' : 'content-page-tab-item'}
                    onClick={() => onSelectTab(2)}>书签</div>
                </div>
              </div>
            : <div className="content-empty">
                <EbookLoading />
              </div>
          }
        </div>
        <div className="content-bg" onClick={onHideTitleAndMenu}></div>
      </div>
    </div>
  : null;
}

export default EbookSlide;
