import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function History() {

  const [
    history,
    setHistory
  ] = useState([]);

  const [loading, setLoading] = useState(true);

  const deleteItem = async (time) => {
    try {
      await API.delete("/history", { data: { time } });
      setHistory((prev) => prev.filter((item) => item.time !== time));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    API.get("/history")
      .then((response) => {
        setHistory(response.data.reverse()); // Show newest first
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, []);

  return (

    <div className="history-container animate-fade-in">

      <div className="dashboard-header">
        <h1 className="main-title">Prediction Log</h1>
        <p className="subtitle">View previous digit predictions, model choices, and classification stats.</p>
      </div>

      <div className="card history-card">
        <div className="card-header">
          <h2>Past Analysis History</h2>
          <span className="history-count-badge">{history.length} records</span>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="loading-state">Loading history...</div>
          ) : history.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No predictions recorded yet. Go back to Workspace and try drawing some digits!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Selected Neural Network</th>
                    <th>Predicted Digit</th>
                    <th>Confidence</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index} className="history-row">
                      <td className="time-col">{item.time}</td>
                      <td>
                        <span className={`model-badge ${item.model}`}>
                          {item.model.toUpperCase()}
                        </span>
                      </td>
                      <td className="digit-col">
                        <span className="digit-bubble">{item.prediction}</span>
                      </td>
                      <td className="confidence-col">
                        <div className="confidence-cell">
                          <span className="confidence-num">
                            {(item.confidence || 0).toFixed(1)}%
                          </span>
                          <div className="mini-bar-bg">
                            <div
                              className="mini-bar-fill"
                              style={{ width: `${item.confidence || 0}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className="btn-delete"
                          onClick={() => deleteItem(item.time)}
                          title="Delete prediction"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </div>

  );

}

export default History;