import React from 'react';
import PropTypes from 'prop-types';



function HotSearch(props) {
  const { label, btn, hotSearch } = props;
  return (
    <div>
    <div className="hot-search-title">
      <span className="label">{label}</span>
      <span className="btn">{btn}</span>
    </div>
    <div className="hot-search-list">
      {
        hotSearch.map((item, index) => {
          return (
            <div className="hot-search-item" key={index}>
              <div className="icon-wrapper">
                {
                  item.type === 1 ? <span className="icon-book icon"></span> : null
                }
                {
                  item.type === 2 ? <span className="icon-search icon"></span> : null
                }
              </div>
              <div className="hot-search-text-wrapper">
                <div className="text">{item.text}</div>
                {
                  item.num ? <div className="num">{item.num}人搜索</div> : null
                }
              </div>
            </div>
          )
        })
      }
    </div>
  </div>
  );
}

HotSearch.propTypes = {
  label: PropTypes.string,
  btn: PropTypes.string,
  hotSearch: PropTypes.array
}
HotSearch.defaultProps = {
  label: '12',
  btn: '34',
  hotSearch: []
}


export default HotSearch;
