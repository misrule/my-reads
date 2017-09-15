import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'


class BookCase extends React.Component {

  filterBooks = (books, shelf) => {
    return books.filter((b) => b.shelf === shelf)
  }

  render() {

    const { books } = this.props
    const booksRead = this.filterBooks(books, 'read')
    const booksWantToRead = this.filterBooks(books, 'wantToRead')
    const booksCurrentlyReading = this.filterBooks(books, 'currentlyReading')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.libraryName}</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf shelfName="Currently Reading" 
              books={booksCurrentlyReading} />

            <BookShelf shelfName="Want to Read" 
              books={booksWantToRead} />

            <BookShelf shelfName="Read" 
              books={booksRead} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookCase
