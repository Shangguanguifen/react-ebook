/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-29 16:19:05 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 11:21:22
 */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createHashHistory } from 'history';
import PropTypes from 'prop-types';

import { actionCreators } from 'store/home';
import { searchList } from 'util/store'
import './index.scss';
import HotSearch from 'components/home/HotSearch';
import Scroll from 'components/common/Scroll';

function SearchBar(props) {
  const { handleRandomBook } = props;
  const offsetY = useSelector(state => state.home.offsetY);
  const hotSearchOffsetY = useSelector(state => state.home.hotSearchOffsetY);
  const [titleVisible, setTitleVisible] = useState(true);
  const [ifHideShadow, setIfHideShadow] = useState(false);
  const [hotSearchVisible, setHotSearchVisible] = useState(false);
  const [showShake, setShowShake] = useState(false);
  const history = createHashHistory();


  const dispatch = useDispatch();

  useEffect(() => {
    if(offsetY > 0) {
      setTitleVisible(false);
      setIfHideShadow(false);
    } else if(offsetY === 0) {
      setTitleVisible(true);
      setIfHideShadow(true);
    }
  }, [offsetY])

  useEffect(() => {
    if(hotSearchOffsetY > 0) {
      setIfHideShadow(false);
    }
  }, [hotSearchOffsetY])

  const onShowSearchPageAndHotSearch = () => {
    setHotSearchVisible(true);
    setTitleVisible(false);
  }

  const onBack = () => {
    if(offsetY === 0) {
      setTitleVisible(true);
      setIfHideShadow(true);
    }
    setHotSearchVisible(false);
    if(!hotSearchVisible) {
      history.push('/store/shelf');
    }
  }

  const onScroll = (offsetY) => {
    dispatch(actionCreators.setHotSearchOffsetY(offsetY))
  }

  // 推荐按钮的点击
  const onShowFlapCard = () => {
    setShowShake(true);
    setTimeout(() => {
      setShowShake(false);
      dispatch(actionCreators.setFlapCardVisible(true));
    }, 2000);
    if(handleRandomBook) {
      handleRandomBook();
    }
  }
  

  // 搜索
  const onSearch = (e) => {
    if(e.keyCode === 13) {
      history.push(`/store/list/${'search'}/${e.target.value}`);
    }
  }

  return (
    <div className="search-bar-wrapper">
      <div
        className={(!titleVisible ? "title-search-wrapper show-search" : "title-search-wrapper")}
        style={ifHideShadow ? {boxShadow: 'none'} : null}>
        
          {
            titleVisible
              ? <div className="title-search-page-wrapper">
                  <span className="title-text">书城</span>
                  <div className={showShake ? "icon-shake-wrapper shake" : "icon-shake-wrapper"}  onClick={onShowFlapCard}>
                    <span className="icon-shake icon"></span>
                  </div>
                </div>
              : null
          }
        
        <div
          className={!titleVisible ? "icon-back-wrapper show-search" : "icon-back-wrapper"}
          onClick={onBack}>
          <span className="icon-back icon"></span>
        </div>
        <div className={!titleVisible? 'search-wrapper show-search' : 'search-wrapper'}>
          <div className={!titleVisible? 'search-back-wrapper show-search' : 'search-back-wrapper'}>
            <span className={!titleVisible? 'icon-back icon show-search' : 'icon-back icon'}></span>
          </div>
          <div className="search-bg">
            <span className="icon-search icon"></span>
            <input
              type="text"
              className="search"
              placeholder='计算机科学和软件工程'
              onKeyUp={onSearch}
              onClick={onShowSearchPageAndHotSearch} />
          </div>
        </div>
      </div>
      
        {
          !titleVisible && hotSearchVisible
            ? <Scroll top={54} bottom={0} onScroll={onScroll}>
                <div className="hot-search-wrapper" >
                  <HotSearch label={'热门搜索'} btn={'换一批'} hotSearch={searchList.hotSearch}></HotSearch>
                  <div className="line"></div>
                  <HotSearch label={'搜索历史'} btn={'清空'} hotSearch={searchList.historySearch}></HotSearch>
                </div>
              </Scroll>
            : null
        }
      
    </div>
  );
}

SearchBar.propTypes = {
  handleRandomBook: PropTypes.func
}

SearchBar.defaultProps = {
  handleRandomBook: null
}


export default SearchBar;
