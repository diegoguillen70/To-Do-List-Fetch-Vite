import React, {useState, useEffect} from "react";
import './App.css';
import {getToDo, putToDo, createUserToDo, deleteUserToDo} from './script.js';

//include images into your bundle
//{ label: "Make the bed", done: false } array with each todo as a object
import { func } from "prop-types";

//create your first component
const App = () => {
	const [toDoValue, setToDoValue] = useState("");
	const [listLi, setListLi] = useState([{label: "no task left", done: true}]);

  useEffect(() =>{    
    getToDo('diego',setListLi);
    console.log(listLi);
  },[])

  useEffect(() =>{    
    putToDo('diego', listLi);
    console.log(listLi);
  },[listLi])


	function addToDo(event){
		
		if (event.key == 'Enter' && event.target.value !=""){
			setListLi([...listLi, {label: event.target.value, done: false}]);
			setToDoValue("");
      //putToDo('diego', listLi);      
		} 
		
	}
	function deletedItem(itemToDelete){
		setListLi(listLi => {return listLi.filter((element) => element.label !== itemToDelete)})
    //putToDo('diego', setListLi);
	}

  function clearToDo(){
    setListLi([{label: "no task left", done: true}]);
    //putToDo('diego',listLi);    
  }

	return (
		<section className="todolist">
		<h1> ToDos List</h1>
		<div className="list">	
						
			<ul>
				<input type="text" name="input-todo" className="input-todo" placeholder="What needs to be done?" onChange={(e) => setToDoValue(e.target.value)} onKeyDown={(e) => addToDo(e)} value={toDoValue}/>	
									
				{listLi.map((toDo, index) => {
          return !toDo.done && <li key={index}><span>{toDo.label}</span> <i className="fa-solid fa-xmark" onClick={() => deletedItem(toDo.label) }></i></li>
				})}
				<li><span className="items-left"> {(listLi.length - 1) <= 1 ? (listLi.length - 1) +" Items left" : (listLi.length - 1) +" Items lefts"}</span></li>	        
			</ul>
			<button onClick={()=> clearToDo()}>Clear List</button>		
		</div>
		</section>
	);
};


export default App;
