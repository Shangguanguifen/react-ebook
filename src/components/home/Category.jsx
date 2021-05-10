/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-04 17:40:33 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-06 15:28:22
 */
import React from 'react';
import PropTypes from 'prop-types';
import { createHashHistory } from 'history';

import { categoryText, getCategoryName } from 'util/store'
import Title from 'components/common/Title';

function Category(props) {
  const { data } = props;
  const history = createHashHistory();

  const onShowBookCategory = (item) => {
    
    history.push(`/store/list/${getCategoryName(item.category)}/${categoryText(item.category)}`);

  }
  return (
    <div className="category">
    <Title label={'分类'} btn={''} ></Title>
    <div className="category-list">
      {
        data.map(item => {
          return (
            <div className="category-item-wrapper" key={item.category} onClick={() => onShowBookCategory(item)}>
              <div className="category-item">
                <div className="content-wrapper">
                  <div className="title title-medium">{categoryText(item.category)}</div>
                  <div className="num sub-title-tiny">{item.num} 本书</div>
                </div>
                <div className="img-wrapper">
                  <div className="img-group">
                    <img className="img" src={item.img1} alt='' />
                    <img className="img2" src={item.img2} alt='' />
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  </div>
  );
}

Category.propTypes = {
  data: PropTypes.array
}

Category.defaultProps = {
  data: []
}


export default Category;
