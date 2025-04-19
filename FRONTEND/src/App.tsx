import { useEffect, useState,useRef } from 'react';

export default function MyCanvasComponent() {

const mouseCoord= useRef({offsetX:0,offsetY:0})
const painting= useRef(false)
const [weight,setWeight] = useState(4)
const [color,setColor] = useState("red")


useEffect(()=>{
  const canvasPointer = document?.querySelector("#myCanvas")
  const ctx = canvasPointer.getContext("2d") 
  

  function startTracking(e:MouseEvent){
    e.preventDefault()
    painting.current=true
    mouseCoord.current={offsetX:e.offsetX,offsetY:e.offsetY}
    drawLine(e)
  }
  function stopTracking(e){
    e.preventDefault()
    painting.current=false
  }
  function drawLine(e){
    e.preventDefault()
    if(!painting.current) return 
    ctx.lineWidth=weight
    ctx.lineCap="round"
    // ctx.lineJoin= "line"
    ctx.beginPath();
    ctx.moveTo(mouseCoord.current.offsetX, mouseCoord.current.offsetY);
    ctx.lineTo(e.offsetX, e.offsetY);
    mouseCoord.current={offsetX:e.offsetX,offsetY:e.offsetY}
    ctx.strokeStyle= color
    ctx.stroke();
    
    console.log(e, painting)
  }
 

  canvasPointer?.addEventListener("mousedown",startTracking)
  
  canvasPointer?.addEventListener("mouseup",stopTracking)
  
  canvasPointer?.addEventListener("mousemove",drawLine)
  
  return()=>{
    canvasPointer?.removeEventListener("mousedown",startTracking)
  
    canvasPointer?.removeEventListener("mouseup",stopTracking)
    
    canvasPointer?.removeEventListener("mousemove",draw)
  }
},[])
  

  return (
    <div className='h-screen w-screen border-2 border-solid border-red-500'>
      <canvas height={1080} width={1920}
 className="border-2 border-solid border-red-500 h-full w-full" id="myCanvas" ></canvas>
    </div>
  );
}
