// import { useState } from "react";
// import Search from "../Search";




// import { motion } from "framer-motion";
// import QRCode from "react-qr-code";





































// export default function Weather() {
//     const [search, setSearch] = useState('');
//     const [qrcode, setqrcode] = useState("");
//     const [weather, setWeather] = useState({
//         name: "BANGALORE ",
//         sys: { country: "India" },
//         main: { temp: "- 0 C > ------------- <" },
//         weather: [{ description: "Snowey > ----------------- > >_<  " }],

//         name2: " Yellahnka ",
//         sys2: { country: "India" },
//         main2: { temp: 52 },
//         weather2: [{ description: "Sunnny   " }]



//     });




//     function weather_country() {


//         return alert(weather.sys?.country)
//     }

//     function handel_temprature() {
//         return alert(weather.main?.temp)
//     }





//     function handel_discription() {
//         return alert(weather.weather?.[0]?.description)
//     }

//     function weather_name() {


//         return alert(weather.name)
//     }



//     // function handleSearch() {
//     //     if (search.trim()) {
//     //         // Simulated search functionality - updates weather data based on search input.
//     //         setWeather({
//     //             name: search,
//     //             sys: { country: "XX" },
//     //             main: { temp: Math.floor(Math.random() * 35) }, // Random temp
//     //             weather: [{ description: "Partly cloudy" }]
//     //         });
//     //     }
//     // }


//     return (
//         <>


//             <div>
//             <div className="Top-container text-center py-1" style={{ backgroundColor: "black", height: "800px" }}>
//                 <div className="Top-container text-center py-1" style={{ backgroundColor: "pink", height: "500px" }}>
//                 <div className="Top-container text-center py-1" style={{ backgroundColor: "black", height: "300px" }}>
//                     <h1 style={{ color: "white", fontSize: "3rem", fontWeight: "bold" }}>   '_' </h1> 


//                     <Search search={search} className="btn btn-dark mb-9 " style={{ borderRadius: "900px", maxWidth: "200px" }} setSearch={setSearch} />
//                     <div>
//                         <div className="city-name"> 
//                             <h2 style={{ color: "White",backgroundColor: "black",borderRadius:"1500px",width:"900px",alignContent:"end"}}>
//                         {weather.name}, <span>{weather.sys?.country}</span>
//                     </h2> 
//                             <h4 style={{ backgroundColor: "#f8f9fa", borderRadius: "900px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "160px" }}>
//                         {weather.name2}, <span>{weather.sys2?.country}</span>
//                     </h4>

//                         </div>
//                         <div>

//                             <button
//                                 style={{ color: "pink ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px", gap: "20px" }}
//                                 onClick={() => weather_country()}>
//                                 Country
//                             </button>
//                             <button
//                                 style={{ color: "blue ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}
//                                 onClick={() => weather_name()}>
//                                 Weaher location
//                             </button>


//                             <button
//                                 style={{ color: "yellow ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}
//                                 onClick={() => handel_temprature()}>
//                                 Temprature
//                             </button>
//                             <p style={{ color: "white", fontSize: "3rem", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"1500px",width:"900px"}}>Temperature: {weather.main?.temp}°C</p>
//                             <p style={{ backgroundColor: "#f8f9fa", borderRadius: "900px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "160px" }}>Temperature: {weather.main2?.temp}°C</p>

//                             <p className="description">
//                        <h3 style={{ color: "White", fontSize: "3rem", fontWeight: "bold",backgroundColor: "black",borderRadius:"1500px",width:"900px" }}> {weather.weather?.[0]?.description}</h3>

//                             <h2 style={{ backgroundColor: "#f8f9fa", borderRadius: "900px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "160px" }}>{weather.weather2?.[0]?.description}</h2> 

//                              </p>
//                             <button
//                                 style={{ color: "white ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}
//                                 onClick={() => handel_discription()}>
//                                 Discription
//                             </button>
//                         </div>
//                     </div>


//                      {/* <motion.h1
//                         style={{ color: "#000", fontSize: "4rem", fontFamily: "arial" }}
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: [1, 0, 1] }}
//                         transition={{ duration: 4, repeat: Infinity }}
//                     >
//                         <QRCode

//                             id="qr-code-id"
//                             value={qrcode}
//                             size={300}


//                         />
//                     </motion.h1> */}

// <center>
//                     {/* <motion.h1
//                         style={ {  color: "green", fontWeight: "bold" ,backgroundColor: "white",borderRadius:"10px",width:"600px" }}
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: [1, 0, 1] }}
//                         transition={{ duration: 4, repeat: Infinity }}



//                     >


//                      @_@

//                     </motion.h1> */}
//                     </center>

// </div>
// </div>

//                 </div>
//             </div>




//         </>);

// }


import { color } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
 import Search from "../Search";
 import { Swiper, SwiperSlide } from "swiper/react";
 import "swiper/css";
 import "swiper/css/navigation";
 import "swiper/css/autoplay";
 import { Navigation, Autoplay } from "swiper/modules";
 import { motion } from "framer-motion";


