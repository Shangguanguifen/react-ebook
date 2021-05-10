/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-05-07 13:01:42 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-07 15:01:19
 */

import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Loading from 'views/loading';

const resolveAsyncCompoment = (LazyCompoment, routeProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyCompoment {...routeProps}></LazyCompoment>
    </Suspense>
  )
}

function RenderRoute (props) {
  const {
    path,
    component,
    ...otherProps
  } = props;
  return <Route path={path} {...otherProps} render={(routeProps) => {
    return resolveAsyncCompoment(component, routeProps);
  }} />
}

export default RenderRoute;