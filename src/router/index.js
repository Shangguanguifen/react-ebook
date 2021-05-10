/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-28 10:32:41 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 15:32:21
 */
import React from 'react';
import { Redirect } from 'react-router';


const router = [
  {
    path: '/store',
    exact: true,
    component: React.lazy(() => import('views/store/StoreHome')),
  },
  {
    path: '/store/detail/:category/:fileName',
    exact: true,
    component: React.lazy(() => import('views/store/StoreDetail')),
  },
  {
    path: '/store/list/:category/:categoryText',
    exact: true,
    component: React.lazy(() => import('views/store/StoreList')),
  },
  {
    path: '/store/shelf',
    exact: true,
    component: React.lazy(() => import('views/store/StoreShelf'))
  },
  {
    path: '/ebook/:id',
    exact: true,
    component: React.lazy(() => import('views/ebook/book'))
  },
  {
    path: '/',
    component: () => <Redirect to="/store" />
  }
]

export default router;