import React, { useState, useEffect ,Component} from 'react';
import { 
  FiActivity, FiUsers, FiDatabase, FiSettings, FiBell, FiSearch, 
  FiMenu, FiX, FiDownload, FiUpload, FiFilter, FiRefreshCw 
} from 'react-icons/fi';
import { 
  BsLightningFill, BsGraphUp, BsShieldLock, BsThreeDotsVertical,
  BsArrowUpRight, BsFillMoonFill, BsFillSunFill 
} from 'react-icons/bs';
import { RiDashboardFill } from 'react-icons/ri';
import { AiFillThunderbolt } from 'react-icons/ai';

import Card from "react-bootstrap/Card";
import "./style.css";



export default class Dashboardreplica extends Component {


  constructor() {
    super();
    this.state = {
      images: [
        { orgimg: "", orglink: "", uploadImage: false }
        
      ]
    };
  } 

  handleImageUpload = (index, e) => {
    const imageFile = e.target.files[0];
    const updatedImages = [...this.state.images];
    updatedImages[index] = {
      orgimg: imageFile,
      orglink: URL.createObjectURL(imageFile),
      uploadImage: true
    };
    this.setState({ images: updatedImages });
  };

  



  hnadelchange = ()=>{

      return alert(" This UI  was not Done with AI")
    }

    
    render() {
    return(<>
    
    
    <div className="Top-container text-center py-1" style={{ backgroundColor: "lightgreen", height: "60px" }}>
                         <h1 style={{ color: "black", fontSize: "3rem", fontWeight: "bold" ,border:"5px"}}>  <i> User profile . </i> </h1> 
    
                         </div>

                         <h5> X ----------------------------------------------------------------------------------------------------------------------------- x </h5>
                         <div className="Top-container text-center py-2" style={{ backgroundColor: "#282c34" }}>
          <h1 style={{ color: "white", fontSize: "3rem", fontWeight: "bold" }}>   Profile. ! </h1>
        </div>
        <div className="d-flex justify-content-center align-items-start flex-wrap mt-5">
          {this.state.images.map((image, index) => (
            <div key={index} className="m-3 p-4" style={{ backgroundColor: "black", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "200px" }}>


              <h6 style={{ backgroundColor: "white" }}>



                {

                  index === 0 ? "Profile Image" : null}   


                




              </h6>


              {index === 0 && image.uploadImage ? (
                <Card.Img className="ht" variant="top" src={image.orglink} style={{ borderRadius: "2px", maxHeight: "200px", objectFit: "cover" }} />
              )

                : null

              }
             

             
           




              <div className="d-flex flex-column align-items-center mt-6">
                <input
                  type="file"
                  accept="image/*"
                  className="btn btn-dark mb-9 " style={{ borderRadius: "100px", maxWidth: "200px" }}
                  onChange={e => this.handleImageUpload(index, e)}
                />
                {/* <p style={{ color: "#6c757d" }}>Select the {index === 0 ? "First Image" : "Second Image"}</p> */}
              </div>
            </div>
          ))}
        </div>
        <h5 style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "10px", width: "1800px", height: "40px" }}> X ---------------------------------------------------------------- User Details  -------------------------------------------------------------------- x </h5>



