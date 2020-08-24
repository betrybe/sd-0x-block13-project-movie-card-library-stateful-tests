import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Rating from './Rating';

describe('<Rating /> component', () => {
  it('renders without crashing', () => {
    render(<Rating />);
  });

  it('renders the rating inside an element with the class `rating`', () => {
    const { getByTestId } = render(<Rating rating={3} />);
    const rating = getByTestId('rating');

    expect(rating).toHaveTextContent(3);
  });
});
