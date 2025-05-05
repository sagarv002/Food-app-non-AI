import React,{useState,useEffect} from "react";

function Movingbox(){


    const [items, setItems] = useState([]);
    const [newItems,setnewItems]= useState('');
    const [ draggedIndex,setDraggedIndex]=useState(null);


    const handelAdd=()=>{


        if(newItems.trim()){

            setItems([


                ...items,
                {text:newItems.trim(),complete:false,isEditting:false},

            ]);
            setnewItems('');
        }




    };

    const handelRemove =(index)=>{
        setItems(items.filter((_,i) => i !== index));

    };

    const toggleComplete =(index)=>{
        const updated=[...items];
        updated[index].complete=!updated[index].complete;
        setItems(updated);
    }


    const toggelEdit =(index)=>{

        const updated=[...items];
        updated[index].isEditting=!updated[index].isEditting;
        setItems(updated)
    }


    const handelchange=(index,value)=>{

        const updated=[...items];
        updated[index].text=value;
        setItems(updated);
    }


    const clearall=()=>{

        setItems([]);
    }
const handeldragstart=(index)=>{

    setDraggedIndex(index);

}

const handeldragover=(index)=>{

    if(draggedIndex === null || draggedIndex === index )return;

    const updateditems=[...items];
    const draggeditem=updateditems[draggedIndex];
    updateditems.splice(draggedIndex,1);
    updateditems.splice(index,0,draggeditem);
    setDraggedIndex(index);
    setItems(updateditems);
}
   
       
const handeldrop=()=>{

    setDraggedIndex(null);
}


    return(<>


    <div style={{padding:'20px', fontFamily:'Arial'}} >
        <h2>List</h2>

<div>
<input
type="text"
value={newItems}
placeholder="Enter Item"
onChange={(e)=> setnewItems(e.target.value)}
style={{padding:'5px',marginRight:'10px'}}
/>


<button onClick={handelAdd}>Add</button>

<button onClick={clearall} style={{marginLeft:'10px '}}>clear all</button>


</div>

<p style={{marginTop:'15px'}}>

    Total:{items.length} | complete:{items.filter(i=>i.complete).length}
</p>


<ul style={{marginTop:'20px',paddingLeft:'20px'}}>

{items.map((item,index)=>(


    <li
    key={index}
    draggable
    onDragStart={()=>handeldragstart(index)}

    onDragOver={(e)=>{

        e.preventDefault();
        handeldragover(index);
    }}

    onDrop={handeldrop}

    style={{marginBottom:'8px',
        border:'1px solid #ddd',
        padding:'5px',
        backgroundColor: draggedIndex === index ? '#f0f0f0':'white',
        cursor:'move'
    }}
     >

        <input
        
        type="checkbox"
        checked={item.complete}
        onChange={()=> toggleComplete(index)}
        />
        {item.isEditting ? (

            <input
            type="text"
            value={item.text}
            onChange={(e)=>handelchange(index,e.target.value)}

            style={{marginLeft:'10px'}}
            
            
            />


        ):(


            <span
            
            style={{marginLeft:'10px',
                textDecoration:item.complete ? 'line-through':'none',
            }}
            >

            {item.text}

            </span>
        )}

        <button onClick={()=>toggelEdit(index)} style={{marginLeft:'10px'}}>

            {item.isEditting ? 'save':'Edit'}
        </button>

        <button onClick={()=>handelRemove(index)} style={{marginLeft:'5px'}}>Remove</button>







    </li>
))}

</ul>








    </div>
    

   





  
    </>);
};

export default Movingbox;