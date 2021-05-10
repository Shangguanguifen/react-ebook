import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators } from 'store/book';
import { realPx } from 'util/utils'
import { getBookmark, saveBookmark } from 'util/localStorage';


import Bookmark from 'components/common/Bookmark';


const BLUE = '#346cbc';
const WHITE = '#fff';
function EbookBookmark() {
  const fileName = useSelector(state => state.book.fileName);
  const currentBook = useSelector(state => state.book.currentBook);
  const offsetY = useSelector(state => state.book.offsetY);
  const isBookmark = useSelector(state => state.book.isBookmark);
  const bookAvailable = useSelector(state => state.book.bookAvailable);
  const menuVisible = useSelector(state => state.book.menuVisible);
  const [text, setText] = useState('下拉添加书签');
  const [color, setColor] = useState(WHITE);
  const [isFixed, setIsFixed] = useState(false);
  const bookmark = useRef();
  const iconDown = useRef();
  const dispatch = useDispatch();
  const height = realPx(35);
  const threshold = realPx(55);

  useEffect(() => {
    // 当分页还没有完成或是显示菜单时直接返回;
    if(!bookAvailable || menuVisible) {
      return;
    }
    if(offsetY >= height && offsetY < threshold) {
      // 状态2
      beforeThreshold(offsetY);
    } else if(offsetY >= threshold) {
      // 状态3
      afterThreshold(offsetY);
    } else if(offsetY > 0 && offsetY < height) {
      // 状态1
      beforeHeight();
    } else if(offsetY === 0) {
      restore();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetY])

  useEffect(() => {
    setIsFixed(isBookmark);
    if(isBookmark) {
      setColor(BLUE);
    } else {
      setColor(WHITE);
    }
  }, [isBookmark])

    // 状态4：归位
  const restore = () => {
    setTimeout(() => {
      bookmark.current.style.top = `${-height}px`;
      iconDown.current.style.transform = 'rotate(0deg)';
    }, 200)
    if(isFixed){
      dispatch(actionCreators.setIsBookmark(true));
      addBookmark();
    } else {
      dispatch(actionCreators.setIsBookmark(false));
      removeBookmark();
    }
  }

  // 状态1：未超过书签的高度
  const beforeHeight = () => {
    if (isBookmark) {
      setText('下拉删除书签');
      setColor(BLUE);
      setIsFixed(true);
    } else {
      setText('下拉添加书签');
      setColor(WHITE);
      setIsFixed(false);
    }
  }

  // 状态2：未到达零界状态
  const beforeThreshold = (v) => {
    bookmark.current.style.top = `${-v}px`
    beforeHeight()
    if (iconDown.current.style.transform === 'rotate(180deg)') {
      iconDown.current.style.transform = 'rotate(0deg)'
    }
  }
  
  // 状态3：超越零界状态
  const afterThreshold = (v) => {
    bookmark.current.style.top = `${-v}px`;
    if (isBookmark) {
      setText('松手删除书签');
      setColor(WHITE);
      setIsFixed(false);
    } else {
      setText('松手添加书签');
      setColor(BLUE);
      setIsFixed(true);
    }
    if (iconDown.current.style.transform === '' ||
      iconDown.current.style.transform === 'rotate(0deg)') {
      iconDown.current.style.transform = 'rotate(180deg)'
    }
  }

  // 添加书签缓存定位和文本信息
  const addBookmark = () => {
    let bookmark = getBookmark(fileName);
    if (!bookmark) {
      bookmark = [];
    }
    const currentLocation = currentBook.rendition.currentLocation()
    const cfibase = currentLocation.start.cfi.replace(/!.*/, '')
    const cfistart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)$/, '')
    const cfiend = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)$/, '')
    const cfirange = `${cfibase}!,${cfistart},${cfiend})`
    currentBook.getRange(cfirange).then(range => {
      const text = range.toString().replace(/\s\s/g, '')
      bookmark.push({
        cfi: currentLocation.start.cfi,
        text: text
      })
      saveBookmark(fileName, bookmark)
    })
  }

  const removeBookmark = () => {
    const currentLocation = currentBook.rendition.currentLocation();
    const cfi = currentLocation.start.cfi;
    let bookmark = getBookmark(fileName);
    if (bookmark) {
      // 过滤
      saveBookmark(fileName, bookmark.filter(item => item.cfi !== cfi));
      dispatch(actionCreators.setIsBookmark(false));
    }
  }
  return (
    <div className="ebook-bookmark" ref={bookmark}>
      <div className="ebook-bookmark-text-wrapper">
        <div className="ebook-bookmark-down-wrapper" ref={iconDown}>
          <span className="icon-down"></span>
        </div>
        <div className="ebook-bookmark-text">{text}</div>
      </div>
      <div
        className="ebook-bookmark-icon-wrapper"
        style={
          isFixed
          ? {position: 'fixed', top: 0, right: 0}
          : {} }>
        <Bookmark color={color} />
      </div>
    </div>
  );
}

export default EbookBookmark;
