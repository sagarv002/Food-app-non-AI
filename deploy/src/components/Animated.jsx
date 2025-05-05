import React, { useState } from "react";
import "./Animated.css"



const Animated = () => {

    const [ShowModel, setModel] = useState(false);




    return (
        <>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
           <header style={{ 
             borderBottom: '2px solid #ddd', 
             paddingBottom: '10px',
             marginBottom: '30px',
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center'
           }}>
             <h1 style={{ margin: 0 }}>Animated </h1>
</header>
             </div>


            <div className="card-container">


                <div className="animated-card">


                    <h3>Animation</h3>

                    <p> Test </p>

                    <button className="animated-button" onClick={()=>setModel(true)}>

                        Open
                    </button>
                </div>



                {ShowModel && (

                    <div className="modal-overlay" onClick={()=>setModel(false)}>


                        <div className="modal-content" onClick={(e) => e.stopPropagation() }>

                            <h3>Title</h3>
                            <p> Animated Window </p>
                            <button className="close-button" onClick={()=>setModel(false)}>
                                Close
                            </button>
                        </div>

                    </div>





                )}







            </div>





        </>);

}

export default Animated;