function PredictionCard({
  prediction,
  confidence,
  model
}) {

  if (
    prediction === null
  ) return null;

  return (

    <div className="prediction-display-card">
      <div className="prediction-main">
        <span className="prediction-label">AI PREDICTION</span>
        <div className="predicted-digit-glow">{prediction}</div>
      </div>
      <div className="prediction-details">
        <div className="detail-row">
          <span className="detail-label">Model Used</span>
          <span className="detail-value model-tag">{model.toUpperCase()}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Confidence</span>
          <span className="detail-value confidence-value">
            {(confidence || 0).toFixed(1)}%
          </span>
        </div>
        <div className="confidence-bar-container">
          <div 
            className="confidence-bar-fill" 
            style={{ width: `${confidence || 0}%` }}
          />
        </div>
      </div>
    </div>

  );

}

export default PredictionCard;