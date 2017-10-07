import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {

  render() {

    const { books, onChangeShelf } = this.props

    return(

      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

              {
                books.length > 0 && (
                  books.map( book => (
                    <li key={book.id}>
                      <Book book={book} onChangeShelf={onChangeShelf} />
                    </li>
                )))
              }
              {
                books.length <= 0 && (
                  <div><h4 style={{ color: '#808B96' }}>No books on this bookshelf yet.</h4></div>
                )
              }
          </ol>
        </div>
      </div>

    );
  }
}

export default BookShelf;