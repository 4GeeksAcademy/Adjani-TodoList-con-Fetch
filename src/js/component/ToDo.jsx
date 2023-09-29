import React, { useEffect, useState } from "react";

const urlBase = "https://playground.4geeks.com/apis/fake/todos/user/Adjani"

function ToDo() {
    const [task, setTask] = useState(["Tomar Agua", "Sacar Perros", "Estudiar"]);
    const [text, setText] = useState({label:"", done:false});

    const handleChange = (e) => {
        setText({
            ...text, 
            label:e.target.value
        })
    } 

    const handleEnter = async(e) =>{
        if (e.key === "Enter" && text !== " ") {
            try {
                const response = await fetch(urlBase, {
                    method:"PUT",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify([...task, text])
                })
                if (response.ok) {
                    setTask([...task, text]);
                    setText({label:"", done:false});
                }
            } catch (error) {
                console.log(error);
            }
        }
    } 

    const deleteTask = async(item) => { 
        const newArray = task.filter((taskItem) => taskItem !== item)
        console.log("New Array", newArray); 
        try {
            const answer = await fetch(urlBase, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(newArray)
        });
            if (answer.status === 200){
                setTask(newArray)
            };   
        } catch (error) {
            console.log(error);
        }
        console.log("si borra");
    };
    
    const getTask = async () => {
        try { 
            const respuesta = await fetch(urlBase)
            const data = await respuesta.json()
            if (respuesta.status == 404) {
                console.log("debo crear usuario");
            }
            if (respuesta.ok) {
                setTask(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTask()
    }, [task])

    return (
        <div className= "container" style={{ width: 750, backgroundColor: "#fbc7e121", padding: 50, fontSize: 20, fontFamily:"sans-serif"}}>
            <div><h1 style={{ color: "#e7b1cca3", textAlign: "center", fontSize: 85 }}>todos</h1></div>

            <div className= "list-group" >
                <input className= "list-group-item" type= "text" value= {text.label} 
                    placeholder= "No hay tareas, añadir tareas" 
                    onChange= {handleChange}
                    onKeyDown= {handleEnter}>
                </input>
                <div> {task.map((task, item) => (
                        <li className= "list-group-item" 
                            style= {{paddingLeft: 15, color: "#212529a6", display: "flex", justifyContent: "space-between"}} key={item}>{task.label}
                            <button type= "button" onClick={() => deleteTask(task)}>X</button>
                        </li>
                    ))} 
                </div>
            </div>
            <div style= {{ color: "#212529a6", textAlign: "inherit", fontSize: 15 }}>
                {task.length}items left
            </div>
        </div>
    )
}
export default ToDo;