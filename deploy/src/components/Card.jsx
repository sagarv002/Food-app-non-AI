// import { useEffect, useState } from "react";

// export default function CartList() {
//   const [carts, setCarts] = useState([]);
//   const [filteredCarts, setFilteredCarts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     fetch("https://dummyjson.com/carts")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setCarts(data.carts);
//         setFilteredCarts(data.carts);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     const filtered = carts.filter((cart) =>
//       cart.products.some((product) =>
//         product.title.toLowerCase().includes(search.toLowerCase())
//       )
//     );
//     setFilteredCarts(filtered);
//   }, [search, carts]);

//   if (loading) return <p className="text-center text-lg font-semibold animate-pulse">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Cart Overview</h2>
//       <input
//         type="text"
//         placeholder="Search products..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//       />
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {filteredCarts.length > 0 ? (
//           filteredCarts.map((cart) => (
//             <div key={cart.id} className="p-6 border rounded-2xl shadow-lg bg-white hover:shadow-2xl transition transform hover:scale-105">
//               <h3 className="text-xl font-semibold mb-3 text-gray-900">Cart ID: {cart.id}</h3>
//               <p className="text-lg text-gray-700 mb-4">Total: <span className="font-bold text-green-600">${cart.total}</span></p>
//               <div className="space-y-4">
//                 {cart.products.map((product) => (
//                   <div key={product.id} className="flex items-center space-x-4 p-3 border rounded-lg bg-gray-100 shadow-sm">
//                     <img 
//                       src={product.thumbnail} 
//                       alt={product.title} 
//                       className="w-20 h-20 object-cover rounded-lg border cursor-pointer" 
//                       onClick={() => setSelectedProduct(product)}
//                     />
//                     <div>
//                       <p className="text-lg font-medium text-gray-900">{product.title}</p>
//                       <p className="text-sm text-gray-600">${product.price} x {product.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-600 col-span-3">No matching results found.</p>
//         )}
//       </div>

//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
//             <h3 className="text-xl font-bold">{selectedProduct.title}</h3>
//             <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="w-full h-40 object-cover rounded-md my-3" />
//             <p className="text-gray-700">Price: ${selectedProduct.price}</p>
//             <p className="text-gray-500">Discount: {selectedProduct.discountPercentage}%</p>
//             <button className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => setSelectedProduct(null)}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

const CartImageSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((data) => {
        // Extracting products from all carts
        const items = data.carts.flatMap(cart => cart.products);
        setProducts(items);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
    <div className="w-full max-w-lg mx-auto">
      <Swiper 
        navigation={true} 
        modules={[Navigation, Autoplay]} 
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            {/* <img
              src={product.thumbnail}
              alt={product.id}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "900px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            /> */}
            <p className="text-center mt-2 font-semibold"   style={{ color: "red ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}>{product.title}</p>
            <p className="text-center mt-2 font-semibold"   style={{ color: "white ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}>{product.id}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>


    <button
                                style={{ color: "green  ", fontWeight: "bold", backgroundColor: "pink", borderRadius: "10px", width: "200px" }}
                                >
                               Pause @_@
                            </button>
                            <button
                                style={{ color: "yellow  ", fontWeight: "bold", backgroundColor: "pink", borderRadius: "10px", width: "200px" }}
                                >
                               play @_@
                            </button>
    
    </>);
};

export default CartImageSlider;
