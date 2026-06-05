function ConfidencePanel({
  probabilities
}) {

  if (!probabilities)
    return null;

  // Find the index of the maximum probability
  const maxIdx = probabilities.indexOf(Math.max(...probabilities));

  return (

    <div className="confidence-panel-container">

      <h3 className="section-label">
        Probability Distribution
      </h3>

      <div className="probabilities-list">
        {
          probabilities.map(
            (prob,index) => {
              const pct = (prob*100).toFixed(1);
              const isMax = index === maxIdx;
              return (
                <div
                  key={index}
                  className={`probability-row ${isMax ? "highest" : ""}`}
                >
                  <span className="digit-label">Digit {index}</span>
                  <div className="bar-wrapper">
                    <div
                      className="bar-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="digit-percent">{pct}%</span>
                </div>
              );
            }
          )
        }
      </div>

    </div>

  );

}

export default ConfidencePanel;