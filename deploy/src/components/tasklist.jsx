import React,{useEffect, useState} from "react";
import Search from "../Search";
import { color } from "framer-motion";
import { RiFontFamily } from "react-icons/ri";



function Tasklist(){



    const [ tasks,setTasks]=useState((()=>{


const saved=localStorage.getItem('tasks');
return saved ? JSON.parse(saved):[];
    }));

const [ newTask,setnewtask]=useState('');
const[filter,setFilter]=useState('all');
const[ search,setSearch]=useState('')
const[ darkmode,setDarkmode]=useState(false);


useEffect(()=>{


    localStorage.setItem('tasks',JSON.stringify(tasks));
},[tasks]);



const addTask = ()=>{


    if(!newTask.trim())return;
    setTasks([...tasks,{ text:newTask.trim(), completed: false}]);

    setnewtask('');
}


const togglecomplete = (index)=>{

    const updated =[...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);

}

const removetask = (index) =>{


    const updated = tasks.filter((_,i)=> i !== index);
    setTasks(updated)
}



const filteredtask= tasks

.filter(task=>{
    if(filter ==='completed') return task.completed;
    if(filter ==='pending') return !task.completed;
    return true;

}


)

.filter( task => task.text.toLowerCase().includes(search.toLowerCase()));


const containerStyle={

    backgroundColor:darkmode ? '#222':'#fff',
    color:darkmode ? '#fff' : '#000',
    minHeight:'100vh',
    padding: '20px',
    fontFamily:'sans-serif',
};


const inputstyle = {


    padding : '8px',
    marginRight:'10px',
};


const buttonStyle={

    padding:'8px',
    marginRight:'10px',
    cursor:' pointer',
}

return(
    <>
    
    <div style={containerStyle}></div>
<h1> List</h1>
<div

style={{marginBottom:'20px'}}


>

<input

style={inputstyle}
type="text"
value={newTask}
onChange={(e)=>setnewtask(e.target.value)}

placeholder="Add new Task "

/>


<button style={buttonStyle} onClick={addTask}>Add</button>
<input

style={inputstyle}
type="text"
value={newTask}
onChange={(e)=>setSearch(e.target.value)}

placeholder="Seaqrch Tasks ... "

/>

<select

style={inputstyle}
onChange={(e)=>setFilter(e.target.value)}
value={filter}
>
<option value="all">All</option>
<option value="complete">complete</option>
<option value="pending">pending </option>


</select>


<button style={buttonStyle} onClick={()=>setDarkmode(!darkmode)}>

{darkmode ? 'Light Mode': 'Dark Mode'}


</button>




<ul style={{padding:0}}>

{filteredtask.map((task,index)=>(

<li

key={index}
style={{

    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:'10px',
    padding:'10px',
    backgroundColor: darkmode ? '#333' : '#f0f0f0',
    textDecoration: task.completed ? 'line-through' :'none',


}}

>

<span

style={{cursor:'pointer',flexGrow:1}}
onClick={()=> togglecomplete(index)}
>


    {task.text}
</span>

<button style={buttonStyle} onClick={()=>removetask(index)}>Delete</button>


</li>

))}

</ul>

</div>







    </>
);

}

export default Tasklist;