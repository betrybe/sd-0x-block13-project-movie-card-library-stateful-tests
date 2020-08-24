import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import event from '@testing-library/user-event';
import AddMovie from './AddMovie';

const initialState = {
  subtitle: '',
  title: '',
  imagePath: '',
  storyline: '',
  rating: 0,
  genre: 'action',
};

const onClick = jest.fn();
let form;
let titleInput;
let titleInputLabel;
let subtitleInput;
let subtitleInputLabel;
let imageInput;
let imageInputLabel;
let storylineInput;
let storylineInputLabel;
let ratingInput;
let ratingInputLabel;
let genreInput;
let genreInputLabel;
let genreOptions;
let sendButton;


beforeEach(() => {
  const { getAllByTestId, getByTestId } = render(<AddMovie onClick={onClick} />);
  form = getAllByTestId('add-movie-form');
  titleInput = getByTestId('title-input');
  titleInputLabel = getByTestId('title-input-label');
  subtitleInput = getByTestId('subtitle-input');
  subtitleInputLabel = getByTestId('subtitle-input-label');
  imageInput = getByTestId('image-input');
  imageInputLabel = getByTestId('image-input-label');
  storylineInput = getByTestId('storyline-input');
  storylineInputLabel = getByTestId('storyline-input-label');
  ratingInput = getByTestId('rating-input');
  ratingInputLabel = getByTestId('rating-input-label');
  genreInput = getByTestId('genre-input');
  genreInputLabel = getByTestId('genre-input-label');
  genreOptions = getAllByTestId('genre-option');
  sendButton = getByTestId('send-button');
});


describe('<AddMovie /> component', () => {
  it('renders without crashing', () => {
    render(<AddMovie onClick={() => jest.fn()} />);
  });

  it('renders a form', () => {
    expect(form).toHaveLength(1);
  });
});

describe('<AddMovie /> component title input', () => {
  it('renders a text input so as the user can type the movie title', () => {
    expect(titleInput).toBeInTheDocument();
  });

  it('renders the label "Título" for the movie title input', () => {
    expect(titleInputLabel).toHaveTextContent('Título');
  });

  it('the title input initial value, "", comes from the AddMovie initial state, via "title"', () => {
    expect(titleInput).toHaveValue(initialState.title);
  });

  it('updates the component state when title input changes', () => {
    event.type(titleInput, 'my awesome movie title');

    expect(titleInput).toHaveValue('my awesome movie title');
  });
});

describe('<AddMovie /> component subtitle input', () => {
  it('renders a subtitle input so as the user can type the movie subtitle', () => {
    expect(subtitleInput).toBeInTheDocument();
    expect(subtitleInputLabel).toBeInTheDocument();
  });

  it('renders the label "Subtítulo" for the movie subtitle input', () => {
    expect(subtitleInputLabel).toHaveTextContent('Subtítulo');
  });

  it('the subtitle input initial value, "", comes from the AddMovie initial state, via "subtitle"', () => {
    expect(subtitleInput).toHaveValue(initialState.subtitle);
  });

  it('updates the component state when subtitle input changes', () => {
    event.type(subtitleInput, 'my awesome movie subtitle');

    expect(subtitleInput).toHaveValue('my awesome movie subtitle');
  });
});

describe('<AddMovie /> component image path input', () => {
  it('renders an image input so as the user can type the movie image path', () => {
    expect(imageInput).toBeInTheDocument();
    expect(imageInputLabel).toBeInTheDocument();
  });

  it('renders the label "Imagem" for the movie image path input', () => {
    expect(imageInputLabel).toHaveTextContent('Imagem');
  });

  it('the image input initial value, "", comes from the AddMovie initial state, via "imagePath"', () => {
    expect(imageInput).toHaveValue(initialState.imagePath);
  });

  it('updates the component state when image path input changes', () => {
    event.type(imageInput, 'http://localhost:3000/images/Appleseed_Alpha.jpg');
    expect(imageInput).toHaveValue('http://localhost:3000/images/Appleseed_Alpha.jpg');
  });
});

