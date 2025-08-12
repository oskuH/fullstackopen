const SuccessNotification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
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
    <div className="success-message" style={notificationStyle}>
      {message}
    </div>
  );
};

export default SuccessNotification;