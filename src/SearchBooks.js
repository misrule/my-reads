import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksApi from './BooksAPI'
import Book from './Book'


class SearchBooks extends React.Component {

  state = {
    newBooks: [],
    searchTerm: '',
    zeroResults: true
  }

  updateSearchTerm = (term) => {
    if (term) {
      this.setState({ searchTerm: term })
      this.fetchBooks(term)
    } else this.setState({ newBooks: [], searchTerm: '', zeroResults: false })
  }

  /*
   * I'm using the intermediate variable `foundBooks` here to explicitly
   * set my `newBooks` state-variable to an empty array when there are no
   * search results. This is to workaround a runtime error I was getting
   * in the render function : `Uncaught (in promise) TypeError: newBooks.map is not a function`
   * This was happening on each keypress that returned zero books. A bit ugly
   * but it appears to function correctly.
   */
  fetchBooks = (term) => {
    BooksApi.search(term, 25).then((books) => {
      let foundBooks = books.length > 0 ? books : []

      this.setState({ newBooks: foundBooks })
      foundBooks.length > 0 
        ? this.setState({zeroResults: false})
        : this.setState({zeroResults: true})
    })
  }

  render() {
    
    const { newBooks, searchTerm, zeroResults } = this.state
    const { books, onChangeShelf } = this.props
    
    const displayBooks = newBooks.map((book) => {
      let target = books.find((b) => b.id === book.id)
      return (target === undefined ? Object.assign(book, { shelf: 'none' }) : target)
    })

    return(

      <div className="search-books">
        <div className="search-books-bar">
          <Link 
            to="/"
            className="close-search" 
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" 
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(event) => this.updateSearchTerm(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">   
          <ol className="books-grid">
            {
              displayBooks.length > 0 && (
                displayBooks.map((book) => 
                  <li key={book.id}>
                    <Book book={book} onChangeShelf={onChangeShelf}/>
                  </li>)
                )
            }
            { 
              
              zeroResults && (
              <div>
                <h2 style={{ color: '#808B96' }}>No Results</h2>
              </div>)
            }
          </ol>
        </div>
      </div>
                              
    );
  }
}

export default SearchBooks;