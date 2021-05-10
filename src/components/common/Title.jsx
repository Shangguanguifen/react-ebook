/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-01 14:51:34 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 11:09:08
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  const { label, btn, handleClick } = props;

  const [ifOnTouch, setIfOnTouch] = useState(false);

  // 点击时变换颜色
  const onTouchStart = () => {
    setIfOnTouch(true);
  }
  const onTouchEnd = () => {
    setIfOnTouch(false);
  }

  const onClick = () => {
    handleClick();
  }
  
  return (
    <div className="home-title-wrapper">
      <div className="label">{label}</div>
      <div
        className="btn"
        style={ifOnTouch ? {color: 'rgba(64, 158, 255, .5)'} : null}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseUp={onTouchEnd}
        onClick={onClick}>{btn}</div>
  </div>
  );
}

Title.propTypes = {
  label: PropTypes.string,
  btn: PropTypes.string,
  click: PropTypes.func
}

Title.defaultProps = {
  label: 'label',
  btn: 'changeBtn',
  click: null
}



export default Title;
