/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-03 16:16:33 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 15:04:41
 */
import { useEffect, useMemo, useState } from 'react';

import './index.scss';
import { list } from 'api/store';
import { categoryText } from '../../util/store'
import DetailTitle from 'components/detail/DetailTitle';
import Scroll from 'components/common/Scroll';
import Featured from 'components/home/Featured';


function StoreList(props) {
  const [bookList, setBookList] = useState(null);
  const [titleText, setTitleText] = useState(null);
  const [total, setTotal] = useState(null);
  const [ifHideShadow, setIfHideShadow] = useState(true)

  const totalNum = useMemo(() => {
    let num = 0;
    if(bookList) {
      Object.keys(bookList).forEach(key => {
        num += bookList[key].length;
      })
    }
    return num
  }, [bookList])

  const title = useMemo(() => {
    if(bookList) {
      return total && `共${totalNum}本书`;
    }
  }, [bookList, total, totalNum])

  const getList = () => {
    list().then(res => {
      const dataList = res.data.data;
      setTotal(res.data.total);
      let category = props.match.params.category;
      let categoryText = props.match.params.categoryText
      if(category !== 'search') {
        setTitleText(categoryText);
        const key = Object.keys(dataList).filter(item => item === category)[0];
        const data = dataList[key];
        const list = {};
        list[key] = data;
        setBookList(list);
      } else if(category === 'search') {
        Object.keys(dataList).filter(key => {
          dataList[key] = dataList[key].filter(book => book.fileName.indexOf(categoryText) >= 0)
          return dataList[key].length > 0
        })
        setBookList(dataList)
      }
    })
  }
  const handleBack = () => {
    props.history.goBack()
  }
  const onScroll = (offsetY) => {
    if(offsetY > 0) {
      setIfHideShadow(false);
    } else {
      setIfHideShadow(true);
    }
  }

  useEffect(() => {
    getList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="book-list-wrapper">
      <DetailTitle title={title} showShelf={true} handleBack={handleBack} ifHideShadow={ifHideShadow}></DetailTitle>
      <Scroll
        className="book-list-scroll-wrapper"
        top={42}
        bottom={0}
        onScroll={onScroll}
        >
        {
          totalNum > 0 ? Object.keys(bookList).map((item, key) => {
            return <Featured
                      titleText={titleText ? titleText : `${categoryText(key)} (${bookList[item].length})`}
                      btnText={''}
                      data={bookList[item]}
                      key={item}></Featured>
          }) : <div className="book-list-none"> 没有相关书籍 </div>
        }
      </Scroll>
    </div>
  );
}

export default StoreList;
