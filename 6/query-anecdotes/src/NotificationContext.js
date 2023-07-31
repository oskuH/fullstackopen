import { createContext, useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  useEffect(() => {
    let timeoutId

    if (notification) {
      timeoutId = setTimeout(() => {
        notificationDispatch({ type: 'HIDE' })
      }, 5000)
    }

    return () => clearTimeout(timeoutId)
  }, [notification])

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext