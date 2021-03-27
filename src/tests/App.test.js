import App from 'components/App';
import React from 'react';
import { render } from '@testing-library/react';

test('renders learn react link', () => {
  const { getByText } = render(
      <App />
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
