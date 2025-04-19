import { useEffect, useState,useRef} from 'react';

export default function MyCanvasComponent() {

const mouseCoord= useRef({clientX:0,clientY:0})
const painting= useRef(false)
const [weight,setWeight] = useState(4)
const [color,setColor] = useState("red")
const [scaled,setScaled]= useState(1)


useEffect(()=>{
  const canvasPointer:HTMLElement = document?.querySelector("#myCanvas")
  const mainDiv = document?.querySelector("#parentDiv")
  canvasPointer.height = mainDiv.offsetHeight;
  canvasPointer.width  = mainDiv.offsetWidth;
  

  const ctx = canvasPointer.getContext("2d") 
  
 

  function getCanvasRelativeCoords(e: MouseEvent) {
    const rect = canvasPointer.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
  
  function startTracking(e: MouseEvent) {
    e.preventDefault();
    painting.current = true;
    const { x, y } = getCanvasRelativeCoords(e);
    mouseCoord.current = { clientX: x, clientY: y };
    drawLine(e);
  }

  function stopTracking(e){
    e.preventDefault()
    painting.current=false
  }
  
  function drawLine(e: MouseEvent) {
    e.preventDefault();
    if (!painting.current) return;
  
    const { x, y } = getCanvasRelativeCoords(e);
  
    ctx.lineWidth = weight;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(mouseCoord.current.clientX, mouseCoord.current.clientY);
    ctx.lineTo(x, y);
    mouseCoord.current = { clientX: x, clientY: y };
    ctx.strokeStyle = color;
    ctx.stroke();
    console.log(e)
    ctx.scale(scaled,scaled)
  }
  
 

  canvasPointer?.addEventListener("mousedown",startTracking)
  
  canvasPointer?.addEventListener("mouseup",stopTracking)
  
  canvasPointer?.addEventListener("mousemove",drawLine)
  
  return()=>{
    canvasPointer?.removeEventListener("mousedown",startTracking)
  
    canvasPointer?.removeEventListener("mouseup",stopTracking)
    
    canvasPointer?.removeEventListener("mousemove",drawLine)
  }
},[])
  

  return (
    <div className='w-screen h-screen border-5 border-solid border-green-500 p-0 m-0 relative' id="parentDiv">
      <canvas
 className="border-2 border-solid border-red-500 cursor-crosshair absolute" id="myCanvas" ></canvas>
    </div>
  );
}
