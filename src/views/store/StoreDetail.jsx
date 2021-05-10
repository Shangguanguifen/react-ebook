/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-03 16:16:29 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 15:04:01
 */
import { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch } from "react-redux";
import Epub from 'epubjs';

import './index.scss'

import { actionCreators } from 'store/home';
import { detail } from 'api/store';
import { px2rem, realPx } from 'util/utils';
import { getShelfBook, saveShelfBook } from 'util/localStorage';

import DetailTitle from 'components/detail/DetailTitle';
import StoreInfo from 'components/detail/StoreInfo';
import Scroll from 'components/common/Scroll';
import Toast from 'components/common/Toast';



function StoreDetail(props) {
  const dispatch = useDispatch();

  const [shelfList, setShelfList] = useState(getShelfBook())
  const [currentBook, setCurrentBook] = useState(null);
  const [cover, setCover] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [categoryText, setCategoryText] = useState('');
  const [toastText, setToastText] = useState('');  //弹窗文本
  const [toastVisible, setToastVisible] = useState(false);  //是否出现弹窗
  const [navigation, setNavigation] = useState(null);  //目录
  // const [inBookShelf, setInBookShelf] = useState(null);  //是否加入书架
  const [displayed, setDisplayed] = useState(false);  
  const [description, setDescription] = useState(''); 
  const [ifHideShadow, setIfHideShadow] = useState(true);

  const preview = useRef();
  const scroll = useRef();
  // const [book, setBook] = useState(null);

  const data = useMemo(() => {
    if(metadata) {
      return {
        lang: metadata.language,
        isbn: metadata.identifier,
        publisher: metadata.publisher,
        title: metadata.title,
        author: metadata.creator
      }
    } else {
      return {
        lang: '-',
        isbn: '-',
        publisher: '-',
        title: '',
        author: ''
      }
    }
  }, [metadata])

  const desc = useMemo(() => {
    if(description) {
      return description.substring(0,100);
    } else {
      return '';
    }
  }, [description])

  // 该本数是否在书架中
  const inBookShelf = useMemo(() => {
    if(shelfList && currentBook) {
      const filterArr = shelfList.filter(item => item.fileName === currentBook.fileName);
      if(filterArr.length > 0) {
        return true;
      } else {
        return false
      }
    } else {
      return false;
    }
  }, [currentBook, shelfList])


  const daFlatNavigation = (content, deep = 1) => {
    const arr = [];    
    content.forEach(item => {
      item.deep = deep
      arr.push(item);
      if(item.subitems && item.subitems.length > 0) {
        arr.push(daFlatNavigation(item.subitems, deep + 1));
      }
    });
    return arr
  }
  
  const flatNavigation = useMemo(() => {
    if(navigation) {
      return Array.prototype.concat.apply([], Array.prototype.concat.apply([], daFlatNavigation(navigation.toc)));
    } else {
      return [];
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])




  const parseBook = (blob) => {
    let book = new Epub(blob);
    book.loaded.metadata.then(metadata => {
      setMetadata(metadata);
    });
    book.loaded.navigation.then(nav => {
      setNavigation(nav);
      if(nav.toc && nav.toc.length > 1) {
        display(book, nav.toc[1].href).then(section => {
          if(scroll.current) {
            scroll.current.refresh();
          }
          setDisplayed(true);
          const reg = new RegExp('<.+?>', 'g');
          const text = section.output.replace(reg, '').replace(/\s\s/g, '');
          setDescription(text);
        }).catch(err => {
          
        })
      }
    })
  }

  const display = (book, location) => {
    if(preview.current) {
      let rendition = book.renderTo('preview', {
        width: window.innerWidth > 640 ? 640 : window.innerWidth,
        height: window.innerHeight,
        method: 'default'
      });
      if(!location) {
        return rendition.display();
      } else {
        return rendition.display(location);
      }
    } else {
      return Promise.reject()
    }
  }

  const init = () => {
    const fileName = props.match.params.fileName;
    setCategoryText(props.match.params.category);
    if(fileName) {
      detail({
        fileName: fileName
      }).then(res => {
        if(res.status === 200 && res.data.error_code === 0 && res.data.data) {
          const data = res.data.data;
          setCurrentBook(data);
          setCover(data.cover);
          let rootFile = data.rootFile;
          // startsWith() 方法用于检测字符串是否以指定的子字符串开始。
          if(rootFile.startsWith('/')) {
            rootFile = rootFile.substring(1, rootFile.length);
          }
          // 解析书本资源
          parseBook(`http://47.99.166.157/epub2/${fileName}/${rootFile}`);
          
        } else {
          setToastVisible(true);
          setToastText(res.data.msg);
        }
      }).catch (err => {
        setToastVisible(true);
        setToastText(err);
      })
    }
  }
  const onScroll = (offsetY) => {
    if(offsetY > realPx(42)) {
      setIfHideShadow(false);
    } else {
      setIfHideShadow(true);
    }
  }

  const handleBack = () => {
    dispatch(actionCreators.setFlapCardVisible(false))
    // props.history.push('/');
    props.history.goBack()
  }

  const onrReadBook = () => {
    props.history.push(`/ebook/${props.match.params.category}|${props.match.params.fileName}`)
  }

  const addOrRemoveShelf = () => {
    if(inBookShelf) {
      // 移出书架
      const books = shelfList.filter(item => item.fileName !== currentBook.fileName);
      saveShelfBook(books);
      setShelfList(books);
    } else {
      // 加入书架
      const books = [...shelfList, currentBook];
      saveShelfBook(books);
      setShelfList(books);
    }
  }

  useEffect(() => {
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="book-detail">
      <DetailTitle handleBack={handleBack} showShelf={true} ifHideShadow={ifHideShadow} />
      <Scroll
        className="content-wrapper"
        top={42}
        bottom={52}
        onScroll={onScroll}
        ref={scroll}>
        <StoreInfo
          cover={cover}
          title={data.title}
          author={data.author}
          desc={desc}/>
        <div className="book-detail-content-wrapper">
          <div className="book-detail-content-title">版权</div>
          <div className="book-detail-content-list-wrapper">
            <div className="book-detail-content-row">
              <div className="book-detail-content-label">出版社</div>
              <div className="book-detail-content-text">{data.publisher}</div>
            </div>
            <div className="book-detail-content-row">
              <div className="book-detail-content-label">分类</div>
              <div className="book-detail-content-text">{categoryText}</div>
            </div>
            <div className="book-detail-content-row">
              <div className="book-detail-content-label">语言</div>
              <div className="book-detail-content-text">{data.lang}</div>
            </div>
            <div className="book-detail-content-row">
              <div className="book-detail-content-label">ISBN</div>
              <div className="book-detail-content-text">{data.isbn}</div>
            </div>
          </div>
        </div>
        <div className="book-detail-content-wrapper">
          <div className="book-detail-content-title">目录</div>
          <div className="book-detail-content-list-wrapper">
            {
              !navigation 
                ? <div className="loading-text-wrapper">
                    <span className="loading-text">加载中、、、、、、</span>
                  </div>
                : null
            }
            <div className="book-detail-content-item-wrapper">
              {
                flatNavigation.map(item => {
                  return (
                    <div className="book-detail-content-item" key={item.id}>
                      {
                        item && item.label
                          ? <div
                              className="book-detail-content-navigation-text"
                              style={item.deep > 1 ? {color: '#666', marginLeft: `${(item.deep - 1) * px2rem(20) + 'rem'}`} : {marginLeft: `${(item.deep - 1) * px2rem(20) + 'rem'}`}}>{item.label}</div>
                          : null
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="book-detail-content-wrapper">
          <div className="book-detail-content-title">试读</div>
          <div className="book-detail-content-list-wrapper">
            {
              !displayed
                ? <div className="loading-text-wrapper" >
                    <span className="loading-text">加载中、、、、、、</span>
                  </div>
                : null
            }
          </div>
          <div id="preview" ref={preview}></div>
        </div>
      </Scroll>
      <div className="bottom-wrapper">
        <div className="bottom-btn" onClick={onrReadBook}>阅读</div>
        <div className="bottom-btn" onClick={addOrRemoveShelf}>
          {
            inBookShelf ? <span className="icon-check"></span> : null
          }
          {
            inBookShelf ? '已加入书架' : '加入书架'
          }
        </div>
      </div>
      {
        toastVisible ? <Toast text={toastText}/> : null
      }
      
    </div>
  );
}

export default StoreDetail;
