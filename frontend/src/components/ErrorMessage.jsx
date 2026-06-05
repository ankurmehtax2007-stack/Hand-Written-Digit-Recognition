function ErrorMessage({ message }) {

  if (!message) return null;

  return (
    <div className="error-container animate-fade-in">
      {message}
    </div>
  );

}

export default ErrorMessage;