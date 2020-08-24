import React from 'react';
import { render } from '@testing-library/react';
import event from '@testing-library/user-event';
import '@testing-library/jest-dom';

import SearchBar from './SearchBar';

let props;
const searchBar = () => (
  render(
    <SearchBar
      searchText={props.searchText}
      onSearchTextChange={props.onSearchTextChange}
      bookmarkedOnly={props.bookmarkedOnly}
      onBookmarkedChange={props.onBookmarkedChange}
      selectedGenre={props.selectedGenre}
      onSelectedGenreChange={props.onSelectedGenreChange}
    />,
  )
);

const beforeEachUnitTest = () => {
  props = {
    searchText: 'My Text',
    onSearchTextChange: jest.fn(),
    bookmarkedOnly: true,
    onBookmarkedChange: jest.fn(),
    selectedGenre: 'action',
    onSelectedGenreChange: jest.fn(),
  };
};

describe('<SearchBar /> component', () => {
  beforeEach(() => beforeEachUnitTest());

  it('renders without crashing', () => {
    searchBar();
  });
});

describe('<SearchBar /> component Form', () => {
  beforeEach(() => beforeEachUnitTest());


  it('renders a form', () => {
    const { getAllByTestId } = searchBar();
    const form = getAllByTestId('search-bar-form');
    expect(form).toHaveLength(1);
  });
});

describe('<SearchBar /> component Text input', () => {
  beforeEach(() => beforeEachUnitTest());


  it('renders a text input inside the form', () => {
    const { getAllByTestId } = searchBar();
    const textInput = getAllByTestId('text-input');
    expect(textInput).toHaveLength(1);
  });

  it('has a label with the text "Inclui o texto"', () => {
    const { getAllByTestId } = searchBar();
    const textInputLabel = getAllByTestId('text-input-label');
    expect(textInputLabel).toHaveLength(1);
    expect(textInputLabel[0]).toHaveTextContent('Inclui o texto');
  });

  it('passes the `searchText` prop as the value of the input', () => {
    const { getByTestId } = searchBar();
    const textInput = getByTestId('text-input');
    expect(textInput).toHaveValue(props.searchText);
  });

  it('passes the `onSearchTextChange` prop to the `onChange` attribute of the input', () => {
    const { getByTestId } = searchBar();
    const textInput = getByTestId('text-input');
    event.type(textInput, 'change');
    expect(props.onSearchTextChange).toHaveBeenCalledTimes(6);
  });
});

describe('<SearchBar /> component Bookmarked checkbox', () => {
  beforeEach(() => beforeEachUnitTest());


  it('renders a checkbox input inside the form', () => {
    const { getAllByTestId } = searchBar();
    const checkboxInput = getAllByTestId('checkbox-input');
    expect(checkboxInput).toHaveLength(1);
  });

  it('has a label with the text "Mostrar somente favoritos"', () => {
    const { getAllByTestId } = searchBar();
    const checkboxInputLabel = getAllByTestId('checkbox-input-label');
    expect(checkboxInputLabel).toHaveLength(1);
    expect(checkboxInputLabel[0]).toHaveTextContent('Mostrar somente favoritos');
  });

  it('passes the `bookmarkedOnly` prop to the `checked` attribute of the input', () => {
    const { getByTestId } = searchBar();
    const checkboxInput = getByTestId('checkbox-input');

    expect(checkboxInput).toBeChecked();
  });

  it('passes the `onBookmarkedChange` to the `onChange` attribute of checkbox input', () => {
    const { getByTestId } = searchBar();
    const checkboxInput = getByTestId('checkbox-input');
    event.click(checkboxInput);
    expect(props.onBookmarkedChange).toHaveBeenCalledTimes(1);
  });
});

describe('<SearchBar /> component Movie Genre select', () => {
  beforeEach(() => beforeEachUnitTest());


  it('renders a select inside the form', () => {
    const { getAllByTestId } = searchBar();
    const selectInput = getAllByTestId('select-input');
    expect(selectInput).toHaveLength(1);
  });

  it('has a label with the text "Filtrar por gênero"', () => {
    const { getAllByTestId } = searchBar();
    const selectInputLabel = getAllByTestId('select-input-label');
    expect(selectInputLabel).toHaveLength(1);
    expect(selectInputLabel[0]).toHaveTextContent('Filtrar por gênero');
  });

  it('passes the `selectedGenre` prop as the value of the select', () => {
    const { getByTestId } = searchBar();
    const selectInput = getByTestId('select-input');

    expect(selectInput).toHaveValue(props.selectedGenre);
  });

  it('passes the `onSelectedGenreChange` prop to the `onChange` attribute of the select', () => {
    const { getByTestId } = searchBar();
    const selectInput = getByTestId('select-input');
    event.selectOptions(selectInput, 'comedy');

    expect(props.onSelectedGenreChange).toHaveBeenCalledTimes(1);
  });

  it('renders 4 options inside the select with expected text and values', () => {
    const genreOptions = [
      { text: 'Todos', value: '' },
      { text: 'Ação', value: 'action' },
      { text: 'Comédia', value: 'comedy' },
      { text: 'Suspense', value: 'thriller' },
    ];
    const { getAllByTestId } = searchBar();
    const selectOptions = getAllByTestId('select-option');

    expect(selectOptions).toHaveLength(4);
    selectOptions.forEach((option, index) => {
      expect(option).toHaveTextContent(genreOptions[index].text);
      expect(option).toHaveValue(genreOptions[index].value);
    });
  });
});
