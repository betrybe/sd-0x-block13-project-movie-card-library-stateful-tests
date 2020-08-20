import React from 'react';
// import { mount, shallow } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import event from '@testing-library/user-event';

import MovieLibrary from './MovieLibrary';

const movies = [
  {
    title: 'An awesome title',
    subtitle: 'Movie Subtitle 1',
    storyline: 'Movie Storyline 1',
    rating: 4.5,
    imagePath: 'images/movie_1',
    bookmarked: true,
    genre: 'action',
  },
  {
    title: 'Movie Title 2',
    subtitle: 'An incredible subtitle',
    storyline: 'Movie Storyline 2',
    rating: 4.5,
    imagePath: 'images/movie_2',
    bookmarked: false,
    genre: 'comedy',
  },
  {
    title: 'Movie Title 3',
    subtitle: 'Movie Subtitle 3',
    storyline: 'An great storyline',
    rating: 3,
    imagePath: 'images/movie_3',
    bookmarked: false,
    genre: 'thriller',
  },
];

// let movieLibraryWrapper;

// const movieLibrary = () => {
//   if (!movieLibraryWrapper) {
//     movieLibraryWrapper = render(<MovieLibrary movies={movies} />);
//   }
//   return movieLibraryWrapper;
// };

// const beforeEachUnitTest = () => (movieLibraryWrapper = undefined);

describe('<MovieLibrary /> component', () => {
  it('renders without crashing', () => {
    render(<MovieLibrary movies={movies} />);
  });
});

describe('<MovieLibrary /> component initial state', () => {
  // beforeEach(() => beforeEachUnitTest());

  it('initializes `searchText` in state with an empty string', () => {
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const searchText = getByTestId('text-input');
    expect(searchText).toHaveValue('');
  });

  it('initializes `bookmarkedOnly` in state with `false`', () => {
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const bookmarkedOnly = getByTestId('checkbox-input');
    expect(bookmarkedOnly).not.toBeChecked();
  });

  it('initializes `selectedGenre` in state with an empty string', () => {
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const selectInput = getByTestId('select-input');
    expect(selectInput).toHaveValue('');
  });

  it('initializes `movies` in state with the prop `movies`', () => {
    const { getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const movieCards = getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(movies.length);
  });
});

describe('<MovieLibrary /> should render <SearchBar />', () => {
  // beforeEach(() => beforeEachUnitTest());

  it('renders a `SearchBar` component', () => {
    const { getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const searchBar = getAllByTestId('search-bar-form');
    expect(searchBar).toHaveLength(1);
  });

  it('passes `searchText` from state as the prop `searchText` of `SearchBar`', () => {
    // whatever is the value of searchText in state
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const searchText = getByTestId('text-input');
    event.type(searchText, 'My Search Text');


    // is gonna be pased to SearchBar in the prop `searchText`
    expect(searchText).toHaveValue('My Search Text');
  });

  // MovieLibrary must pass to SearchBar a callback in the prop
  // onSearchTextChange. This callback should be called by SearchBar when the
  // user types on the input text field.
  // The callback receives an event containing, among other things, the typed
  // text. The callback should update MovieLibrary's state with the typed text.

  // it('passes to `SearchBar` a callback to update `searchText` in state', () => {
  //   // TODO: ESSE IT É REALMENTE NESCESSÁRIO ? FICOU REPETITIVO
  //   // Initially, searchText in MovieLibrary's state is empty
  //   expect(movieLibrary().state().searchText).toBe('');

  //   // then the callback is called with the typed text
  //   const event = { target: { value: 'new input text' } };
  //   const searchBar = movieLibrary().find('SearchBar');
  //   searchBar.props().onSearchTextChange(event);

  //   // and MovieLibrary's state should change
  //   expect(movieLibrary().state().searchText).toBe('new input text');
  // });

  it('passes `bookmarkedOnly` from state as the prop `bookmarkedOnly` of `SearchBar`', () => {
    // whatever is the value of bookmarkedOnly in state
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const bookmarkedOnly = getByTestId('checkbox-input');
    // movieLibrary().setState({ bookmarkedOnly: true });
    event.click(bookmarkedOnly);
    // const searchBar = movieLibrary().find('SearchBar');
    expect(bookmarkedOnly).toBeChecked();
    // is gonna be pased to SearchBar in the prop `bookmarkedOnly`
    // expect(searchBar.props().bookmarkedOnly).toBe(true);
  });

  // MovieLibrary must pass to SearchBar a callback in the prop
  // onBookmarkedChange. This callback should be called by SearchBar when the
  // user toggles the checkbox field to show only bookmarked fields.
  // The callback receives an event containing, among other things, the value
  // of the checkbox.The callback should update MoiveLibrary's state with the
  // // value of the checkbox.
  // it('passes to `SearchBar` a callback to update `bookmarkedOnly` in state', () => {
  //   // Initially, MovieLibrary's state field bookmarkedOnly is false
  //   expect(movieLibrary().state().bookmarkedOnly).toBe(false);

  //   // then the callback is called with the new checkbox value
  //   const event = { target: { checked: true } };
  //   const searchBar = movieLibrary().find('SearchBar');
  //   searchBar.props().onBookmarkedChange(event);

  //   // and MovieLibrary's state should change
  //   expect(movieLibrary().state().bookmarkedOnly).toBe(true);
  // });

  // it('passes `selectedGenre` from state as the prop `selectedGenre` of `SearchBar`', () => {
  //   // whatever is the value of selectedGenre in state
  //   movieLibrary().setState({ selectedGenre: 'fantasy' });
  //   const searchBar = movieLibrary().find('SearchBar');

  //   // is gonna be pased to SearchBar in the prop `selectedGenre`
  //   expect(searchBar.props().selectedGenre).toBe('fantasy');
  // });

  // MovieLibrary must pass to SearchBar a callback in the prop
  // onSelectedGenreChange. This callback should be called by SearchBar when the
  // user changes the select with genre options.
  // The callback receives an event containing, among other things, the value
  // of the selected option. The callback should update MoiveLibrary's state
  // with the selected option.
  it('passes to `SearchBar` a callback that updates `MovieLibrary`s state', () => {
    // Initially, MovieLibrary's state field selectedGenere is empty
    const { getByTestId } = render(<MovieLibrary movies={movies} />);
    const selectInput = getByTestId('select-input');
    expect(selectInput).toHaveValue('');

    event.selectOptions(selectInput, 'thriller');

    expect(selectInput).toHaveValue('thriller');
  });
});

describe('<MovieLibrary /> should render <MovieList />', () => {
  it('renders a `MovieList` component', () => {
    const { getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const movieList = getAllByTestId('movie-list');
    expect(movieList).toHaveLength(1);
  });

  it('passes to MovieList movies with titles matching the text', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const textInput = getByTestId('text-input');

    event.type(textInput, 'awesome');

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(1);

    const movieCardTitle = getByTestId('movie-card-title');
    expect(movieCardTitle).toHaveTextContent(movies[0].title);
  });

  it('passes to MovieList movies with subtitles matching the text', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const textInput = getByTestId('text-input');

    event.type(textInput, 'incredible');

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(1);

    const movieCardTitle = getByTestId('movie-card-title');
    expect(movieCardTitle).toHaveTextContent(movies[1].title);
  });

  it('passes to MovieList movies with storyline matching the text', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const textInput = getByTestId('text-input');

    event.type(textInput, 'great');

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(1);

    const movieCardTitle = getByTestId('movie-card-title');
    expect(movieCardTitle).toHaveTextContent(movies[2].title);
  });

  it('does not filter the movies passed to MovieList', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const textInput = getByTestId('text-input');

    event.type(textInput, '');

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(3);
  });

  it('it only passes to MovieList bookmarked movies', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const bookmarkedOnly = getByTestId('checkbox-input');

    event.click(bookmarkedOnly);

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(1);
    const movieCardTitle = getByTestId('movie-card-title');
    expect(movieCardTitle).toHaveTextContent(movies[0].title);
  });

  // it('it does not filter the movies passed to MovieList', () => {
  //   movieLibrary().setState({ selectedGenre: '' });
  //   const passedMovies = movieLibrary().find('MovieList').props().movies;

  //   expect(passedMovies.length).toBe(3);
  //   expect(passedMovies).toEqual(movies);
  // });

  it('passes to MovieList only movies matching the genre', () => {
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const select = getByTestId('select-input');

    event.selectOptions(select, 'comedy');

    const movieCard = getAllByTestId('movie-card');
    expect(movieCard).toHaveLength(1);
    const movieCardTitle = getByTestId('movie-card-title');
    expect(movieCardTitle).toHaveTextContent(movies[1].title);
  });
});

