

const Blocks = () => {


function handelchange(){


  return alert( "Its a Summer season")
}


    return(
<>
<div style={{ marginBottom: '30px' }}>
<h2 style={{ 
  borderBottom: '2px solid #ddd', 
  paddingBottom: '10px',
  marginTop: 0
}}> ★ Weather Statastics ★ </h2>
<div style={{ 
  display: 'grid', 
  gridTemplateColumns: '1fr 1fr', 
  gap: '10px',
  marginBottom: '15px'
}}>
  <div style={{ 
    backgroundColor: 'yellow', 
    padding: '10px', 
    borderRadius: '4px'
  }}>
    <div style={{ fontWeight: 'bold' }}>Hot</div>
    <div style={{ fontSize: '24px' }}> 45* C</div>
  </div>
  <div style={{ 
    backgroundColor: 'blue', 
    padding: '10px', 
    borderRadius: '4px',
    color:"white"
  }}>
    <div style={{ fontWeight: 'bold' }}>Cold</div>
    <div style={{ fontSize: '24px' }}>25* C</div>
  </div>
</div>
<div style={{ 
  backgroundColor: 'orange', 
  padding: '10px', 
  borderRadius: '4px',
  marginBottom: '15px'
}}>
  <div style={{ fontWeight: 'bold' }}>Warm</div>
  <div style={{ fontSize: '24px' }}>30* C</div>
</div>
<div style={{ 
  backgroundColor: 'pink', 
  padding: '10px', 
  borderRadius: '4px'
}}>
  <div style={{ fontWeight: 'bold' }}>Chill



  </div>
  <div style={{ fontSize: '24px' }}>25* C</div>

 
</div>

<div style={{ 
  backgroundColor: 'pink', 
  padding: '10px', 
  borderRadius: '4px'
}}>
  <div style={{ fontWeight: 'bold' }}>

<button onclick ={() => handelchange()}
  
  style={{width:"1800px",height:"40px"}}
  
  > ★ </button>

  </div>
  <div style={{ fontSize: '24px' }}></div>

 
</div>


<div style={{ 
  backgroundColor: '#f3e5f5', 
  padding: '10px', 
  borderRadius: '4px'
}}></div>

<div style={{ fontWeight: 'bold' }}>Sunny

</div>
<div style={{ fontSize: '24px' }}>35* C</div>




</div>

<h2>------------------------------------------------------------------------------------------------------------</h2>

<div>
<button className="Search-Weather" style={ {  color: "red", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"10px",width:"150px" }} > 
</button>
</div>


<div>
<button className="Search-Weather" style={ {  color: "red", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"10px",width:"150px" }} > 
</button>
</div>

<div>
<button className="Search-Weather" style={ {  color: "red", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"10px",width:"150px" }} > 
</button>
</div>

<div>
<button className="Search-Weather" style={ {  color: "red", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"10px",width:"150px" }} > 
</button>
</div>
<div>

<button className="Search-Weather" style={ {  color: "red", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"10px",width:"150px" }} > 
</button>
</div>

<button className="Search-Weather" style={ {  color: "white", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"10px",width:"150px" ,height:"80px"}} > Set 
</button>


<button className="Search-Weather" style={ {  color: "white", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"10px",width:"600px" ,height:"600px"}} >This is the 

    info  to update the values 

    <h2>set the values accordingly </h2>
</button>




</>   );
}

export default Blocks;

