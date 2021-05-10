/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-06 13:35:14 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 11:34:04
 */
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState } from 'react';

import { actionCreators } from 'store/shelf'
import { saveShelfBook } from 'util/localStorage';
import Toast from 'components/common/Toast';


function ShelfTitle(props) {
  const { title, ifHideShadow } = props;
  const isEditMode = useSelector(state => state.shelf.isEditMode);
  const shelfSelected = useSelector(state => state.shelf.shelfSelected);
  let shelfList = useSelector(state => state.shelf.shelfList);


  const [toastText, setToastText] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const dispatch = useDispatch();


  // const selectedNumber = useMemo(() => {
  //   return shelfSelected.length;
  // }, [shelfSelected.length])

  // const selectedText = useMemo(() => {
  //   return selectedNumber === 0 
  //     ? '选择书籍' 
  //     :  `已选择${selectedNumber}本` 
  // }, [selectedNumber]);

  // 判断书架是否为空
  const isDataEmpty = useMemo(() => {
    return shelfList.length === 0;
  }, [shelfList.length])


  const onEditClick = () => {
    dispatch(actionCreators.setIsEditMode(!isEditMode));
  }

  const onClearCache = () => {
    // 不足： 没有做二次弹窗确定是否删除
    if(isEditMode) {
      // 删除图书
      if(shelfSelected.length > 0) {
        shelfSelected.forEach((item, index) => {
          shelfList = shelfList.filter(v => v.fileName !== item.fileName)
        })
        saveShelfBook(shelfList);
        dispatch(actionCreators.setShelfList(shelfList));
        dispatch(actionCreators.setShelfSelected([]));
        setToastText('删除成功');
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false)
        }, 2000);
      } else {
        setToastText('请选择要删除的图书');
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false)
        }, 2000);
      }
    } else {
      // 删除所有图书
      saveShelfBook([]);
      dispatch(actionCreators.setShelfList([]));
      setToastText('删除成功');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false)
      }, 2000);
    }
  }

  return (
    <div>
      <div className="shelf-title-wrapper" style={ifHideShadow ? {boxShadow: 'none'} : null}>
        <div className="title">
          <span className="title-text">{title}</span>
          {/* {
            isEditMode ? <span className="sub-title-text">{selectedText}</span> : null
          } */}
        </div>
        {
          !isDataEmpty
            ? <div className="btn-text-wrapper" onClick={onEditClick}>
                <span className="btn-text">{isEditMode ? '取消' : '编辑'}</span>
              </div>
            : null
        }
       <div className="btn-clear-wrapper" onClick={onClearCache}>
          <span className="btn-clear">{isEditMode ? '删除' : '删除所有图书'}</span>
        </div>
      </div>
      {
        toastVisible ? <Toast text={toastText} /> : null
      }
    </div>
  );
}

ShelfTitle.propTypes = {
  ifHideShadow: PropTypes.bool,
  title: PropTypes.string,
}

ShelfTitle.defaultProps = {
  ifHideShadow: true,
  data: null,
}


export default ShelfTitle;
