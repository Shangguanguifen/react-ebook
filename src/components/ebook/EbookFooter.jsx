/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-28 21:08:06 
 * @Last Modified by:   Guifen Shangguan 
 * @Last Modified time: 2021-04-28 21:08:06 
 */
import { useSelector } from "react-redux";

function EbookFooter() {
  const progress = useSelector(state => state.book.progress);

  return (
    <div className="ebook-footer">
    <span className="ebook-footer-text">{progress} %</span>
  </div>
  );
}

export default EbookFooter;
