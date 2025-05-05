import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Form from '../Form/Form';
import Info from '../Info/Info';
import Bar from '../Bar/Bar';
import { getData, storeData } from '../../helpers/localStorage';


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

const Datax = () => { 
   const [products, setProducts] = useState([]);
  const initialState = () => getData('data') || [];
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  useEffect(() => {
    storeData('data', state);
    const date = state.map(obj => obj.date);
    const bmi = state.map(obj => obj.bmi);
    let newData = { date, bmi };
    setData(newData);
  }, [state]);
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

  const handleChange = val => {
    let heightInM = val.height / 100;
    val.bmi = (val.weight / (heightInM * heightInM)).toFixed(2);
    val.id = uuidv4();
    let newVal = [...state, val];
    let len = newVal.length;
    if (len > 7) newVal = newVal.slice(1, len);
    setState(newVal);
  };

  const handleDelete = id => {
    storeData('lastState', state);
    let newState = state.filter(i => {
      return i.id !== id;
    });
    setState(newState);
  };

  const handleUndo = () => {
    setState(getData('lastState'));
  };

  return (<>
     <div className="w-full max-w-lg mx-auto">
       <Swiper 
         navigation={true} 
         modules={[Navigation, Autoplay]} 
         autoplay={{ delay: 3000, disableOnInteraction: false }}
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
             {/* <p className="text-center mt-2 font-semibold"   style={{ color: "red ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}>{product.thumbnail}</p> */}
             <p className="text-center mt-2 font-semibold"   style={{ color: "white ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}>{product.id}</p>
           </SwiperSlide>
         ))}
       </Swiper>

       <button style={{color:"whitesmoke", fontWeight: "bold", backgroundColor: "white", borderRadius: "10px", width: "1900px",height:"10px" }}></button>
     </div>
 
 
     {/* <button
                                 style={{ color: "green  ", fontWeight: "bold", backgroundColor: "pink", borderRadius: "10px", width: "200px" }}
                                 >
                                Pause @_@
                             </button>
                             <button
                                 style={{ color: "yellow  ", fontWeight: "bold", backgroundColor: "pink", borderRadius: "10px", width: "200px" }}
                                 >
                                play @_@
                             </button> */}
    <div className='container'>
      <div className='row center'>
        <h1 className='white-text'> Calculate price  </h1>
      </div>
      <div className='row'>
        <div className='col m12 s12'>
          <Form change={handleChange} />

          <label htmlFor="Items here "

> items NO 's '  </label>

<button style={{color:"whitesmoke", fontWeight: "bold", backgroundColor: "yellow", borderRadius: "10px", width: "1000px",height:"10px" }}></button>

<input
    id="height"
    name="height"
    type="number"
    min="1"
    max="999"
    placeholder="0"
   
    style={{color:"black", fontWeight: "bold", backgroundColor: "white", borderRadius: "2px", width: "400px" ,height:"100px"}}


/>
<button style={{color:"whitesmoke", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}>
                Add items no
              </button>
             

          <Bar labelData={data.date} bmiData={data.bmi} />
          <input
    id="height"
    name="height"
    
    min="1"
    max="999"
    placeholder="The Graph Has been Displayed !! "
   
    style={{color:"yellow", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" ,height:"50px"}}


/>
          {/* <div>
            <div className='row center'>
              <h4 className='white-text'>7 Day Data</h4>
            </div>
            <div className='data-container row'>
              {state.length > 0 ? (
                <>
                  {state.map(info => (
                    <Info
                      key={info.id}
                      id={info.id}
                      weight={info.weight}
                      height={info.height}
                      date={info.date}
                      bmi={info.bmi}
                      deleteCard={handleDelete}
                    />
                  ))}
                </>
              ) : (
                  <div className='center white-text'>No log found</div>
                )}
            </div>
          </div> */}
          {getData('lastState') !== null ? (
            <div className='center'>
              <button className='calculate-btn' onClick={handleUndo}>
                Undo
              </button>
            </div>
          ) : (
              ''
            )}
        </div>
      </div>
    </div>
    </>);
};

export default Datax;
