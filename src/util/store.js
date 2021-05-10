/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-30 10:40:04 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 11:32:45
 */
export const searchList = {
  hotSearch: [
    {
      type: 1,
      text: 'Self-Reported Population Health',
      num: '1.8万'
    },
    {
      type: 1,
      text: 'Library and Information Sciences',
      num: '1.1万'
    },
    {
      type: 1,
      text: 'Global Business Strategy',
      num: '1.3万'
    },
    {
      type: 1,
      text: 'Corporate Data Quality',
      num: '1.0万'
    },
    {
      type: 1,
      text: 'Verrechnungspreise',
      num: '3.9万'
    }
  ],
  historySearch: [
    {
      type: 2,
      text: 'Computer Science'
    },
    {
      type: 1,
      text: 'Building the Infrastructure for Cloud Security'
    },
    {
      type: 2,
      text: 'ePub'
    },
    {
      type: 2,
      text: 'api'
    },
    {
      type: 2,
      text: 'Vue.js'
    },
    {
      type: 2,
      text: 'Nginx'
    },
    {
      type: 2,
      text: 'Java'
    },
    {
      type: 2,
      text: 'hdfs'
    },
    {
      type: 2,
      text: 'vuejs'
    },
    {
      type: 2,
      text: 'es6'
    },
    {
      type: 2,
      text: 'Intel'
    },
    {
      type: 1,
      text: 'Pro Git'
    },
    {
      type: 2,
      text: 'imooc'
    },
    {
      type: 2,
      text: 'Education'
    },
    {
      type: 2,
      text: 'Springer'
    },
    {
      type: 2,
      text: 'Environment'
    }
  ]
}

export const flapCardList = [
  {
    r: 255,
    g: 102,
    _g: 102,  //改变的颜色
    b: 159,
    imgLeft: import('assets/images/gift-left.png'),
    imgRight: 'assets/images/gift-right.png',
    backgroundSize: '50% 50%',
    zIndex: 100,
    rotateDegree: 0
  },
  {
    r: 74,
    g: 171,
    _g: 171,
    b: 255,
    imgLeft: 'url(' + require('assets/images/compass-left.png') + ')',
    imgRight: 'url(' + require('assets/images/compass-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 99,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 198,
    _g: 198,
    b: 102,
    imgLeft: 'url(' + require('assets/images/star-left.png') + ')',
    imgRight: 'url(' + require('assets/images/star-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 98,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require('assets/images/heart-left.png') + ')',
    imgRight: 'url(' + require('assets/images/heart-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 97,
    rotateDegree: 0
  },
  {
    r: 59,
    g: 201,
    _g: 201,
    b: 22,
    imgLeft: 'url(' + require('assets/images/crown-left.png') + ')',
    imgRight: 'url(' + require('assets/images/crown-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 96,
    rotateDegree: 0
  }
]

export function getCategoryName(id) {
  // eslint-disable-next-line default-case
  switch (id) {
    case 1:
      return 'ComputerScience'
    case 2:
      return 'SocialSciences'
    case 3:
      return 'Economics'
    case 4:
      return 'Education'
    case 5:
      return 'Engineering'
    case 6:
      return 'Environment'
    case 7:
      return 'Geography'
    case 8:
      return 'History'
    case 9:
      return 'Laws'
    case 10:
      return 'LifeSciences'
    case 11:
      return 'Literature'
    case 12:
      return 'Biomedicine'
    case 13:
      return 'BusinessandManagement'
    case 14:
      return 'EarthSciences'
    case 15:
      return 'MaterialsScience'
    case 16:
      return 'Mathematics'
    case 17:
      return 'MedicineAndPublicHealth'
    case 18:
      return 'Philosophy'
    case 19:
      return 'Physics'
    case 20:
      return 'PoliticalScienceAndInternationalRelations'
    case 21:
      return 'Psychology'
    case 22:
      return 'Statistics'
  }
}

export function categoryText(category) {
  // eslint-disable-next-line default-case
  switch (category) {
    case 1:
      return '计算机科学';
    case 2:
      return '社会科学';
    case 3:
      return '经济学';
    case 4:
      return '教育学';
    case 5:
      return '工程学';
    case 6:
      return 'c';
    case 7:
      return '地理学';
    case 8:
      return '历史学';
    case 9:
      return '法学';
    case 10:
      return '生命科学';
    case 11:
      return '文学';
    case 12:
      return '生物医学';
    case 13:
      return '工商管理';
    case 14:
      return '地球科学';
    case 15:
      return '材料科学';
    case 16:
      return '数学';
    case 17:
      return '公共卫生';
    case 18:
      return '哲学';
    case 19:
      return '物理';
    case 20:
      return '国际关系';
    case 21:
      return '心理学';
    case 22:
      return '统计学';
  }
}