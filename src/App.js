import React from 'react';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  constructor () {
    super();
    this.state = BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  updateBookShelf = (book, updatedShelf) => {
    const { books } = this.state;

    const bookIndex = books.findIndex((key) => {
      return key.id === book.id;
    });

    let stateBooks = Object.assign([], books);

    if (bookIndex === -1) {
      const newBook = Object.assign({}, book);
      newBook.shelf = updatedShelf;
      stateBooks.push(newBook);
    } else {
      stateBooks[bookIndex] = Object.assign({}, stateBooks[bookIndex]);
      stateBooks[bookIndex].shelf = updatedShelf;
    }

    BooksAPI.update(book, updatedShelf).then(
      this.setState({ books: stateBooks })
    );
  };

  render () {
    const { books } = this.state;

    if (!books) {
      return null;
    }

    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <MainPage
            books={ books }
            updateBookShelf={ this.updateBookShelf }
          />
        ) } />
        
        <Route path="/SearchPage" render={ () => (
          <SearchPage
            MainPageBooks={ books }
            updateBookShelf={ this.updateBookShelf }
          />
        ) } />
      </div>
    );
  }
}

export default BooksApp;