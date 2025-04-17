import { useEffect, useState } from 'react';

export default function MyCanvasComponent() {
  type dimensionsType = {
    x1:number
    y1:number
    x2:number
    y2:number
  }
  const [dimensions,setDimesions]= useState<dimensionsType>({x1:0,y1:0,x2:0,y2:0})
const [mouseCoord,setMouseCoord]= useState<{x:number,y:number}>({x:0,y:0})

  useEffect(() => {

    const c = document.getElementById("myCanvas") as HTMLCanvasElement;
    const ctx = c.getContext("2d");
    ctx?.strokeRect(dimensions.x1,dimensions.y1,mouseCoord.x,mouseCoord.y)

  }, [mouseCoord,dimensions.x1,dimensions.y1]);

  useEffect(()=>{
   

  },[])

function mouseHandler(event:MouseEvent){
  setMouseCoord({x:event.offsetX,y:event.offsetY})
  setDimesions({x1:event.clientX,y1:event.clientY,x2:event.offsetX,y2:event.offsetY})
  console.log(event)
}
  

  return (
    <div>
      <canvas className="h-[50vh] w-[50vw] ring-2 ring-amber-500 m-32" id="myCanvas" onMouseDown={(e)=>{
      // console.log(e)
      
    e.target.addEventListener("mousemove",mouseHandler)

    e.target.addEventListener("mouseleave",(g)=>{
      e.target.removeEventListener("mousemove",mouseHandler)
    })
    
    e.target.addEventListener("mouseup",(h)=>{
      e.target.removeEventListener("mousedown",mouseHandler)
    })

      } 
}></canvas>
    </div>
  );
}
