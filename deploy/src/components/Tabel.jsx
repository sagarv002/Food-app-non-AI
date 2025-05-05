import React, { useState, useEffect ,Component} from 'react';

import { 
  BsLightningFill, BsGraphUp, BsShieldLock, BsThreeDotsVertical,
  BsArrowUpRight, BsFillMoonFill, BsFillSunFill 
} from 'react-icons/bs';



const Tabel = () => {

return(<>
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

</>);
}

export default Tabel();