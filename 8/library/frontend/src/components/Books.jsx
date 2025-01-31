import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ALL_BOOKS } from '../queries'

const Books = () => {
  const [genreFilter, setGenreFilter] = useState('')

  const { data: booksByGenreData } = useQuery(BOOKS_BY_GENRE, {
    variables: { genreToSearch: genreFilter }
  })
  const { data: booksData } = useQuery(ALL_BOOKS, {
    skip: !booksByGenreData
  })

  if (!booksData) {
    return <div>loading...</div>
  }

  const filteredBooks = booksByGenreData.allBooks
  const genresSet = new Set()
  booksData.allBooks.forEach((book) => {
    book.genres.forEach((genre) => {
      genresSet.add(genre)
    })
  })
  const allGenres = (Array.from(genresSet))
  

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        { genreFilter ? (
          <p>Genrefilter set to: {genreFilter}</p>
        ) : (
          <p>Genrefilter set to: all genres</p>
        )}
        {allGenres.map((genre) => (
          <button 
          key={genre} 
          type='button' 
          onClick={() => setGenreFilter(genre)}>
            {genre}
          </button>
        ))}
        <button 
        key='allgenres'
        type='button'
        onClick={() => setGenreFilter(null)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books