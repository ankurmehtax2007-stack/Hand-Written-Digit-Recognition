function LoadingSpinner() {

  return (
    <div className="spinner-container animate-fade-in">
      <div className="spinner"></div>
      <h3>AI is processing...</h3>
      <p>Running inference models across selected weights.</p>
    </div>
  );

}

export default LoadingSpinner;