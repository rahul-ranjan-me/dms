import GlobalState from './components/globalState/index'
import Header from './components/header/index'

import React, { lazy, Suspense } from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom'

import './App.scss';

const Home = lazy(() => import('./pages/home/index'));
const Blog = lazy(() => import('./pages/blog/index'));
const Document = lazy(() => import('./pages/document/index'));

const App = () => {
  const location = useLocation();

  const pages = [
    {
      pageLink: '/',
      view: Home,
      displayName: 'Home',
      showInNavbar: true,
    },
    {
      pageLink: '/document',
      view: Document,
      displayName: 'Document',
      showInNavbar: true,
    },
    {
      pageLink: '/blog',
      view: Blog,
      displayName: 'Blog',
      showInNavbar: true,
    }
  ];
  return (
    <GlobalState>
      <div className="App">
        <Header pages={pages} />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch location={location}>
            {pages.map((page, index) => {
              return (
                <Route
                  exact
                  path={page.pageLink}
                  render={({match}) => <page.view />}
                  key={index}
                />
              );
            })}
            <Redirect to="/document" />
          </Switch>
        </Suspense>
      </div>
    </GlobalState>
  );
}

export default App;
