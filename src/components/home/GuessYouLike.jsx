/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-01 14:51:41 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-12 19:34:06
 */
import React, { useMemo, useState } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

import { useShowBookDetail } from 'util/mixin'
import Title from 'components/common/Title';

function GuessYouLike(props) {
  const { data } = props;
  const showBookDetail = useShowBookDetail();

  const [index, setIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [total, setTotal] = useState(3);


  const showData = useMemo(() => {
    // 不足：猜你喜欢data.length固定，total传入了固定值3
    if(data.length) {
      return [
        data[index],
        data[index + total],
        data[index + total * 2]
      ]
    }
  }, [index, total, data])

  const resultText = (item) => {
    if(item && item.type && item.result) {
      // eslint-disable-next-line default-case
      switch (item.type) {
        case 1:
          return `与${item.result}同作者`;
        case 2:
          return `对${item.result}感兴趣的人也在读`;
        case 3:
          return `阅读${item.result}的人，${item.percent}都在读`;
      }
    }
  }

  const onChange = () => {
    if (index + 1 >= total) {
      setIndex(0);
    } else {
      let x = index;
      setIndex(++x);
    }
  }

  return (
    <div className="guess-you-like">
      <Title label={'猜你喜欢'} btn={'换一批'} handleClick={onChange}></Title>
      <div className="guess-you-like-list">
      {
        showData ? showData.map(item => {
          return item ?
            <div className="guess-you-like-item" key={item.id} onClick={() => showBookDetail(item)}>
              <div className="img-wrapper">
                <img className="img" src={item.cover} alt=''/>
              </div>
              <div className="content-wrapper">
                <div className="title title-big">{item.title}</div>
                <div className="author sub-title">{item.author}</div>
                <div className="result third-title">{resultText(item)}</div>
              </div>
            </div> : null
        }) : null
      }
      </div>
    </div>
  );
}

GuessYouLike.propTypes = {
  data: PropTypes.array
}

GuessYouLike.defaultProps = {
  data: []
}

export default withRouter(GuessYouLike);
