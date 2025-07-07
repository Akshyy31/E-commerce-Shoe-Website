import React from "react";

function Footer() {
  return (
    <div className="flex justify-center bg-black">
  <footer className="bg-black text-white w-full max-w-[1280px] px-6 md:px-20 py-12">
    {/* Grid layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {/* About Us */}
      <div>
        <h4 className="text-lg font-bold mb-4">ABOUT US</h4>
        <p className="text-gray-400 mb-6">
          Ignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.
        </p>
        <div className="flex gap-3">
          <div className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 cursor-pointer">
            <i className="fab fa-facebook-f"></i>
          </div>
          <div className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 cursor-pointer">
            <i className="fab fa-x-twitter"></i>
          </div>
          <div className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 cursor-pointer">
            <i className="fab fa-dribbble"></i>
          </div>
          <div className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 cursor-pointer">
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>

      {/* Contacts */}
      <div>
        <h4 className="text-lg font-bold mb-4">CONTACTS</h4>
        <div className="space-y-2 text-gray-400">
          <p>Germany 785 15h Street, Office 478, Berlin, De 81566</p>
          <a href="#" className="text-gray-300 underline block">View on Google Map</a>
          <p className="text-white font-semibold">+1 840 841 25 69</p>
          <p>info@email.com</p>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-lg font-bold mb-4">CATEGORIES</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#">Apparel</a></li>
          <li><a href="#">Shoes</a></li>
          <li><a href="#">Equipment</a></li>
          <li><a href="#">Protein drinks</a></li>
          <li><a href="#">Vitamins</a></li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="text-lg font-bold mb-4">SIGN UP FOR OUR NEWSLETTER</h4>
        <form className="flex items-center border-b border-gray-600 py-2 mb-4">
          <span className="mr-2 text-gray-400">
            <i className="far fa-envelope"></i>
          </span>
          <input
            type="email"
            placeholder="Enter Your Email Address"
            className="bg-black w-full text-white placeholder-gray-500 outline-none"
          />
          <button type="submit" className="text-white ml-2">
            <i className="fas fa-arrow-right"></i>
          </button>
        </form>
        <label className="flex items-center text-sm text-gray-400">
          <input type="checkbox" className="mr-2" />
          I agree to the <a href="#" className="underline ml-1">Privacy Policy</a>.
        </label>
      </div>
    </div>

    {/* Footer bottom */}
    <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
      AncoraThemes © 2025. All rights reserved.
    </div>
  </footer>
</div>

  );
}

export default Footer;
