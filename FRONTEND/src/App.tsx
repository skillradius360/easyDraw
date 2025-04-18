import { useEffect, useState } from 'react';

export default function MyCanvasComponent() {
  type dimensionsType = {
    x:number
    y:number
    height:number
    width:number
  }
const [mouseCoord,setMouseCoord]= useState<{clientX:number,clientY:number}>({clientX:0,clientY:0})
const [painting,setPainting]= useState(false)


    
    
    useEffect(()=>{
  document?.querySelector("#myCanvas")?.addEventListener("mousedown",()=>{
    setPainting(true)
  })
  
  document?.querySelector("#myCanvas")?.addEventListener("mouseup",()=>{
    setPainting(false)
  })
  
  document?.getElementById("#myCanvas")?.addEventListener("mousemove",(e)=>{
    if(!painting) return 
    const c = document.getElementById("myCanvas") as HTMLCanvasElement;
    const ctx = c?.getContext("2d");
    ctx.lineWidth=10
    ctx.lineCap="round"
    ctx.lineTo(e.clientX,e.clientY)
    ctx.stroke()
    console.log(e)
  })
  
},[mouseCoord,painting])
  

  return (
    <div>
      <canvas className="h-[768px] w-[1366px] ring-2 ring-amber-500 m-32" id="myCanvas" ></canvas>
    </div>
  );
}
