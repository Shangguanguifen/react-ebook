import axios from 'axios';

// axios.defaults.baseURL = 'http://192.168.1.103:3000';


export function home() {
  return axios.get('json/bookHome.json');
}

export function detail(book) {
  return axios({
    method: 'get',
    url: 'http://47.99.166.157:3000/book/detail',
    params: {
      fileName: book.fileName
    },
    
  })
}

export function list() {
  return axios.get('json/bookList.json');
}

export function shelf() {
  return axios.get('json/bookShelf.json');
}