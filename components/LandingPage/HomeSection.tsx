"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/Hero-01.jpeg",
  },
  {
    image: "/Hero-02.jpeg",
  },
  {
    image: "/Hero-03.jpeg",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);


  const nextSlide = () => {
    setActive((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };


  const previousSlide = () => {
    setActive((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
        relative
        h-[420px]
        w-full
        overflow-hidden
        bg-gray-100
        sm:h-[450px]
        md:h-[480px]
        lg:h-[520px]
        xl:h-[540px]
      "
    >

      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`
              absolute
              inset-0
              transition-opacity
              duration-700
              ease-in-out
              ${active === index
                ? "opacity-100"
                : "opacity-0"
              }
            `}
          >
            <Image
              src={slide.image}
              alt="Bihar government schemes"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>
        ))}
      </div>


      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="
          absolute
          left-4
          top-1/2
          z-20
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-white/90
          shadow-md
          backdrop-blur-sm
          transition
          duration-200
          hover:scale-105
          hover:bg-white
          md:left-6
          md:h-11
          md:w-11
        "
      >
        <ChevronLeft
          size={22}
          strokeWidth={2}
          className="text-gray-800"
        />
      </button>


      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="
          absolute
          right-4
          top-1/2
          z-20
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-white/90
          shadow-md
          backdrop-blur-sm
          transition
          duration-200
          hover:scale-105
          hover:bg-white
          md:right-6
          md:h-11
          md:w-11
        "
      >
        <ChevronRight
          size={22}
          strokeWidth={2}
          className="text-gray-800"
        />
      </button>
    </section>
  );
}