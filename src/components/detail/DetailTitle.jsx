/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-03 16:16:19 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-05 15:56:01
 */
import { createHashHistory } from 'history'
import PropTypes from 'prop-types';

import './index.scss';


function DetailTitle(props) {
  const { title, showShelf, handleBack, ifHideShadow } = props;
  // 默认没有阴影
  
  const onBack = () => {
    handleBack()
  }

  const onShowBookShelf = () => {
    const history = createHashHistory();
    history.push('/store/shelf');
  }
  return (
    <div className="detail-title-wrapper" style={ifHideShadow ? {boxShadow: 'none'} : null}>
      <div className="title-left-wrapper" onClick={onBack}>
        <span className="icon-back"></span>
      </div>
      <div className="title-right-wrapper">
        {
          showShelf 
            ? <span className="icon-shelf icon" onClick={onShowBookShelf}></span>
            : <span className="icon-share"></span>
        }
      </div>
      {
        title ? <div className="title-text">{title}</div> : null
      }
    </div>
  );
}

DetailTitle.propTypes = {
  title: PropTypes.string,
  showShelf: PropTypes.bool,
  handleBack: PropTypes.func,
  ifHideShadow: PropTypes.bool
  
}
DetailTitle.defaultProps = {
  title: '',
  showShelf: false,
  handleBack: null,
  ifHideShadow: true
}


export default DetailTitle;
