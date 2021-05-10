/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-02 19:27:45 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-06 09:56:03
 */
import React from 'react';
import PropTypes from 'prop-types';

import { showBookDetail } from 'util/mixin'
import Title from 'components/common/Title';

// 热门推荐
function Recommend(props) {
  const { data } = props;

  // const handleClick = () => {
  //   const history = createHashHistory();
  //   history.push('/store/list');
  // }

  return (
    <div className="recommend">
      <Title label={'热门推荐'} btn={''} ></Title>
      <div className="recommend-list">
        {
          data.map(item => {
            return (
              <div className="recommend-item" key={item.id} onClick={() => showBookDetail(item)}>
                <div className="img-wrapper">
                  <img className="img" src={item.cover} alt=''/>
                </div>
                <div className="content-wrapper">
                  <div className="title title-medium">{item.title}</div>
                  <div className="num sub-title">{item.readers}人同时在读</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

Recommend.propTypes = {
  data: PropTypes.array
}

Recommend.defaultProps = {
  data: []
}
export default Recommend;
