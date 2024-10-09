import { useEffect, useState } from "react";
import "./Sci.css"

function Sci() {

    const [name, setName] = useState("nazwa")
    const [num, setNum] = useState(0)

    useEffect(() => {console.log("UseEffect was called")}, [name]);

    const myStyle = {color:"red", fontSize:"20px"}

    const changeName = (e) =>{
        setName(e.target.value)
    }

    const clickMe = () =>{
        console.log(name)
        setName((name) => name = "MP")
        console.log(name)
    }

    return(
            <div>
                <h1>Testowy Div</h1>
                <input onChange={changeName} value={name}></input>
                <button onClick={clickMe}>Click me!</button>
                <p className="magicP">{name}</p>
                <p>{num}</p>
                <p style={myStyle}>Tekst nr2</p>
            </div>
    );
}

export default Sci;
