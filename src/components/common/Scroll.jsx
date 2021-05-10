/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-01 11:24:40 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-05 15:18:32
 */
import { useRef, useEffect, forwardRef } from 'react';
// import PropTypes from 'prop-types';


import { realPx } from 'util/utils';
import { throttle } from 'util/mixin';
import './index.scss'

function Scroll(props, ref) {
  const { top, bottom, ifNoScroll, onScroll } = props;
  const scrollWrapper = useRef()

  const onHandleScroll = (e) => {
    const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop;
    if(onScroll) {
      onScroll(offsetY);
    }
  }

  // 刷新
  const refresh = (scrollWrapperRef) => {
    if(scrollWrapperRef) {
      scrollWrapperRef.style.height = window.innerHeight - realPx(top) - realPx(bottom) + 'px';
      scrollWrapperRef.addEventListener('scroll', onHandleScroll);
    }
  }

  useEffect(() => {
    let scrollWrapperRef = scrollWrapper.current;
    refresh(scrollWrapperRef);
    return () => {
      scrollWrapperRef.removeEventListener('scroll', onHandleScroll);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollWrapper.current])

  return (
    <div
      className={`scroll-wrapper ${props.className}`}
      style={{noScroll: ifNoScroll}}
      onScroll={throttle(onHandleScroll, 2000)}
      ref={(element) => {
        scrollWrapper.current = element;
        if(ref) {
          ref.current = {
            element,
            refresh,
          };
        }
      }}>
        {props.children}
    </div>
  );
}

// Scroll.propTypes = {
//   top: PropTypes.number,
//   bottom: PropTypes.number,
//   ifNoScroll: PropTypes.bool,
//   onScroll: PropTypes.func
// }
// Scroll.defaultProps = {
//   top: 0,
//   bottom: 0,
//   ifNoScroll: false,
//   onScroll: null
// }

export default forwardRef(Scroll);
