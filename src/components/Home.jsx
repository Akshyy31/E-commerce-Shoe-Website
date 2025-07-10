import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import Navbar1 from "../Navbar/Navbar1";
import ProductCard from "../products/ProductCard";
import { Api } from "../commonapi/api";
import { Heart } from "lucide-react";
import HeroBanner from "./HeroBanner";
import HomeCard from "../Home_page_Card/HomeCard";

function Home() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error fetching user", err));
    }
  }, []);

  
  console.log(user);
  console.log(products);

  return (
    <div>
      <Navbar1 />
        <HeroBanner/>
      {/* FEATURED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>

        <HomeCard/>

        {/* VIEW FULL COLLECTION */}
        <div className="flex justify-center mt-10">
         <Link
                    to={`/productlist`}
                    className="inline-block mt-3 text-xs font-medium text-white !bg-black px-3 py-2 rounded hover:bg-gray-800 transition"
                  >
                    View More Collection
                  </Link>
        </div>
      </div>

      {/* ----------------footer----------------- */}

      <Footer />
    </div>
  );
}

export default Home;
