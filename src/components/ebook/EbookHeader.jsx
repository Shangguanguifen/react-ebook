/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-28 21:08:08 
 * @Last Modified by:   Guifen Shangguan 
 * @Last Modified time: 2021-04-28 21:08:08 
 */
import { useSelector } from "react-redux";


function EbookHeader() {
  const section = useSelector(state => state.book.section);
  const navigation = useSelector(state => state.book.navigation);

  return (
    <div className="ebook-header">
    <span className="ebook-header-text">{section ? navigation[section].label : ''}</span>
  </div>
  );
}

export default EbookHeader;
