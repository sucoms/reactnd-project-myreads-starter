import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchPage extends Component {

    constructor () {
        super();
        this.state = {
            query: '',
            books: []
        };
    }

       updateQuery = (query) => {
           const { MainPageBooks } = this.props;

           this.setState({ query: query });
           const trimmedQuery = query.trim();
           if (trimmedQuery === '') {
           this.setState({ books: [] });
                           return ;
           }
           BooksAPI.search(trimmedQuery, 5).then((response) => {
             if (response.error || !response){
               this.setState({ books: []})
             }
             else if (response && response.length) {
               const books = response.map((book) => {
                 const libBook = MainPageBooks.find((libBook) => libBook.id === book.id);
                 const shelf = libBook ? libBook.shelf : 'none';
                  return {
                           id: book.id,
                           shelf: shelf,
                           authors: book.authors !== undefined ? book.authors : 'Author name not found',
                           title: book.title !== undefined ? book.title : 'Book Title not found',

                           imageLinks: {
                                   thumbnail: book.imageLinks !== undefined  ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'
                           }

                       };
                   });
                   this.setState({ books });
               }
           });
       };
    render () {
        const { books } = this.state;
        const { updateBookShelf } = this.props;

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link
                to="/"
                className="close-search"
              >
              Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                    type="text"
                    placeholder="Search by title or author"
                    onChange={ (event) => this.updateQuery(event.target.value) }
                    value = { this.state.query }
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                    {
                        books.map((book) => (
                            <li key={ book.id }>
                                <Book
                                    id={ book.id }
                                    shelf={ book.shelf }
                                    authors={ book.authors }
                                    title={ book.title }
                                    imageLinks={ book.imageLinks }
                                    updateBookShelf={ updateBookShelf }
                                />
                            </li>
                        ))
                    }
              </ol>
            </div>
          </div>
        );
    }
}

export default SearchPage;