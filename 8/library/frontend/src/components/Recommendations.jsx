import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, FAVORITE_GENRE } from '../queries'

const Recommendations = () => {
  const { data: favoriteGenreData } = useQuery(FAVORITE_GENRE)
  const { data: booksData} = useQuery(BOOKS_BY_GENRE, {
    variables: { genreToSearch: favoriteGenreData?.me?.favoriteGenre },
    skip: !favoriteGenreData
  })

  if (!booksData) {
    return <div>loading...</div>
  }

  const favoriteGenre = favoriteGenreData.me.favoriteGenre
  const books = booksData.allBooks

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th>book</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations