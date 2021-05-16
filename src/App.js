/*
 * @Author: Guifen Shangguan 
 * @Date: 2021-04-21 11:36:50 
 * @Last Modified by: Guifen Shangguan
 * @Last Modified time: 2021-05-16 13:34:56
 */
// import Epub from 'epubjs';
import { HashRouter, Switch} from 'react-router-dom'


import routes from './router';
import RenderRoute from './router/renderRoute';
import './App.scss'

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  html.style.fontSize = fontSize + 'px';
})

const routesMap = (routes) => {
  return routes.map(route => {
      return <RenderRoute key={route.path} {...route}></RenderRoute>
  })
}



function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          {
            routesMap(routes)
          }
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
