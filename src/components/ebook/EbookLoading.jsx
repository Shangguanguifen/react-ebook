/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-28 10:32:58 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 10:34:52
 */
const data = [
  [{}, {}, {}],
  [{}, {}, {}]
]
function EbookLoading() {
  return (
    <div className="ebook-loading">
      <div className="ebook-loading-wrapper">
        {
          data.map((item, index) => {
            return (
              <div className="ebook-loading-item" key={index}>
                {
                  item.map((subItem, subIndex) => {
                    return (
                      <div className="ebook-loading-line-wrapper" key={subIndex + 3}>
                        <div className={`ebook-loading-line-${subIndex} ebook-loading-line`}></div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
        <div className="ebook-loading-center"></div>
      </div>
    </div>
  );
}

export default EbookLoading;
