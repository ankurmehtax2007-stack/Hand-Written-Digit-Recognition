import {
  useRef,
  useState
} from "react";

import API from "../services/api";

import Canvas from "../components/Canvas";
import ModelSelector from "../components/ModelSelector";
import PredictionCard from "../components/PredictionCard";
import ConfidencePanel from "../components/ConfidencePanel";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {

  const canvasRef = useRef();

  const [
    selectedModel,
    setSelectedModel
  ] = useState("cnn");

  const [
    prediction,
    setPrediction
  ] = useState(null);

  const [
    confidence,
    setConfidence
  ] = useState(null);

  const [
    probabilities,
    setProbabilities
  ] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const predictDigit = async () => {

    try {

      setLoading(true);
      setError("");

      const image =
        canvasRef.current
        .toDataURL("image/png");

      const base64 =
        image.split(",")[1];

      const response =
        await API.post(
          "/predict",
          {
            model: selectedModel,
            image: base64
          }
        );

      setPrediction(
        response.data.prediction
      );

      setConfidence(
        response.data.confidence
      );

      setProbabilities(
        response.data.probabilities
      );
    }
    catch (error) {

      setError(
        "Prediction failed. Make sure the backend server is running."
      );

      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (

    <div className="dashboard-container">

      <div className="dashboard-header animate-fade-in">
        <h1 className="main-title">Digit Recognition AI</h1>
        <p className="subtitle">
          Draw a single digit (0-9) inside the dark canvas, select a deep learning architecture, and watch the AI classify it.
        </p>
      </div>

      <div className="dashboard-grid">

        <div className="card draw-card animate-slide-up">
          <div className="card-header">
            <span className="card-badge">STEP 1</span>
            <h2>Canvas & Architecture</h2>
          </div>

          <div className="card-body">
            <ModelSelector
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />

            <Canvas
              canvasRef={canvasRef}
            />

            <div className="action-buttons">
              <button
                className="btn btn-primary"
                onClick={predictDigit}
                disabled={loading}
              >
                {loading ? "Analyzing Drawing..." : "Predict Digit"}
              </button>
            </div>

            <ErrorMessage
              message={error}
            />
          </div>
        </div>

        <div className="card results-card animate-slide-up-delayed">
          <div className="card-header">
            <span className="card-badge">STEP 2</span>
            <h2>AI Analysis</h2>
          </div>

          <div className="card-body result-body">
            {loading && <LoadingSpinner />}

            {!loading && prediction === null && (
              <div className="empty-state animate-fade-in">
                <div className="empty-icon">✍️</div>
                <h3>Awaiting Input</h3>
                <p>Use the canvas to sketch a digit, then click the Predict button to trigger the analysis neural network.</p>
              </div>
            )}

            {!loading && prediction !== null && (
              <div className="result-content animate-fade-in">
                <PredictionCard
                  prediction={prediction}
                  confidence={confidence}
                  model={selectedModel}
                />

                <ConfidencePanel
                  probabilities={probabilities}
                />
              </div>
            )}
          </div>
        </div>

      </div>

    </div>

  );

}

export default Home;