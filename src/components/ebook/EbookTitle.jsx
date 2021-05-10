/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-23 13:47:56 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 10:38:13
 */
import React from 'react';
import { useSelector } from "react-redux";
import { createHashHistory } from 'history';


function EbookTitle() {
  const menuVisible = useSelector(state => state.book.menuVisible);



  const handleBack = () => {
    const history = createHashHistory();
    history.goBack();
  }
  return menuVisible ? <div name="slide-down">
      <div className="title-wrapper" v-show="menuVisible">
        <div className="left" onClick={handleBack}>
          <span className="icon-back"></span>
        </div>
        <div className="right">
          <div className="icon-wrapper">
            <span className="icon-shelf"></span>
          </div>
          <div className="icon-wrapper">
            <span className="icon-cart"></span>
          </div>
          <div className="icon-wrapper">
            <span className="icon-more"></span>
          </div>
        </div>
    </div>
  </div> : null;
}

export default EbookTitle;
