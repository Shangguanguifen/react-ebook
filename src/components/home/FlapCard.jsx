import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import { showBookDetail } from 'util/mixin';
import { actionCreators } from 'store/home';
import { categoryText } from 'util/store';


function FlapCard(props) {
  const { data } = props;
  const flapCardVisible = useSelector(state => state.home.flapCardVisible);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(actionCreators.setFlapCardVisible(false));
  }

  const onShowBookDetail = (e) => {
    showBookDetail(data);
    e.preventDefault();
  }

// 随机推荐一本书
  return flapCardVisible ? (
    <div className="flap-card-wrapper">
      <div className="book-card fade-in">
        <div className="book-card-wrapper">
          <div className="img-wrapper">
            <img className="img" src={data.cover} alt=''/>
          </div>
          <div className="content-wrapper">
            <div className="title">{data.title}</div>
            <div className="author sub-title-medium">{data.author}</div>
            <div className="category">{categoryText(data.category)}</div>
          </div>
          <div className="read-btn" onClick={onShowBookDetail}>立即阅读</div>
        </div>
      </div>
      <div className="close-btn-wrapper" onClick={onClose}>
        <span className="icon-close"></span>
      </div>
    </div>
  ) : null;
}

FlapCard.propTypes = {
  data: PropTypes.object,
}

FlapCard.defaultProps = {
  data: {},
}


export default FlapCard;
