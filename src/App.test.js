import App from './App';

import { render } from '@testing-library/react';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

test('renders the app logo', () => {
  const { getByText } = render(<Router><App /></Router>);
  const linkElement = getByText(/MyFavoriteSite/i);
  expect(linkElement).toBeInTheDocument();
});
