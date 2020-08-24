import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from './Header';

describe('<Header /> component', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('it includes the text `Movie Cards Library` inside a tag', () => {
    const { getByRole } = render(<Header />);
    const header = getByRole('heading');

    expect(header).toHaveTextContent('Movie Cards Library');
  });
});
