import { useState, useEffect } from "react";
import img1 from "../assets/img01.png";
import img2 from "../assets/img02.png";
import img3 from "../assets/img03.png";
import img4 from "../assets/img04.png"
import img5 from "../assets/img05.png"
import img6 from "../assets/img06.png"
import img7 from "../assets/img07.png"

const slides = [img1,img2,img3,img4,img5,img6,img7];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

return (
  <div className="w-full bg-cover ">
    <div
      className="flex transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`slide-${i}`}
          className="w-full h-100 md:h-125 object-cover shrink-0"
        />
      ))}
    </div>
  </div>
);
}