describe('<MovieLibrary /> should render <AddMovie />', () => {
  it('renders a `AddMovie` component', () => {
    const { getAllByTestId } = render(<MovieLibrary movies={movies} />);
    const addMovieForm = getAllByTestId('add-movie-form');
    expect(addMovieForm).toHaveLength(1);
  });

  // MovieLibrary must pass to AddMovie a callback in the prop
  // onClick. This callback should be called by AddMovie when the
  // user clicks on the "Adicionar Filme" to create the new movie.
  // The callback receives the movie to be inserted.
  // The callback should update MovieLibrary's state,
  // by adding the new movie at the end of the `movies`.
  it('passes to `AddMovie` a callback to enable adding the new movie at the end of the movies list', () => {
    // Initially, MovieLibrary's state field selectedGenere is empty
    const { getByTestId, getAllByTestId } = render(<MovieLibrary movies={movies} />);
    // const addMovie = wrapper.find('AddMovie');
    // const addMovieButton = addMovie.find('form button');
    const newMovie = {
      subtitle: 'Harry Potter magical subtitle',
      title: 'Harry Potter VII',
      imagePath: 'http://localhost:3000/images/Harry_Potter.jpg',
      storyline: 'Harry dies',
      rating: '4.9',
      genre: 'action',
    };

    let movieCards = getAllByTestId('movie-card');
    // const moviesList = () => wrapper.state('movies');

    // addMovie.setState(newMovie);

    expect(movieCards).toHaveLength(movies.length);

    const titleInput = getByTestId('title-input');
    const subtitleInput = getByTestId('subtitle-input');
    const imageInput = getByTestId('image-input');
    const storylineInput = getByTestId('storyline-input');
    const ratingInput = getByTestId('rating-input');
    const genreInput = getByTestId('genre-input');
    const sendButton = getByTestId('send-button');

    event.type(titleInput, newMovie.title);
    event.type(subtitleInput, newMovie.subtitle);
    event.type(imageInput, newMovie.imagePath);
    fireEvent.change(storylineInput, { target: { value: newMovie.storyline } });
    event.type(ratingInput, newMovie.rating);
    event.selectOptions(genreInput, newMovie.genre);


    event.click(sendButton);

    movieCards = getAllByTestId('movie-card');

    expect(movieCards).toHaveLength(movies.length + 1);
    const newMovieTitle = getAllByTestId('movie-card-title');
    expect(newMovieTitle[movieCards.length - 1]).toHaveTextContent(newMovie.title);
  });
});
