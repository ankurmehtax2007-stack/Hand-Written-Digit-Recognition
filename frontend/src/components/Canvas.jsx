import {
  useEffect,
  useRef,
  useState
} from "react";

function Canvas({
  canvasRef
}) {

  const drawing = useRef(false);

  const [tiltTransform, setTiltTransform] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
    transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)"
  });

  useEffect(() => {

    clearCanvas();

  }, []);

  const clearCanvas = () => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.strokeStyle = "white";
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Glowing stroke shadow effect
    ctx.shadowColor = "#a855f7"; // Neon purple shadow glow
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const updateTilt = (x, y, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt max 8 degrees
    const tiltX = ((x - centerX) / centerX) * 8;
    const tiltY = -((y - centerY) / centerY) * 8;

    setTiltTransform({
      transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateZ(12px)`,
      transition: "none" // Immediate response during drawing
    });
  };

  const startDrawing = (e) => {
    drawing.current = true;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    updateTilt(x, y, canvas);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    drawing.current = false;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();

    // Smoothly spring back to normal
    setTiltTransform({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)"
    });
  };

  const draw = (e) => {
    if (!drawing.current) return;
    if (e.cancelable) e.preventDefault();

    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    updateTilt(x, y, canvas);

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  return (

    <div className="canvas-container">

      <div 
        className="canvas-wrapper"
        style={tiltTransform}
      >
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="drawing-canvas"
        />
        <div className="canvas-instruction">
          Draw a single digit inside the box
        </div>
      </div>

      <div className="canvas-actions">
        <button
          className="btn btn-secondary"
          onClick={clearCanvas}
        >
          Clear Canvas
        </button>
      </div>

    </div>

  );

}

export default Canvas;