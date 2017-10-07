import React from 'react'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component {

  render() {

    const { book, onChangeShelf } = this.props
    const coverImage = book.imageLinks 
      ? book.imageLinks.thumbnail 
      : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'
    

    return (
      <div className="book" >
        <div className="book-top">
          <div className="book-cover" 
            style={{backgroundImage: `url("${coverImage}")`, width: 128, height: 193}}
          >
            
          </div>
          <ShelfChanger 
            book={book} 
            onChangeShelf={onChangeShelf} />
        </div>

        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>      
    );
  }
}

export default Book