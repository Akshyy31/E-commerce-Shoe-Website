import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import Navbar1 from "../Navbar/Navbar1";

function Home() {
  const [user, setUser] = useState(null);

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

  return (
    <div>
      <Navbar1 />
      <div className="flex justify-center items-center w-full h-screen bg-100 bg-black">
        <div
          className="relative w-full sm:w-[90%] lg:w-[70%] h-[600px]   mx-auto bg-cover bg-center rounded-xl overflow-hidden"
          style={{
            backgroundImage:
              "url('https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_466,c_limit/b8bb35e5-5bbc-4853-812a-5d984e9a2f80/dunk-low-se-shoes-veNokWrQ.png')",
          }}
        >
          {/* Optional white overlay for better contrast */}
          <div className="absolute inset-0 bg-white/40"> </div>

          {/* Content inside the background card */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center mb-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
                Step Into The Future With Our Collection
              </h1>
              <p className="text-md md:text-lg text-gray-800 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad id
                dicta at? Excepturi ut molestias at maiores eius illo omnis,
                quae est placeat architecto tenetur sunt voluptate tempore
                obcaecati assumenda.
              </p>
              {/* <button className="px-3 py-2 bg-black text-white font-semibold rounded  border-0  transition">
                View Collection
              </button> */}

              <Link
                to="/productlist"
                className="inline-block px-4 py-2 bg-black text-black text-sm font-medium rounded-md shadow hover:bg-gray-800 no-underline transition duration-200"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------- */}

      {/* ----------------footer----------------- */}

      {/* <Footer /> */}
    </div>
  );
}

export default Home;