describe('<AddMovie /> component storyline input', () => {
  it('renders a storyline input so as the user can type the movie storyline', () => {
    expect(storylineInput).toBeInTheDocument();
    expect(storylineInputLabel).toBeInTheDocument();
  });

  it('renders the label "Sinopse" for the movie storyline input', () => {
    expect(storylineInputLabel).toHaveTextContent('Sinopse');
  });

  it('the storyline input initial value, "", comes from the AddMovie initial state, via "storyline"', () => {
    expect(storylineInput).toHaveValue(initialState.storyline);
  });

  it('updates the component state when movie storyline input changes', () => {
    const message = 'In the following movie, everyone dies.';
    fireEvent.change(storylineInput, { target: { value: message } });
    expect(storylineInput).toHaveValue(message);
  });
});

describe('<AddMovie /> component rating input', () => {
  it('renders a rating input so as the user can type the movie rating', () => {
    expect(ratingInput).toBeInTheDocument();
    expect(ratingInputLabel).toBeInTheDocument();
  });

  it('renders the label "Avaliação" for the movie rating input', () => {
    expect(ratingInputLabel).toHaveTextContent('Avaliação');
  });

  it('the rating input initial value, 0, comes from the AddMovie initial state, via "rating"', () => {
    expect(ratingInput).toHaveValue(initialState.rating);
  });

  it('updates the component state when movie rating input changes', () => {
    event.type(ratingInput, '1.5');

    expect(ratingInput).toHaveValue(1.5);
  });
});

describe('<AddMovie /> component genre selection', () => {
  const options = [
    { value: 'action', text: 'Ação' },
    { value: 'comedy', text: 'Comédia' },
    { value: 'thriller', text: 'Suspense' },
  ];


  it('renders a movie genre selection so as the user can select the movie genre', () => {
    expect(genreInput).toBeInTheDocument();
    expect(genreInputLabel).toBeInTheDocument();
    expect(genreOptions).toHaveLength(options.length);
  });

  it('renders the label "Gênero" for the movie genre selection', () => {
    expect(genreInputLabel).toHaveTextContent('Gênero');
  });

  it('renders all genre options inside the selection with expected text and values', () => {
    genreOptions.forEach((option, index) => {
      expect(option).toHaveTextContent(genreOptions[index].text);
      expect(option).toHaveValue(genreOptions[index].value);
    });
  });

  it('the genre selection initial value, "action", comes from the AddMovie initial state, via "genre"', () => {
    expect(genreInput).toHaveValue(initialState.genre);
  });

  it('updates the component state when movie genre selection changes', () => {
    event.selectOptions(genreInput, options[1].value);

    expect(genreInput).toHaveValue(genreOptions[1].value);
  });
});

describe('<AddMovie /> component creation button', () => {
  it('has "Adicionar filme" as content', () => {
    expect(sendButton).toHaveTextContent('Adicionar filme');
  });

  it('calls `onClick` received as props from AddMovie, using its current state as parameter', () => {
    event.type(titleInput, 'Harry Potter I');
    event.type(subtitleInput, 'Magical subtitle');
    fireEvent.change(storylineInput, { target: { value: 'The boy who lived.' } });
    event.type(storylineInput, 'The boy who lived.');
    event.type(ratingInput, '3.5');

    event.click(sendButton);

    expect(onClick).toHaveBeenCalled();
  });

  it('resets AddMovie to its initial state when clicked by the user', () => {
    event.type(titleInput, 'Harry Potter I');
    event.type(subtitleInput, 'Magical subtitle');
    fireEvent.change(storylineInput, { target: { value: 'The boy who lived.' } });
    event.type(ratingInput, '3.5');
    event.selectOptions(genreInput, 'comedy');

    expect(titleInput).toHaveValue('Harry Potter I');
    expect(subtitleInput).toHaveValue('Magical subtitle');
    expect(storylineInput).toHaveValue('The boy who lived.');
    expect(ratingInput).toHaveValue(3.5);
    expect(genreInput).toHaveValue('comedy');

    event.click(sendButton);

    expect(titleInput).toHaveValue('');
    expect(subtitleInput).toHaveValue('');
    expect(storylineInput).toHaveValue('');
    expect(ratingInput).toHaveValue(0);
    expect(genreInput).toHaveValue('action');
  });
});
