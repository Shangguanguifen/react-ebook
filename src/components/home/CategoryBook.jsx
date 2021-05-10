/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-03 14:57:08 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-05 16:19:53
 */
import React from 'react';
import PropTypes from 'prop-types';
import { createHashHistory } from 'history';

import { showBookDetail } from 'util/mixin'
import { categoryText, getCategoryName } from 'util/store'
import Title from 'components/common/Title';


// 分类
function CategoryBook(props) {
  const { data } = props;
  const history = createHashHistory();

  const handleClick = () => {
    history.push(`/store/list/${getCategoryName(data.category)}/${categoryText(data.category)}`);
  }

  return (
    <div className="category-book">
      <Title label={categoryText(data.category)} btn={'查看全部'} handleClick={handleClick}></Title>
      <div className="category-book-list">
        {
          data.list.map(item => {
            return (
              <div className="category-book-item" key={item.bookId} onClick={() => showBookDetail(item)}>
                <div className="img-wrapper">
                  <img className="img" src={item.cover} alt='' />
                </div>
                <div className="content-wrapper">
                  <div className="title title-small" >{item.title}</div>
                  <div className="num sub-title-tiny" >{item.author}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

CategoryBook.propTypes = {
  data: PropTypes.object
}

CategoryBook.defaultProps = {
  data: {
    category: null,
    list: []
  }
}


export default CategoryBook;
