import React from 'react';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  movingShelves = (book, shelf) => {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <MainPage books={this.state.books}
          movingShelves={this.movingShelves}
          />)}/> 
         
         <Route path="/search" render={() => (
          <SearchPage
          movingShelves={this.movingShelves}
          books={this.state.books}
          />)}/>
        
        
      </div>
    )
  }
}
export default BooksApp;
