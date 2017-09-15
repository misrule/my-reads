import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksApi from './BooksAPI'
import Book from './Book'


class SearchBooks extends React.Component {

  state = {
    newBooks: [],
    searchTerm: '',
    zeroResults: false
  }

  updateSearchTerm = (term) => {
    if (term) {
      this.setState({ searchTerm: term })
      this.fetchBooks(term)
    } else this.setState({ newBooks: [], searchTerm: '', zeroResults: false })
  }

  fetchBooks = (term) => {
    BooksApi.search(term, 25).then((books) => {
      this.setState({ newBooks: books })
    }).length > 0 
      ? this.setState({zeroResults: false})
      : this.setState({zeroResults: true})
  }

  render() {

    const { newBooks, searchTerm, zeroResults } = this.state

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
                  newBooks.length > 0 && (
                    newBooks.map((book) => 
                      <li key={book.id}>
                        <Book book={book} />
                      </li>)
                    )
                }
                { 
                  zeroResults &&
                  <div>
                    <h2 style={{ color: '#808B96' }}>No Results</h2>
                  </div>
                }
            </ol>
          
          </div>
        </div>
                              
    );
  }
}

export default SearchBooks;