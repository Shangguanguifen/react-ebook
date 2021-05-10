/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-03 16:15:47 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-04 21:03:48
 */
import React, { useEffect, useState,  } from 'react';
import PropTypes from 'prop-types';

// 弹窗
function Toast(props, ref) {
  const { text, timeout } = props;
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    setVisible(true);
    const task = setTimeout(() => {
      setVisible(false);
    }, timeout) 
    return () => {
      clearTimeout(task);
    }
  }, [timeout])
  return visible
    ? <div className="fade-in">
        <div className="toast-bg" v-show="visible">
          <div className="toast-wrapper">
            <div className="toast" dangerouslySetInnerHTML={{__html: text}}></div>
          </div>
        </div>
      </div>
    : null
}

Toast.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  timeout: PropTypes.number,  
}
Toast.defaultProps = {
  text: '',
  timeout: 2000,
}


export default Toast;
