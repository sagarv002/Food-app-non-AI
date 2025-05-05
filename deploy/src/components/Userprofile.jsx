// import React from 'react';




// <UserProfile user={{
//   name: "John Doe",
//   email: "john@example.com",
//   avatar: "E:/Phone_backup/Pins/65a429ef260849abe866413e059f3d9c.jpg",
//   bio: "Software developer with 5 years of experience",
//   phone: "+1234567890",
//   joinDate: "January 2020",
//   followers: 245,
//   following: 123,
//   skills: ["JavaScript", "React", "Node.js"]
// }} />

// const UserProfile = ({ user }) => {
//   return (
//     <>
//     <div>
//       <h1>User Profile</h1>
      
//       <div>
//         <img 
//           src={"E:/Phone_backup/Pins/65a429ef260849abe866413e059f3d9c.jpg" } 
//           alt={`${user.name}'s avatar`}
//           width="150"
//           height="150"
//         />
//       </div>
      
//       <div>
//         <h2>{user.name}</h2>
//         <p>{user.bio || 'No bio available'}</p>
//       </div>
      
//       <div>
//         <h3>Contact Information</h3>
//         <p>Email: {user.email}</p>
//         {user.phone && <p>Phone: {user.phone}</p>}
//       </div>
      
//       <div>
//         <h3>Stats</h3>
//         <p>Joined: {user.joinDate || 'Unknown'}</p>
//         {user.followers && <p>Followers: {user.followers}</p>}
//         {user.following && <p>Following: {user.following}</p>}
//       </div>
      
//       {user.skills && (
//         <div>
//           <h3>Skills</h3>
//           <ul>
//             {user.skills.map((skill, index) => (
//               <li key={index}>{skill}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
  
  
//     </>);
// };




// export default UserProfile;