import React from 'react';
import { render } from '@testing-library/react';
import MovieCard from './MovieCard';
import '@testing-library/jest-dom';

describe('<MovieCard /> component', () => {
  const movie = {
    title: 'Movie Title 1',
    subtitle: 'Movie Subtitle 1',
    storyline: 'Movie Storyline 1',
    rating: 4.5,
    imagePath: 'images/movie_1',
  };


  it('renders without crashing', () => {
    render(<MovieCard movie={movie} />);
  });

  it('renders the movie image inside an `image` tag', () => {
    const { getByRole } = render(<MovieCard movie={movie} />);
    const image = getByRole('img');

    expect(image).toHaveAttribute('src', 'images/movie_1');
  });

  it('renders the movie title inside a tag', () => {
    const { getByText } = render(<MovieCard movie={movie} />);

    const title = getByText('Movie Title 1');
    expect(title).toBeInTheDocument();
  });

  it('renders the movie subtitle inside a tag', () => {
    const { getByText } = render(<MovieCard movie={movie} />);

    const subtitle = getByText('Movie Subtitle 1');
    expect(subtitle).toBeInTheDocument();
  });


  it('renders the movie storyline inside a tag', () => {
    const { getByText } = render(<MovieCard movie={movie} />);
    const storyline = getByText('Movie Storyline 1');
    expect(storyline).toBeInTheDocument();
  });

  it('renders a `Rating` component', () => {
    const { getAllByTestId } = render(<MovieCard movie={movie} />);
    const rating = getAllByTestId('rating');

    expect(rating).toHaveLength(1);
  });

  it('passes the rating attribute to the `Rating` component', () => {
    const { getByTestId } = render(<MovieCard movie={movie} />);
    const startRating = getByTestId('rating');

    expect(startRating).toContainHTML('<span class="rating">4.5</span>');
  });
});
