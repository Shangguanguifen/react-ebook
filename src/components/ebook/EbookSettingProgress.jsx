/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-26 20:40:24 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-09 21:50:56
 */
import { useEffect, useState, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators } from 'store/book';
import { reflreshLocation, useGetReadTimeText } from 'util/mixin';


function EbookSettingProgress() {
  const fileName = useSelector(state => state.book.fileName);
  const currentBook = useSelector(state => state.book.currentBook);
  const menuVisible = useSelector(state => state.book.menuVisible);
  const settingVisible = useSelector(state => state.book.settingVisible);
  const bookAvailable = useSelector(state => state.book.bookAvailable);
  const progress = useSelector(state => state.book.progress);
  const section = useSelector(state => state.book.section);
  const navigation = useSelector(state => state.book.navigation);
  const [bookProgress, setBookProgress] = useState(progress);
  const getReadTimeText = useGetReadTimeText(fileName);
  const progressRef = useRef();

  const dispatch= useDispatch();

  const onProgressChange = (event) => {
    dispatch(actionCreators.setProgress(event.target.value));
    displayProgress(currentBook, progress, fileName);
  }

  const onProgressInput = async(event) => {
    dispatch(actionCreators.setProgress(event.target.value));
    displayProgress(currentBook, progress, fileName);
  }

  const displayProgress = (currentBook, progress, fileName) => {
    const cfi = currentBook.locations.cfiFromPercentage(progress / 100);
    currentBook.rendition.display(cfi).then(() => {
      const currentSection = reflreshLocation(currentBook, fileName).section;
      dispatch(actionCreators.setSection(currentSection));
      setBookProgress(progress);
    });
  }
  
  // useLayoutEffect(() => {
  //   displayProgress(currentBook, progress, fileName);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [progress, currentBook])

  // useEffect(() => {
  //   
  // }, [progress, currentBook])

  useEffect(() => {
    if(progressRef.current) {
      progressRef.current.style.backgroundSize = `${bookProgress}% 100%`
    }
  })

  const dispalySection = (currentBook, section) => {
    dispatch(actionCreators.setSection(section));

    let sectionInfo = currentBook.section(section);
    if(sectionInfo && sectionInfo.href) {
      currentBook.rendition.display(sectionInfo.href).then(() => {
        // ????????????????????????????????????????????????????????????
        const progressValue = reflreshLocation(currentBook, fileName).currentPage;
        setBookProgress(progressValue);
      })
    }
  }
  
    // ?????????
  const onPrevSection = () => {
    // ????????????0 ????????????????????????
    if(section > 0 && bookAvailable) {
     dispalySection(currentBook, section - 1);
    }
  }

  // ?????????
  const onNextSection = () => {
    if(section < currentBook.spine.length - 1 && bookAvailable) {
      dispalySection(currentBook, section + 1);
    }
  }

  const getSectionName = useMemo(() => {
    return section ? navigation[section].label : ''
  }, [navigation, section])

  return menuVisible && settingVisible === 2 ? (
    <div name="slide-up">
      <div className="setting-wrapper" >
        <div className="setting-progress">
          <div className="read-time-wrapper">
            <span className="read-time-text">?????? {getReadTimeText} ??????</span>
            <span className="icon-forward"></span>
          </div>
          <div className="progress-wrapper">
            <div className="progress-icon-wrapper" onClick={onPrevSection}>
              <span className="icon-back"></span>
            </div>
            <input className="progress" type="range"
                  value={bookProgress}
                  max="100"
                  min="0"
                  step="1"
                  onChange={onProgressChange}
                  onInput={onProgressInput}
                  disabled={!bookAvailable}
                  ref={progressRef}
                  style={{backgroundSize: '0% 100%'}}
                  />
            <div className="progress-icon-wrapper" onClick={onNextSection}>
              <span className="icon-forward"></span>
            </div>
          </div>
          <div className="text-wrapper">
            <span className="progress-section-text">{getSectionName}</span>
            <span className="progress-text">({bookAvailable ? bookProgress + '%' : '?????????...'})</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default EbookSettingProgress;
