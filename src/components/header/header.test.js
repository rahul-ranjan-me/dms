import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './index';
const pages = [
  {
    pageLink: '/',
    displayName: 'Home',
  },
  {
    pageLink: '/document',
    displayName: 'Document',
  },
  {
    pageLink: '/blog',
    displayName: 'Blog',
  }
];
test('renders the app logo', () => {
  const { getByText } = render(<Router><Header pages={pages} /></Router>);
  const linkElement = getByText(/MyFavoriteSite/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders the nav links', () => {
  const { getByText } = render(<Router><Header pages={pages} /></Router>);
  const navElement1 = getByText(/Home/i);
  expect(navElement1).toBeInTheDocument();
  const navElement2 = getByText(/Document/i);
  expect(navElement2).toBeInTheDocument();
  const navElement3 = getByText(/Blog/i);
  expect(navElement3).toBeInTheDocument();
});
