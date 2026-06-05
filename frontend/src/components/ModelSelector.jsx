function ModelSelector({
  selectedModel,
  setSelectedModel
}) {

  const models = [
    { id: "perceptron", name: "Perceptron", desc: "Linear Layer Classifier" },
    { id: "ann", name: "ANN", desc: "Multilayer Perceptron Network" },
    { id: "cnn", name: "CNN", desc: "Convolutional Neural Network" }
  ];

  return (

    <div className="model-selector-container">

      <h3 className="section-label">Selected Model Architecture</h3>

      <div className="model-cards-grid">
        {models.map((m) => (
          <div
            key={m.id}
            className={`model-card ${selectedModel === m.id ? "active" : ""}`}
            onClick={() => setSelectedModel(m.id)}
          >
            <div className="model-indicator" />
            <div className="model-info">
              <span className="model-name">{m.name}</span>
              <span className="model-desc">{m.desc}</span>
            </div>
          </div>
        ))}
      </div>

    </div>

  );

}

export default ModelSelector;