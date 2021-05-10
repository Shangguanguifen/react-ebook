import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators } from 'store/book';
import { useGetReadTimeText, display, reflreshLocation, useHideTitleAndMenu } from 'util/mixin';
import { px2rem } from 'util/utils';
import Scroll from 'components/common/Scroll';




function EbookSlideContents() {
  const fileName = useSelector(state => state.book.fileName);
  const currentBook = useSelector(state => state.book.currentBook);
  const progress = useSelector(state => state.book.progress);
  const cover = useSelector(state => state.book.cover);
  const metadata = useSelector(state => state.book.metadata);
  const navigation = useSelector(state => state.book.navigation);
  const section = useSelector(state => state.book.section);
  const getReadTimeText = useGetReadTimeText(fileName);
  const hideTitleAndMenu = useHideTitleAndMenu();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchList, setSearchList] = useState([{
    excerpt: '请输入想要查询的关键字'
  }]);

  const dispatch = useDispatch();
  
  const onShowSearchPage = () => {
    setSearchVisible(true);
  }
  const onHdeSearchPage = () => {
    setSearchVisible(false);
  }

  // 二级以上目录进行缩进
  const ontentItemStyle = (item) => {
    return  `${px2rem(item.level * 15)}rem`;
  }

  // 点击章节跳转到对应的位置
  const displayContent = (target, highlight = false) => {
    display(currentBook, fileName, target, () => {
      hideTitleAndMenu();
      if (highlight) {
        currentBook.rendition.annotations.highlight(target)
      }
      const callbackValue = reflreshLocation(currentBook, fileName);
      const progressValue = callbackValue.currentPage;
      const sectionValue = callbackValue.section;
      dispatch(actionCreators.setProgress(progressValue));
      dispatch(actionCreators.setSection(sectionValue));
    })
  }
  const doSearch = (q) => {
    return Promise.all(
      currentBook.spine.spineItems.map(item => 
        item.load(currentBook.load.bind(currentBook))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item)))
    ).then(results => Promise.resolve([].concat.apply([], results)));
  }
  const onSearch = (e) => {
    if(e.keyCode === 13) {
      doSearch(e.target.value).then(result => {
        result.map(item => {
          item.excerpt = item.excerpt.replace(e.target.value, `<span class="content-search-text">${e.target.value}</span>`)
          return item;
        })
        setSearchList(result);

      })
    }
  }



  return (
    <div className="ebook-slide-contents">
      <div className="slide-contents-search-wrapper">
        <div className="slide-contents-search-input-wrapper">
          <div className="slide-contents-search-icon">
            <span className="icon-search"></span>
          </div>
          <input className="slide-contents-search-input"
                type="text"
                placeholder="搜索全书内容"
                onKeyUp={onSearch}
                onClick={onShowSearchPage}
                />
        </div>
        {
          searchVisible ? <div className="slide-contents-search-cancel" onClick={onHdeSearchPage}>取消</div> : null
        }
      </div>
      {
        !searchVisible
          ? <div className="slide-contents-book-wrapper" >
              <div className="slide-contents-book-img-wrapper">
                <img src={cover} alt="" className="slide-contents-book-img"/>
              </div>
              <div className="slide-contents-book-info-wrapper">
                <div className="slide-contents-book-title">
                  <span className="slide-contents-book-title-text">{metadata.title}</span>
                </div>
                <div className="slide-contents-book-author">
                  <span className="slide-contents-book-author-text">{metadata.creator}</span>
                </div>
              </div>
              <div className="slide-contents-book-progress-wrapper">
                <div className="slide-contents-book-progress">
                  <span className="progress">{progress}%</span>
                  <span className="progress-text"> 已读</span>
                </div>
                <div className="slide-contents-book-time">已读 {getReadTimeText} 分钟</div>
              </div>
            </div> : null
      }
      {
        !searchVisible
          ? <Scroll
            className="slide-contents-list"
              top={156}
              bottom={48}>
              {
                navigation.map((item, index) => {
                  return (
                    <div className="slide-contents-item" key={item.id}>
                      <span
                        className={section === index ? 'slide-contents-item-label selected' : 'slide-contents-item-label'}
                        style={{marginLeft: ontentItemStyle(item)}}
                        onClick={() => displayContent(item.href)}>
                        {item.label}
                      </span>
                      <span className="slide-contents-item-page">{item.page} %</span>
                    </div>
                  )
                })
              }
            </Scroll>
          : <Scroll
              className="slide-search-list"
              top={66}
              bottom={48}>
              {
                searchList.length ? searchList.map((item, index) => {
                  return <div
                            className="slide-search-item"
                            key={index}
                            dangerouslySetInnerHTML={{__html: item.excerpt}}
                            onClick={() => displayContent(item.cfi, true)}>
                            </div>
                }) : <div className="slide-search-item">没有与关键字相同的内容</div>
              }
            </Scroll>
      }
    </div>
  );
}

export default EbookSlideContents;
