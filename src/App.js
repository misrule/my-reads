import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'

import BookCase from './BookCase'
import SearchBooks from './SearchBooks'

import * as BooksApi from './BooksAPI'


class BooksApp extends React.Component {

  state = {
    books: [],
    config: {
      "libraryName":"My Reads2",
      "shelves":[
        {
          "id":"currentlyReading",
          "name":"Currently Reading"
        },
        {
          "id":"wantToRead",
          "name":"Want to Read"
        },
        {
          "id":"read",
          "name":"Read"
        }
      ]
    }
  }

  componentDidMount() {
    BooksApi.getAll().then((bks) => {
      this.setState({ books: bks })
    })
  }
  
  moveBook = (book, shelf) => {
    BooksApi.update(book, shelf).then( _ => {
      let updated = this.state.books.filter( b => b.id !== book.id )
      updated.push(Object.assign(book, { shelf }))
      this.setState({ books: updated })      
    })
  }

  render() {

    const { books, config } = this.state
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookCase 
            libraryConfig={config}
            books={books}
            onChangeShelf={this.moveBook}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks 
            books={books} 
            onChangeShelf={this.moveBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