const Graph = () => {
  const [search, setSearch] = useState('');

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
  
  const options = {
    responsive: true,
    scales: {
      // xAxes: [
      //   {
      //     scaleLabel: {
      //       display: true,
      //       labelString: 'Date',
      //       fontSize: 18,
      //       fontColor: 'white'
      //     },
      //     gridLines: {
      //       display: false,
      //       color: 'white'
      //     },
      //     ticks: {
      //       fontColor: 'white',
      //       fontSize: 16
      //     }
      //   }
      // ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Graph_outline',
            fontSize: 18,
            fontColor: 'black'
          },
          // gridLines: {
          //   display: false,
          //   color: 'white'
          // },
          // ticks: {
          //   fontColor: 'white',
          //   fontSize: 16,
          //   beginAtZero: true
          // }
        }
      ]
    },
    tooltips: {
      titleFontSize: 13,
      bodyFontSize: 13
    }
  };

  return (
    <>

<div className="Top-container text-center py-1" style={{ backgroundColor: "yellow", height: "60px" }}>
                     <h1 style={{ color: "black", fontSize: "3rem", fontWeight: "bold" ,border:"5px"}}>  PATTREN  !!! </h1> 

                     </div>

  

      {/* <p style={{ color: " red ", fontWeight: "bold", borderRadius: "10px", width: "400px", height: "30px" }}
      >progress Graph </p> */}

<Search search={search} className="btn btn-dark mb-9 " style={{ borderRadius: "900px", maxWidth: "200px" }} setSearch={setSearch} />
      <center>


<h2> ITEMS </h2>


 <Swiper 
        navigation={true} 
        modules={[Navigation, Autoplay]} 
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.id}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "900px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            />
            {/* <p className="text-center mt-2 font-semibold"   style={{ color: "red ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}>{product.title}</p> */}
            <p className="text-center mt-2 font-semibold"   style={{ color: "white ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}>{product.id}</p>
          </SwiperSlide>
        ))}
      </Swiper>





        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "100px", height: "30px" }}
        >
          10 %
        </button>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black", borderRadius: "20px", width: "100px", height: "50px" }}
        >
          20 %
        </button>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black", borderRadius: "30px", width: "200px", height: "100px" }}
        >
          60 %
        </button>

        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black", borderRadius: "40px", width: "250px", height: "150px" }}
        >
          80 %
        </button>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black", borderRadius: "40px", width: "250px", height: "200px" }}
        >
          100 %
        </button>
       
       
       
       <h1> x ---------------------------------------------------------------------------------------------------------------- x </h1>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "40px", width: "1200px", height: "10px" }}
        >
     
        </button>

   
        <p  style={{ color: " white ", fontWeight: "bold", backgroundColor: "red ", borderRadius: "10px", width: "1200px", height: "50px" }}>Pattren</p>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "40px", width: "40px", height: "700px" }}
        >
    
        </button>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "white ", borderRadius: "40px", width: "40px", height: "700px" }}
        >
    
        </button>

        
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "40px", width: "40px", height: "700px" }}
        >
    
        </button>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "white ", borderRadius: "40px", width: "40px", height: "700px" }}
        >
    
        </button>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "40px", width: "40px", height: "700px" }}
        >
    
        </button>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "lightgreen ", borderRadius: "40px", width: "40px", height: "700px" }}
        >
    
        </button>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "40px", width: "40px", height: "700px" }}
        >
    
        </button>
        <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "lightgreen ", borderRadius: "40px", width: "40px", height: "700px" }}
        >
    
        </button>
         <button
          style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "40px", width: "40px", height: "700px" }}
        >
    
        </button>
{/* 
<motion.h1
                        style={ {  color: "green", fontWeight: "bold" ,backgroundColor: "white",borderRadius:"10px",width:"600px" }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}



                    >


                    
      <h1> Mohan Pattren </h1>

                    </motion.h1> */}


                    

        
        
      </center>

      <h4 style={{ color: " green ", fontWeight: "bold",  borderRadius: "10px", width: "600px", height: "50px" }}> Mohan Details </h4>
                    {/* <ol >
                      <li  style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "10px", width: "600px", height: "50px" }}> <h2>Mohan i belong to Regular batch</h2> .</li>
                      
                      <li  style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "10px", width: "600px", height: "50px" }}> <h2>I am not able to see what he is doing .</h2></li>
                      <li  style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "10px", width: "600px", height: "50px" }}><h2>**** </h2></li>
                    </ol>


                    <footer> @@</footer> */}



                    <table>
                     
                      <tr > <h4 style={{ color: " red ", fontWeight: "bold",  borderRadius: "10px", width: "600px", height: "50px" }}>Mohan i belong to Regular batch</h4></tr>

                      <tr>  <h4 style={{ color: " red ", fontWeight: "bold",  borderRadius: "10px", width: "600px", height: "50px" }} >I am not able to see what he is doing .</h4></tr>
                      <tr> <h4 style={{ color: " red ", fontWeight: "bold",  borderRadius: "10px", width: "600px", height: "50px" }}>**** </h4></tr>
                    
                     <th> ////////////------------------------------------------------------------------------------------------------------------------\\\\\\\\\\\</th>
                    </table>



                  
                      
      {/* <Line options={options} fontSize="60px" /> */}
    </>
  );
}
export default Graph;