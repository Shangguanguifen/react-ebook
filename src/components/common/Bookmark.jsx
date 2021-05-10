import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { px2rem } from 'util/utils'

import './index.scss';


function Bookmark(props) {
  const { width, height, color } = props;
  const bookmark = useRef();

  useEffect(() => {
    bookmark.current.style.borderWidth = `${px2rem(height - 5)}rem ${px2rem(width)}rem ${px2rem(8)}rem ${px2rem(width)}rem`
  }, [width, height])
  
  return <div
    className="bookmark"
    style={{borderColor: `${color} ${color} transparent ${color}`}}
    ref={bookmark}>
    </div>;
}

Bookmark.propTypes= {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
}

Bookmark.defaultProps = {
  width: 10,
  height: 35,
  color: 'White'
}

export default Bookmark;
