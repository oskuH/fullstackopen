const ErrorNotification = ({ message }) => {
  const notificationStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  if (message === null) {
    return null;
  }

  return (
    <dialog id="error-notification" style={notificationStyle} open>
      {message}
    </dialog>
  );
};

export default ErrorNotification;