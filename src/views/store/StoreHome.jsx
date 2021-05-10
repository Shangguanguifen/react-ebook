/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-29 15:56:19 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 11:31:38
 */
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { actionCreators } from 'store/home';
import { home } from 'api/store'
import './index.scss';
import SearchBar from 'components/home/SearchBar';
import FlapCard from 'components/home/FlapCard';
import GuessYouLike from 'components/home/GuessYouLike';
import Recommend from 'components/home/Recommend';
import Featured from 'components/home/Featured';
import CategoryBook from 'components/home/CategoryBook';
import Category from 'components/home/Category';
import Scroll from 'components/common/Scroll';

function StoreHome() {
  const [currData, setCurrData] = useState({});
  const [scrollTop, setScrollTop] = useState(94);
  const [randomBook, setRandomBook] = useState({});
  const [banner, setBanner] = useState('');
  const [guessYouLike, setGuessYouLike] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const scroll = useRef();

  const onScroll = (offsetY) => {
    dispatch(actionCreators.setOffsetY(offsetY));
    if(offsetY > 0) {
      setScrollTop(54);
    } else {
      setScrollTop(94);
    }
    if(scroll.current) {
      scroll.current.refresh();
    }
  }

  const handleRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * currData.random.length);
    setRandomBook(currData.random[randomIndex]);

  }

  useEffect(() => {
    home().then(res => {
      if(res && res.status === 200) {
        const data = res.data;
        setCurrData(data);
        setBanner(data.banner);
        setGuessYouLike(data.guessYouLike);
        setRecommend(data.recommend);
        setFeatured(data.featured);
        setCategoryList(data.categoryList);
        setCategories(data.categories);
      }
    })
  }, [])

  // useEffect(() => {
  //   const preOffsetY = getOffsetY();
  //   if(preOffsetY > 0 && scroll.current) {
  //     console.log(scroll.current.element, preOffsetY)
  //     scroll.current.element.scrollTo(0, preOffsetY);
  //   }
  // }, [])

  return (
    <div className="store-home">
      <SearchBar handleRandomBook={handleRandomBook}/>
      <FlapCard data={randomBook}/>
      <Scroll
        top={scrollTop}
        bottom={0}
        onScroll={onScroll}
        ref={scroll}>
          <div className="banner-wrapper">
            <img className="banner-img" src={banner} alt=""/>
          </div>
          <GuessYouLike data={guessYouLike}/>
          <Recommend className='recommend' data={recommend}/>
          <Featured className='featured' titleText={'精选'} btnText={''} data={featured}/>
          {
            categoryList.map(item => {
              return (
                <div className="category-list-wrapper" key={item.category}>
                  <CategoryBook data={item}/>
                </div>
              )
            })
          }
          <Category className="category" data={categories} />
      </Scroll>
    </div>
  );
}

export default StoreHome;
