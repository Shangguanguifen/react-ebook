/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-03 16:16:22 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-04 14:40:16
 */
import React from 'react';
import PropTypes from 'prop-types';

function StoreInfo(props) {
  const { cover, title, author, desc} = props;
  return (
    <div className="cover-title-wrapper">
      <div className="cover-title-left-wrapper">
        <img className="cover-img" src={cover} alt='' />
      </div>
      <div className="cover-title-right-wrapper">
        <div className="detail-cover-title-wrapper">
          <div className="cover-title-text">{title}</div>
        </div>
        <div className="cover-author-wrapper">
          <div className="cover-author-text">{author}</div>
        </div>
        <div className="detail-cover-description-wrapper">
          <div className="detail-cover-description-text">{desc}</div>
        </div>
      </div>
    </div>
  );
}

StoreInfo.propTypes = {
  cover: PropTypes.string,
  author: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string
  
}
StoreInfo.defaultProps = {
  cover: '',
  author: '',
  title: '',
  desc: ''
}



export default StoreInfo;
