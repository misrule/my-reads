import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookCase extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    libraryConfig: PropTypes.object.isRequired
  }

  filterBooks = (books, shelf) => {
    return books.filter((b) => b.shelf === shelf)
  }

  render() {

    const { books, libraryConfig, onChangeShelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{libraryConfig.libraryName}</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              libraryConfig.shelves.map( shelf => (
                <BookShelf
                  key={shelf.id}
                  shelfName={shelf.name}
                  books={this.filterBooks(books, shelf.id)}
                  onChangeShelf={onChangeShelf} 
                />
              ))
            }     
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
