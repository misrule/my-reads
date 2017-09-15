import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'

import BookCase from './BookCase'
import SearchBooks from './SearchBooks'

import * as BooksApi from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksApi.getAll().then((bks) => {
      this.setState({ books: bks })
    })
  }
  


  render() {


    return (
      <div className="app">
        <Route exact path="/" render={() => (

          <BookCase 
            libraryName="My Reads"
            books={this.state.books} 
          />
            

        )}/>
        <Route path="/search" component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp
