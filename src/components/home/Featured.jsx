/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-02 19:43:14 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 15:05:39
 */
import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { showBookDetail } from 'util/mixin';
import { categoryText } from 'util/store';
import Title from 'components/common/Title';

// 精选
function Featured(props) {
  const { data, titleText, btnText } = props;
  return data && data.length > 0 
    ? <div className="featured">
        <Title label={titleText} btn={btnText}></Title>
        <div className="featured-list">
          <div className="featured-item-wrapper">
            {
              data.map(item => {
                return (
                  <div className="featured-item" key={item.id} onClick={() => showBookDetail(item)}>
                    <div className="img-wrapper">
                      <img className="img" src={item.cover} alt='' />
                    </div>
                    <div className="content-wrapper">
                      <div className="title title-small">{item.title}</div>
                      <div className="author sub-title-tiny">{item.author}</div>
                      <div className="category third-title-tiny">{categoryText(item.category)}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    : null
}

Featured.propTypes = {
  data: PropTypes.array,
  titleText: PropTypes.string,
  btnText: PropTypes.string,
}

Featured.defaultProps = {
  data: [],
  titleText: '',
  btnText: ''
}


export default Featured;
