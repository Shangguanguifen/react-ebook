import React, { useMemo } from 'react';
import { createHashHistory } from 'history'
import { useSelector, useDispatch } from "react-redux";

import { actionCreators } from 'store/shelf';


function Shelf() {
  const shelfList = useSelector(state => state.shelf.shelfList);
  const shelfSelected = useSelector(state => state.shelf.shelfSelected);
  const isEditMode = useSelector(state => state.shelf.isEditMode);

  const dispatch = useDispatch();

  
  const history = createHashHistory()

  const onClickBook = (item) => {
    if(!isEditMode) {
      history.push(`/store/detail/${item.categoryText}/${item.fileName}`)
    }
  }

  const onAddBook = () => {
    history.push('/')
  }

  const onCheckDelete = (item) => {
    let same = false;
    shelfSelected.forEach((v, index) => {
      if(v.fileName === item.fileName) {
        shelfSelected.splice(index, 1)
        same = true;
      }
    })
    if(same) {
      dispatch(actionCreators.setShelfSelected(shelfSelected));
    } else {
      const books = [...shelfSelected, item];
      dispatch(actionCreators.setShelfSelected(books))
    }
  }
  const shelfBookList = useMemo(() => {
    return shelfList;
  }, [shelfList])
  return (
    <div className="book-shelf-wrapper">
      <div className="book-shelf-label-list-wrapper" >
        <div className="book-shelf-list-wrapper">
          <div className="book-shelf-item-wrapper">
            {
              shelfBookList && shelfBookList.length >0 ? shelfList.map(item => {
                return (
                  <div className="book-shelf-item" key={item.id} onClick={() => onClickBook(item)}>
                    <div className="book-img-wrapper" >
                      <div className="shelf-image">
                        <img className="book-img" src={item.cover} alt='' />
                        {
                          isEditMode ? <input type="checkbox" className="checkbox-selected" onClick={() => onCheckDelete(item)}/> : null
                        }
                      </div>
                    </div>
                    <div className="book-title-wrapper">
                      <span className="book-title title-small">{item.title}</span>
                    </div>
                  </div>
                )
              }) : null
            }
            <div className="book-shelf-item">
              <div className="book-img-wrapper" onClick={onAddBook}>
                <span className="icon-add icon"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shelf;
