import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { shelf } from 'api/store';
import { getShelfBook, saveShelfBook } from 'util/localStorage'

import 'components/shelf/index.scss';
import './index.scss';

import ShelfTitle from 'components/shelf/ShelfTitle';
import Shelf from 'components/shelf/Shelf';
import Scroll from 'components/common/Scroll';
import { actionCreators } from "../../store/shelf";


function StoreShelf() {
  const isEditMode = useSelector(state => state.shelf.isEditMode);
  const [ifHideShadow, setIfHideShadow] = useState(true);

  const dispatch = useDispatch();

  const scrollBottom = useMemo(() => {
    if(isEditMode) {
      return 48;
    } else {
      return 0;
    }
  }, [isEditMode])

  const getBookShelf = () => {
    const bookList = getShelfBook();
    if(!bookList) {
      shelf().then(res => {
        if(res.status === 200) {
          dispatch(actionCreators.setShelfList(res.data.data.bookList));
          saveShelfBook(res.data.data.bookList);
        }
      })
    } else {
      dispatch(actionCreators.setShelfList(bookList));
    }
  }
  const onScroll = (offsetY) => {
    if(offsetY > 0) {
      setIfHideShadow(false);
    } else {
      setIfHideShadow(true);
    }
  }

  useEffect(() => {
    getBookShelf();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="store-shelf">
      <ShelfTitle title={'书架'} ifHideShadow={ifHideShadow}/>
      <Scroll top={0} bottom={scrollBottom} onScroll={onScroll}>
        <Shelf />
      </Scroll>
    </div>
  );
}

export default StoreShelf;
