import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('renders cereal reviews title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/cereal reviews/i);
  expect(linkElement).toBeInTheDocument();
});
