/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-28 10:34:11 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-04-29 14:09:36
 */
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'

import './index.scss';

import EbookReader from 'components/ebook/EbookReader';
import EbookTitle from 'components/ebook/EbookTitle';
import EbookMenu from 'components/ebook/EbookMenu';
import EbookBookmark from 'components/ebook/EbookBookmark';
import EbookHeader from 'components/ebook/EbookHeader';
import EbookFooter from 'components/ebook/EbookFooter';


function Book() {
  const offsetY = useSelector(state => state.book.offsetY);
  const menuVisible = useSelector(state => state.book.menuVisible);
  const bookAvailable = useSelector(state => state.book.bookAvailable);
  const ebook = useRef();

  useEffect(() => {
    if(!menuVisible && bookAvailable) {
      if(offsetY > 0) {
        move(offsetY);
      } else if(offsetY === 0) {
        restore(0);
      }
    }
  }, [bookAvailable, menuVisible, offsetY])

  const move = (y) => {
    ebook.current.style.top = y + 'px';
  }

  const restore = (y) => {
    ebook.current.style.top = y + 'px';
    ebook.current.style.transition = 'all 0.2s linear';
    setTimeout(() => {
      ebook.current.style.transition = '';
    }, 200)
  }
  return (
    <div className="ebook" ref={ebook}>
      <EbookHeader />
      <EbookTitle />
      <EbookReader />
      <EbookMenu />
      <EbookBookmark />
      <EbookFooter />
    </div>
  );
}

export default Book;
