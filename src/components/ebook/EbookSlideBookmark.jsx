import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";


import Scroll from 'components/common/Scroll';
import { getBookmark } from 'util/localStorage';
import { useHideTitleAndMenu, useDisplay } from 'util/mixin';



function EbookSlideBookmark() {
  const fileName = useSelector(state => state.book.fileName);
  const currentBook = useSelector(state => state.book.currentBook);
  const hideTitleAndMenu = useHideTitleAndMenu();
  const display = useDisplay();
  const [bookmark, setBookmark] = useState([]);

  const displayBookmark = (target) => {
    display(currentBook, fileName, target, () => {
      hideTitleAndMenu();
    })
  }

  useEffect(() => {
    setBookmark(getBookmark(fileName));
  }, [fileName])
  return (
    <div className="ebook-slide-bookmark">
      <div className="slide-bookmark-title">书签 · {bookmark ? bookmark.length : 0}</div>
      <Scroll
        className="slide-bookmark-list"
        top={48}
        bottom={48}>
        {
          bookmark && bookmark.length > 0 ? bookmark.map(((item, index) => {
            return (
              <div
              className="slide-bookmark-item"
              key={index}
              onClick={() => displayBookmark(item.cfi)}>
                <div className="slide-bookmark-item-icon">
                  <div className="icon-bookmark"></div>
                </div>
                <div className="slide-bookmark-item-text">{item.text}</div>
              </div>
            )
          })) : null
        }
      </Scroll>
    </div>
  );
}

export default EbookSlideBookmark;
