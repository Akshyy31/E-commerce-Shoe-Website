import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroBanner() {
  return (
    <div className="w-full  h-[500px] bg-black">
      {/* Navigation */}

      {/* Hero Section */}
      <div
        className="relative h-[500px] w-full flex items-end justify-center bg-cover bg-center"
        style={{ backgroundImage: "" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
    </div>
  );
}

export default HeroBanner;
