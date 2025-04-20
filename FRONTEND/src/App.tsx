import { useEffect, useState, useRef } from 'react';

export default function MyCanvasComponent() {
  const mouseCoord = useRef({ x: 0, y: 0 });
  const painting = useRef(false);
  const [weight, setWeight] = useState(4);
  const [color, setColor] = useState("red");
  const [scaled, setScaled] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stack,setStack]=useState([{}]
  )

  useEffect(() => {
    const canvas = canvasRef.current;
    const mainDiv = document.getElementById("parentDiv");
    if (!canvas || !mainDiv) return;

    canvas.width = mainDiv.offsetWidth;
    canvas.height = mainDiv.offsetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(scaled, scaled); // Apply scaling once

    function getCanvasRelativeCoords(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    function startTracking(e: MouseEvent) {
      painting.current = true;
      mouseCoord.current = getCanvasRelativeCoords(e);
    }

    function stopTracking() {
      painting.current = false;
    }

    function drawLine(e: MouseEvent) {
      e.preventDefault();
      if (!painting.current) return;
      const { x, y } = getCanvasRelativeCoords(e);
      ctx.lineWidth = weight;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(mouseCoord.current.x, mouseCoord.current.y);
      ctx.lineTo(x, y);
      mouseCoord.current = { x: x, y: y };
      ctx.strokeStyle = color;
      ctx.stroke();
      console.log(e)
      ctx.scale(scaled,scaled)
    }

    function drawRect(e: MouseEvent) {

      if (!painting.current) return;

      const { x, y } = getCanvasRelativeCoords(e);
      const startX = mouseCoord.current.x;
      const startY = mouseCoord.current.y;

      const width = x - startX;
      const height = y - startY;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear previous rect
      ctx.lineWidth = weight;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.rect(startX, startY, width, height);
     
      ctx.stroke();
    }

    canvas.addEventListener("mousedown", startTracking);
    canvas.addEventListener("mouseup", stopTracking);
    canvas.addEventListener("mousemove", drawRect);

    return () => {
      canvas.removeEventListener("mousedown", startTracking);
      canvas.removeEventListener("mouseup", stopTracking);
      canvas.removeEventListener("mousemove", drawRect);
    };
  }, [color, scaled, weight]);

  return (
    <div className='w-screen h-screen border-5 border-solid border-green-500 p-0 m-0 relative' id="parentDiv">
      <canvas
        ref={canvasRef}
        className="border-2 border-solid border-red-500 cursor-crosshair absolute"
        id="myCanvas"
      ></canvas>
    </div>
  );
}



