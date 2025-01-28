import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  interface diaryEntry {
    id: number,
    date: string,
    weather: string,
    visibility: string,
    comment?: string
  }

  interface ValidationError {
    message: string;
    errors: Record<string, string[]>
  }

  const [errorMessage, setErrorMessage] = useState('')
  const [diaries, setDiaries] = useState<diaryEntry[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    axios.get<diaryEntry[]>('http://localhost:3000/api/diaries')
      .then(response => {
        setDiaries(response.data)
      })
  }, [])

  const ErrorNotification = ({ message }: { message: string }) => {
    const notificationStyle = {
      color: 'red'
    }
  
    if (message === '') {
      return null
    }
  
    return (
      <div className='error-message' style={notificationStyle}>
        {message}
      </div>
    )
  }

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    }
    axios.post<diaryEntry>('http://localhost:3000/api/diaries', newDiaryEntry)
      .then(response => {
        setDiaries(diaries.concat(response.data))
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
      })
      .catch(error => {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
          const errorMessage = (error.response?.data)
          setErrorMessage(String(errorMessage))
          setTimeout(() => {
            setErrorMessage('')  
          }, 5000)
        } else {
          console.error(error)
        }
      })
  }

  return (
    <div>
      <h3>Add new entry</h3>
      <ErrorNotification message={errorMessage} />
      <form onSubmit={diaryEntryCreation}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          great <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('great')}
          />
          good <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('good')}
          />
          ok <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('ok')}
          />
          poor <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility('poor')}
          />
        </div>
        <div>
          weather
          sunny <input
            type="radio"
            name="weather"
            onChange={() => setWeather('sunny')}
          />
          rainy <input
            type="radio"
            name="weather"
            onChange={() => setWeather('rainy')}
          />
          cloudy <input
            type="radio"
            name="weather"
            onChange={() => setWeather('cloudy')}
          />
          stormy <input
            type="radio"
            name="weather"
            onChange={() => setWeather('stormy')}
          />
          windy <input
            type="radio"
            name="weather"
            onChange={() => setWeather('windy')}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h3>Diary entries</h3>
      {diaries.map(diaryEntry =>
        <div key={diaryEntry.id}>
          <p><b>{diaryEntry.date}</b></p>
          <p>
            <span>visibility: {diaryEntry.visibility}</span><br></br>
            <span>weather: {diaryEntry.weather}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default App;