           <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        activeTab === 'dashboard' ? 
                          (darkMode ? 'bg-gray-700' : 'bg-indigo-700') : 
                          (darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600')
                      }`}
                    >
                      <RiDashboardFill className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20} />
                      {sidebarOpen && 'Dashboard'}
                    </button>
                    {/* <button 
                      onClick={() => setActiveTab('models')}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        activeTab === 'models' ? 
                          (darkMode ? 'bg-gray-700' : 'bg-indigo-700') : 
                          (darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600')
                      }`}
                    >
                      <BsGraphUp className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20} />
                      {sidebarOpen && 'AI Models'}
                    </button>
                    <button 
                      onClick={() => setActiveTab('data')}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        activeTab === 'data' ? 
                          (darkMode ? 'bg-gray-700' : 'bg-indigo-700') : 
                          (darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600')
                      }`}
                    >
                      <FiDatabase className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20} />
                      {sidebarOpen && 'Data Sources'}
                    </button>
                    <button 
                      onClick={() => setActiveTab('users')}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        activeTab === 'users' ? 
                          (darkMode ? 'bg-gray-700' : 'bg-indigo-700') : 
                          (darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600')
                      }`}
                    >
                      <FiUsers className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20} />
                      {sidebarOpen && 'Users'}
                    </button>
                    <button 
                      onClick={() => setActiveTab('security')}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        activeTab === 'security' ? 
                          (darkMode ? 'bg-gray-700' : 'bg-indigo-700') : 
                          (darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600')
                      }`}
                    >
                      <BsShieldLock className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20} />
                      {sidebarOpen && 'Security'}
                    </button> */}
                  </nav>




{/* <h2>Enter the Details</h2>

                 
<div>
                    <input
                        id="weight"
                        name="weight"
                        type="string"
                        // min="1"
                        // max="999"
                        placeholder="Name "
                        style={{ color: "red ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "10px",height:"50px" }}
                     
                       
                    />


</div>

<div>
                       <input
                        id="weight"
                        name="weight"
                        type="number"
                        // min="1"
                        // max="999"
                        placeholder="Age "
                        style={{ color: "red ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "10px" }}
                     
                       
                    />
                    </div>
                    <div>
                       <input
                        id="weight"
                        name="weight"
                        type="number"
                        // min="1"
                        // max="999"
                        placeholder="DOB "
                        style={{ color: "red ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "10px" }}
                     
                       
                    />
</div> */}
                    {/* <div>
                        <input
                        id="weight"
                        name="weight"
                        type="string"
                        // min="1"
                        // max="999"
                        placeholder="Place "
                        style={{ color: "red ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "10px",height:"20px" }}
                     
                       
                    />
                    </div> */}
                    
                    


               
                           <div className="overflow-x-auto">
                                           <table className="min-w-full divide-y divide-gray-200">
                                             <thead className='bg-gray-700' >
                                               <tr>
                                                 {['ID', 'Name', 'Feild', 'Course','Location', ''].map((header, index) => (
                                                   <th 
                                                     key={index} 
                                                     className={`px-6 py-3 text-left text-xs font-medium ${
                                                        'text-gray-500'
                                                     } uppercase tracking-wider`}
                                                   >
                                                     {header}
                                                   </th>
                                                 ))}
                                               </tr>
                                             </thead>
                                             <tbody className={`divide-y ${
                                               'divide-gray-200'
                                             }`}>
                                               {[1, 2, 3, 4].map((item) => {
                                                 const status = item % 3 === 0 ? 'Completed' : item % 2 === 0 ? 'Training' : 'Pending';
                                                 return (
                                                   <tr 
                                                     key={item} 
                                                     className={`${
                                                      'hover:bg-gray-50'
                                                     }`}
                                                   >
                                                     <td className="px-6 py-4 whitespace-nowrap">
                                                       <div className="flex items-center">
                                                         <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                                                          'bg-indigo-100 text-indigo-600'
                                                         }`}>
                                                           <BsLightningFill />
                                                         </div>
                                                         
                                                       </div>
                                                     </td>
                                                     <td className="px-6 py-4 whitespace-nowrap">
                                                      Details 
                                                     </td>
                                                     
                                                     <td className="px-6 py-4 whitespace-nowrap">
                                                      ----
                                                     </td>
                                                     <td className="px-6 py-4 whitespace-nowrap">
                                                       ***
                                                     </td>
                                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                       <button
                                                                style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "40px", width: "80px", height: "40px" }}
                                                              
                                                              onClick={()=> hnadelchange()}
                                                              >
                                                          <i>Info</i>
                                                              </button>
                                                     </td>
                                                     <h4> X -! x </h4>
                                                   </tr>

                                                   
                                                 );
                                               })}
                                             </tbody>
                                           </table>
                                         </div>

    



<h6> ----------------------------------------------------------------------------X----------------------------------------------------------------------------- </h6>



    
    <h6> Copy write </h6>
    <footer ><i> @Chadi Mohan </i></footer>

    

    {/* <button className={`${
                                'text-red-600 hover:text-red-800'
                              }`}>
                                Cancel
                              </button> */}

<button

style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "40px", width: "80px", height: "40px" }}

onClick={()=> Submit()}
><i> Submit</i></button>
    </>);



}
}


