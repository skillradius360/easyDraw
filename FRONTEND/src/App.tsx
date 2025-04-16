import { useEffect, useState } from 'react';

export default function MyCanvasComponent() {
  type dimensionsType = {
    x1:number
    y1:number
    x2:number
    y2:number
  }
  const [dimensions,setDimesions]= useState<dimensionsType>({x1:20,y1:10,x2:10,y2:10})


  useEffect(() => {
    const c = document.getElementById("myCanvas") as HTMLCanvasElement;
    const ctx = c.getContext("2d");
    ctx?.strokeRect(...Object.values(dimensions))
  }, []);

  return (
    <div>
      <canvas className="h-[50vh] w-[50vw] ring-2 ring-amber-500 m-32" id="myCanvas"></canvas>
    </div>
  );
}
