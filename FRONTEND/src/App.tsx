import { useEffect, useState,useRef } from 'react';

export default function MyCanvasComponent() {

const mouseCoord= useRef<{clientX:number,clientY:number}>({clientX:0,clientY:0})
const [painting,setPainting]= useState(false)


useEffect(()=>{
  const canvasPointer = document?.querySelector("#myCanvas")
  

  function startTracking(e:MouseEvent){
    e.preventDefault()
    setPainting(true)
  }
  function stopTracking(e){
    e.preventDefault()
    setPainting(false)
  }
  function draw(e){
    e.preventDefault()
    if(painting==false) return 
    const ctx = canvasPointer.getContext("2d") 
    ctx.lineWidth=10
    ctx.lineCap="round"
    ctx.beginPath();
    ctx.moveTo(mouseCoord.current.clientX, mouseCoord.current.clientY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    mouseCoord.current={clientX:e.clientX,clientY:e.clientY}
    console.log(mouseCoord.current, painting)
  }
 

  canvasPointer?.addEventListener("mousedown",startTracking)
  
  canvasPointer?.addEventListener("mouseup",stopTracking)
  
  canvasPointer?.addEventListener("mousemove",draw)
  
  return()=>{
    canvasPointer?.removeEventListener("mousedown",startTracking)
  
    canvasPointer?.removeEventListener("mouseup",stopTracking)
    
    canvasPointer?.removeEventListener("mousemove",draw)
  }
},[painting])
  

  return (
    <div>
      <canvas  width={1080}
  height={1920}className="h-[1920px] w-[1080px] ring-2 ring-amber-500 m-32" id="myCanvas" ></canvas>
    </div>
  );
}
