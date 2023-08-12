import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const { message, nType } = useSelector(({ notification }) => notification);
  let className;
  let variant;

  if (nType === "success") {
    className = "success-notification";
    variant = "success";
  } else if (nType === "error") {
    className = "error-notification";
    variant = "danger";
  }

  if (message === null) {
    return null;
  }

  return (
    <Alert className={className} variant={variant}>
      {message}
    </Alert>
  );
};

export default Notification;
