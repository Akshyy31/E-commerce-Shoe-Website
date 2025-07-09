import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroBanner() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-6 py-12">
      <div className="relative bg-white w-full max-w-7xl h-[550px] rounded-xl overflow-hidden shadow-md flex items-center justify-between">
        {/* Left section with background & shoe */}
        <div className="relative w-1/2 h-full bg-white flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[#f86132]/10"></div>

          {/* Red square and stripes */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2">
            <div className="w-48 h-64 bg-[#f86132] z-0 opacity-90 rounded-md"></div>
            <div className="absolute bottom-0 left-0 flex gap-2 px-2">
              <div className="w-2 h-28 bg-[#d1411f]"></div>
              <div className="w-2 h-28 bg-[#c1371c]"></div>
              <div className="w-2 h-28 bg-[#b02f19]"></div>
            </div>
          </div>

          {/* Shoe image */}
          <img
            src="https://i.pinimg.com/736x/ff/02/f7/ff02f7641f6bcb0832c8b9d5c30b660e.jpg"
            alt="Nite Jogger"
            className="relative z-10 w-[420px] drop-shadow-xl transform -rotate-[10deg]"
          />

          {/* Vertical Text */}
          <div className="absolute top-8 left-2 rotate-[-90deg] text-xl font-bold text-gray-300 tracking-widest">
            NITE JOGGER
          </div>
        </div>

        {/* Right Content */}
        <div className="w-1/2 h-full flex flex-col justify-center px-12 space-y-4 relative z-10">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            IT’S NEVER TOO LATE
          </h1>
          <p className="text-gray-600 text-sm max-w-md">
            Modern cushioning updates this flashy ‘80s standout.
          </p>
          <button className="bg-[#f86132] hover:bg-[#e45629] text-white text-sm font-semibold px-6 py-2 w-max rounded shadow">
            PLAY VIDEO
          </button>
        </div>

        {/* Optional background watermark on the right */}
        <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-10 bg-center bg-cover mix-blend-multiply"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/originals/f6/9c/64/f69c64781210f3e89612d470f796ff33.jpg')",
          }}
        ></div>
      </div>
    </div>
  );
}

export default HeroBanner;
